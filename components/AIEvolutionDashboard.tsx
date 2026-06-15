import React, { useState, useEffect } from 'react';
import { useLanguage } from '../types';

interface RoadmapItem {
  id: string;
  title: string;
  status: 'planned' | 'in-progress' | 'completed';
  description: string;
}

interface TrendSuggestion {
  id: string;
  topic: string;
  description: string;
  relevance: number;
  estHours: number;
}

const AIEvolutionDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'trends' | 'roadmap'>('trends');
  const [selectedItem, setSelectedItem] = useState<TrendSuggestion | RoadmapItem | null>(null);
  const [aiEstimation, setAiEstimation] = useState<{hours: number, cost: string, backend: string, frontend: string} | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const mockTrends: TrendSuggestion[] = [
    { id: 't1', topic: 'IoT Drone Patrol Integration', description: 'Integrate drone patrolling modules alongside LoRa sensors for early forest fire detection.', relevance: 98, estHours: 120 },
    { id: 't2', topic: 'Water Quality AI Analyzer', description: 'Add a new module to analyze water quality metrics in real-time using historical AI models.', relevance: 85, estHours: 65 },
    { id: 't3', topic: 'Blockchain Supply Chain', description: 'Track medical supplies using smart contracts to ensure transparency to the last mile.', relevance: 75, estHours: 180 },
  ];

  const mockRoadmap: RoadmapItem[] = [
    { id: 'r1', title: 'Phase 1: Basic Telemetry', status: 'completed', description: 'Core ingestion of basic sensor readings.' },
    { id: 'r2', title: 'Phase 2: Predictive Alerts', status: 'in-progress', description: 'Generate warning alerts using threshold heuristics.' },
    { id: 'r3', title: 'Phase 3: Autonomous Dispatch', status: 'planned', description: 'Automatically dispatch responder units based on severe alert verification.' },
  ];

  const handleSupportClick = (item: TrendSuggestion | RoadmapItem) => {
    setSelectedItem(item);
    setIsEstimating(true);
    setAiEstimation(null);

    // Simulate AI processing (COCOMO 2.0)
    setTimeout(() => {
      let hours = 0;
      if ('estHours' in item) {
          hours = item.estHours;
      } else {
          hours = Math.floor(Math.random() * 100) + 40;
      }
      
      setAiEstimation({
        hours: hours,
        cost: `~${(hours * 1500000).toLocaleString('en-US')} IRR`, // Example cost calculation
        backend: `${Math.floor(hours * 0.6)} hours (Node.js/Express RESTful APIs)`,
        frontend: `${Math.floor(hours * 0.4)} hours (React Components & Integration)`
      });
      setIsEstimating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
           <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
             Smart System Evolution
           </h1>
           <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
             A living platform intelligence. Let AI continuously analyze the market, suggest new features, and estimate development costs using advanced engineering models.
           </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8 border-b border-slate-700 pb-4">
           <button 
             onClick={() => setActiveTab('trends')}
             className={`px-4 py-2 font-semibold text-sm rounded-md transition-colors ${activeTab === 'trends' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
           >
             Market Trends & Suggestions
           </button>
           <button 
             onClick={() => setActiveTab('roadmap')}
             className={`px-4 py-2 font-semibold text-sm rounded-md transition-colors ${activeTab === 'roadmap' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
           >
             Product Roadmap
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'trends' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Proactive Feature Suggestions</h2>
                {mockTrends.map((trend) => (
                  <div key={trend.id} className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-slate-100 flex items-center">
                           <svg className="w-5 h-5 mr-2 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                           </svg>
                           {trend.topic}
                       </h3>
                       <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded border border-emerald-700/50">
                         {trend.relevance}% Match
                       </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{trend.description}</p>
                    <button 
                      onClick={() => handleSupportClick(trend)}
                      className="bg-indigo-600/20 text-indigo-400 border border-indigo-600/40 hover:bg-indigo-600/40 px-4 py-2 rounded-md text-sm font-semibold transition-colors w-full sm:w-auto flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      AI Development Support
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Official Roadmap Timeline</h2>
                <div className="relative border-l border-slate-700 ml-3 space-y-8 pb-4">
                  {mockRoadmap.map((item) => (
                    <div key={item.id} className="relative pl-6">
                      <div className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-slate-900 ${item.status === 'completed' ? 'bg-emerald-500' : item.status === 'in-progress' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
                      <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                           <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
                           <span className={`text-xs px-2 py-1 rounded w-max ${item.status === 'completed' ? 'bg-emerald-900/30 text-emerald-400' : item.status === 'in-progress' ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-700 text-slate-300'}`}>
                             {item.status.toUpperCase()}
                           </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                        {item.status !== 'completed' && (
                            <button 
                              onClick={() => handleSupportClick(item)}
                              className="bg-indigo-600/20 text-indigo-400 border border-indigo-600/40 hover:bg-indigo-600/40 px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Estimate & Develop with AI
                            </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 sticky top-24">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                 <svg className="w-5 h-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
                 AI Pair-Programmer Cost Estimation
               </h3>

               {selectedItem ? (
                 <div className="space-y-4">
                    <div className="bg-slate-900 p-3 rounded border border-slate-700">
                        <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Target Module</span>
                        <span className="text-sm font-medium text-slate-200">
                            {'topic' in selectedItem ? selectedItem.topic : selectedItem.title}
                        </span>
                    </div>

                    {isEstimating ? (
                        <div className="py-8 flex flex-col items-center justify-center space-y-4">
                           <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                           <p className="text-sm text-slate-400 animate-pulse">Running COCOMO 2.0 Analysis...</p>
                        </div>
                    ) : aiEstimation ? (
                        <div className="space-y-4">
                           <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-lg">
                               <span className="block text-xs text-emerald-400 font-semibold mb-1 uppercase tracking-wider">Total Development Effort</span>
                               <span className="text-3xl font-extrabold text-white">{aiEstimation.hours} <span className="text-lg font-medium text-slate-400">Hours</span></span>
                           </div>

                           <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3">
                               <div>
                                   <span className="block text-xs text-slate-500 uppercase">Estimated Budget</span>
                                   <span className="text-lg font-bold text-slate-200">{aiEstimation.cost}</span>
                               </div>
                               <div className="border-t border-slate-700/50 pt-2">
                                   <span className="block text-xs text-slate-500 uppercase mb-1">Task Breakdown</span>
                                   <div className="space-y-1">
                                       <div className="flex justify-between text-sm">
                                           <span className="text-slate-400">Backend</span>
                                           <span className="text-slate-200 font-medium">{aiEstimation.backend}</span>
                                       </div>
                                       <div className="flex justify-between text-sm">
                                           <span className="text-slate-400">Frontend UI</span>
                                           <span className="text-slate-200 font-medium">{aiEstimation.frontend}</span>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className="flex gap-2 mt-4">
                               <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                                   Generate Boilerplate
                               </button>
                               <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                                   Edit Scope
                               </button>
                           </div>
                        </div>
                    ) : null}
                 </div>
               ) : (
                   <div className="text-center py-10">
                       <p className="text-sm text-slate-500">Select a trend or roadmap item to view AI-driven engineering estimates.</p>
                   </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEvolutionDashboard;
