import { ChatMessage } from "../types";

export interface CloudflareAIGatewayConfig {
  accountId: string;
  gatewayId: string;
  cloudflareToken: string;
  providerToken?: string;
  provider?: 'cloudflare' | 'openai' | 'anthropic' | 'google-genai' | 'openrouter';
  isLegacyEndpoint?: boolean;
}

export interface AIGatewayMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestOptions {
  model: string;
  messages: AIGatewayMessage[];
  skipCache?: boolean;
}

export class CloudflareAIManager {
  private config: CloudflareAIGatewayConfig;

  constructor(config: CloudflareAIGatewayConfig) {
    this.config = config;
  }

  private mapBody(provider: string, model: string, messages: AIGatewayMessage[]) {
    switch (provider) {
      case 'anthropic': {
        const systemMessage = messages.find((m) => m.role === 'system')?.content;
        const mappedMessages = messages.filter((m) => m.role !== 'system').map((m) => ({
          role: m.role,
          content: m.content,
        }));
        return {
          model,
          system: systemMessage,
          messages: mappedMessages,
        };
      }
      case 'google-genai': {
         // Gemini format
         const contents = messages.filter(m => m.role !== 'system').map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
         }));
         const systemInstruction = messages.find(m => m.role === 'system')?.content;
         const body: any = { contents };
         if (systemInstruction) {
            body.systemInstruction = { parts: [{ text: systemInstruction }] };
         }
         return body;
      }
      case 'openai':
      case 'openrouter':
      case 'cloudflare':
      default:
        // OpenAI / OpenRouter format
        return {
          model,
          messages,
        };
    }
  }

  public async chatCompletion(options: AIRequestOptions): Promise<any> {
    const { model, messages, skipCache } = options;
    const provider = this.config.provider || 'cloudflare';
    
    let endpoint = `https://api.cloudflare.com/client/v4/accounts/${this.config.accountId}/ai/v1/chat/completions`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.isLegacyEndpoint) {
       // Legacy Gateway endpoint
       endpoint = `https://gateway.ai.cloudflare.com/v1/${this.config.accountId}/${this.config.gatewayId}/${provider}/chat/completions`;
       
       if (this.config.cloudflareToken) {
           headers['cf-aig-authorization'] = `Bearer ${this.config.cloudflareToken}`;
       }
       if (this.config.providerToken) {
           headers['Authorization'] = `Bearer ${this.config.providerToken}`;
       }
    } else {
       // Unified REST endpoint
       if (this.config.cloudflareToken) {
          headers['Authorization'] = `Bearer ${this.config.cloudflareToken}`;
       }
       headers['cf-aig-gateway-id'] = this.config.gatewayId;
    }

    // Dynamic routing / Fallbacks controls
    if (skipCache) {
       headers['cf-aig-skip-cache'] = 'true';
    }

    const body = this.mapBody(provider, model, messages);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      return await response.json();
    } catch (error) {
      console.error("AI Gateway Request Failed:", error);
      throw error;
    }
  }

  private async handleError(response: Response) {
      const status = response.status;
      let errorText = '';
      try {
          const errBody = await response.json();
          errorText = JSON.stringify(errBody);
      } catch (e) {
          errorText = await response.text();
      }

      console.error(`Edge Network Error [${status}]:`, errorText);

      if (status === 403) {
          throw new Error(`[403 Forbidden] Cloudflare WAF/Geo-blocking prevented access, or Token lacks correct scopes. Ensure 'AI Gateway - Edit' or 'Workers AI' permissions. Response: ${errorText}`);
      } else if (status === 502 || status === 504) {
          throw new Error(`[${status} Gateway Error] Downstream provider timeout or routing restriction. The provider may be unreachable. Response: ${errorText}`);
      } else if (status === 401) {
          throw new Error(`[401 Unauthorized] Cloudflare API Token or Provider Token is missing or invalid. Response: ${errorText}`);
      }

      throw new Error(`[${status}] HTTP Error from AI Gateway. Response: ${errorText}`);
  }
}
