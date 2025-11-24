import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { ArrowUp, ArrowDown, Search, Globe, Clock, ShieldCheck } from 'lucide-react';

const TRAFFIC_DATA = [
  { name: 'Mon', visitors: 1240, bounce: 45 },
  { name: 'Tue', visitors: 1560, bounce: 42 },
  { name: 'Wed', visitors: 1890, bounce: 38 },
  { name: 'Thu', visitors: 1670, bounce: 40 },
  { name: 'Fri', visitors: 2100, bounce: 35 },
  { name: 'Sat', visitors: 2450, bounce: 30 },
  { name: 'Sun', visitors: 2300, bounce: 32 },
];

const DEVICE_DATA = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 10 },
];

const SEO_DATA = [
  { keyword: 'vps hosting services', rank: 3, change: 2, vol: '12K' },
  { keyword: 'digital agency tools', rank: 1, change: 0, vol: '5.4K' },
  { keyword: 'best crm for agencies', rank: 5, change: -1, vol: '8.1K' },
  { keyword: 'white label saas', rank: 8, change: 4, vol: '2.2K' },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#cbd5e1'];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Analytics & SEO</h2>
            <p className="text-slate-500">Deep dive into traffic sources, rankings, and uptime.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
           <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-800 rounded-md">7 Days</button>
           <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">30 Days</button>
           <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">90 Days</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Total Visits</span>
                <Globe size={18} className="text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">42,890</h3>
            <span className="text-xs text-green-600 flex items-center mt-1"><ArrowUp size={12} className="mr-1"/> 12% vs last week</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Avg. Duration</span>
                <Clock size={18} className="text-violet-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">4m 32s</h3>
            <span className="text-xs text-green-600 flex items-center mt-1"><ArrowUp size={12} className="mr-1"/> 8% vs last week</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Bounce Rate</span>
                <ShieldCheck size={18} className="text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">38.4%</h3>
            <span className="text-xs text-green-600 flex items-center mt-1"><ArrowDown size={12} className="mr-1"/> 2% better</span>
        </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Keywords Ranked</span>
                <Search size={18} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">1,204</h3>
            <span className="text-xs text-green-600 flex items-center mt-1"><ArrowUp size={12} className="mr-1"/> 45 new</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Traffic Overview</h3>
             <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRAFFIC_DATA}>
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={3} fill="url(#colorVisits)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-2">Device Usage</h3>
             <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={DEVICE_DATA} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value"
                        >
                            {DEVICE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold text-slate-800">55%</p>
                    <p className="text-xs text-slate-500">Desktop</p>
                </div>
             </div>
             <div className="flex justify-center gap-4 mt-2">
                 {DEVICE_DATA.map((entry, index) => (
                     <div key={entry.name} className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                         <span className="text-xs text-slate-600">{entry.name}</span>
                     </div>
                 ))}
             </div>
        </div>
      </div>

      {/* Bottom Section: SEO & Uptime */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* SEO Table */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Top SEO Keywords</h3>
                <button className="text-xs text-indigo-600 font-medium hover:underline">View All</button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                        <th className="pb-3 font-medium">Keyword</th>
                        <th className="pb-3 font-medium">Volume</th>
                        <th className="pb-3 font-medium">Rank</th>
                        <th className="pb-3 font-medium text-right">Change</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {SEO_DATA.map((item, i) => (
                        <tr key={i} className="border-b border-slate-50 last:border-0 group hover:bg-slate-50">
                            <td className="py-3 text-slate-700 font-medium">{item.keyword}</td>
                            <td className="py-3 text-slate-500">{item.vol}</td>
                            <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                                    #{item.rank}
                                </span>
                            </td>
                            <td className="py-3 text-right">
                                {item.change > 0 ? (
                                    <span className="text-green-600 flex items-center justify-end gap-1"><ArrowUp size={12}/> {item.change}</span>
                                ) : item.change < 0 ? (
                                    <span className="text-red-500 flex items-center justify-end gap-1"><ArrowDown size={12}/> {Math.abs(item.change)}</span>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>

         {/* Uptime Heatmap / Log */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">System Health & Uptime</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                            <p className="text-sm font-bold text-green-800">All Systems Operational</p>
                            <p className="text-xs text-green-600">Last incident: 24 days ago</p>
                        </div>
                    </div>
                    <span className="text-lg font-bold text-green-700">99.98%</span>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Last 30 Days</span>
                        <span>Today</span>
                    </div>
                    <div className="flex gap-1 h-8">
                        {Array.from({length: 30}).map((_, i) => (
                            <div 
                                key={i} 
                                className={`flex-1 rounded-sm ${Math.random() > 0.9 ? 'bg-yellow-400' : 'bg-green-400'}`}
                                title={`Day ${i+1}: No Incidents`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;