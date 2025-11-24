import React, { useState } from 'react';
import { generateMarketingContent } from '../services/geminiService';
import { Bot, Sparkles, Copy, RefreshCw, PenTool } from 'lucide-react';
import { AIContentRequest } from '../types';

const AIStudio: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState<AIContentRequest>({
    topic: '',
    tone: 'Professional',
    type: 'BLOG'
  });

  const handleGenerate = async () => {
    if(!formData.topic) return;
    setLoading(true);
    const content = await generateMarketingContent(formData);
    setResult(content);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col xl:flex-row gap-6">
      {/* Input Panel */}
      <div className="w-full xl:w-1/3 space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Bot className="text-indigo-600" /> Content Studio
            </h2>
            <p className="text-slate-500">Generate high-converting copy using Gemini AI models.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {['BLOG', 'SOCIAL', 'EMAIL', 'AD'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFormData({...formData, type: t as any})}
                            className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                                formData.type === t 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Keywords</label>
                <textarea 
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    placeholder="e.g., The benefits of VPS hosting for SEO..."
                    className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tone of Voice</label>
                <select 
                    value={formData.tone}
                    onChange={(e) => setFormData({...formData, tone: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                >
                    <option>Professional</option>
                    <option>Witty & Fun</option>
                    <option>Persuasive</option>
                    <option>Urgent</option>
                    <option>Educational</option>
                </select>
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !formData.topic}
                className={`w-full py-3 rounded-lg font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${
                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {loading ? 'Thinking...' : 'Generate Content'}
            </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="w-full xl:w-2/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <PenTool size={18} /> Output Preview
            </h3>
            <div className="flex gap-2">
                 <button className="text-xs font-medium text-slate-500 hover:text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors">
                    Markdown
                </button>
                <button className="flex items-center gap-1 text-xs font-medium bg-white border border-slate-200 px-3 py-1 rounded-md hover:bg-slate-50 text-slate-700 transition-colors">
                    <Copy size={12} /> Copy
                </button>
            </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-white">
            {result ? (
                <div className="prose prose-slate max-w-none">
                     {result.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 whitespace-pre-wrap">{line}</p>
                     ))}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                    <Bot size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Ready to create masterpiece content.</p>
                    <p className="text-sm">Configure your prompt on the left to begin.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AIStudio;