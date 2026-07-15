const AUDIT_KEY = 'civicavita_audit_v1';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  userEmail: string | null;
  details?: string;
}

export const AuditLog = {
  all(): AuditEntry[] {
    try {
      const raw = localStorage.getItem(AUDIT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  },
  log(action: string, userOrEmail: string | { email?: string } | null, details?: string): void {
    const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email || null;
    const entries = this.all();
    entries.unshift({
      id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      action,
      userEmail: email,
      details,
    });
    localStorage.setItem(AUDIT_KEY, JSON.stringify(entries.slice(0, 200)));
  },
};
