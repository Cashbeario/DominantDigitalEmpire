import React, { useState } from 'react';
import { MOCK_DEALS } from '../constants';
import { DealStage, Deal } from '../types';
import { MoreHorizontal, Plus, Search, Filter } from 'lucide-react';

const CRM: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);

  // Simple mock function to simulate moving items (cycling stages) for demo
  const cycleStage = (id: string) => {
    setDeals(deals.map(d => {
        if(d.id !== id) return d;
        const stages = Object.values(DealStage);
        const currentIndex = stages.indexOf(d.stage);
        const nextStage = stages[(currentIndex + 1) % stages.length];
        return { ...d, stage: nextStage };
    }));
  };

  const getColumnTotal = (stage: DealStage) => {
    return deals.filter(d => d.stage === stage).reduce((acc, curr) => acc + curr.value, 0);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Sales Pipeline</h2>
            <p className="text-slate-500">Manage deal flow and client acquisition.</p>
        </div>
        <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search deals..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600">
                <Filter size={20} />
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                <Plus size={16} /> New Deal
            </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-[1000px] h-full">
            {Object.values(DealStage).map((stage) => (
                <div key={stage} className="flex-1 bg-slate-100 rounded-xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{stage.replace('_', ' ')}</h3>
                            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                {deals.filter(d => d.stage === stage).length}
                            </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">${getColumnTotal(stage).toLocaleString()}</span>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                        {deals.filter(d => d.stage === stage).map(deal => (
                            <div 
                                key={deal.id} 
                                onClick={() => cycleStage(deal.id)}
                                className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                        {deal.clientName}
                                    </span>
                                    <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg">${deal.value.toLocaleString()}</h4>
                                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                    <span>Prob: {deal.probability}%</span>
                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-green-500 rounded-full" 
                                            style={{width: `${deal.probability}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                         <button className="w-full py-2 text-slate-400 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:text-slate-500 hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-1">
                            <Plus size={14} /> Add
                         </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CRM;