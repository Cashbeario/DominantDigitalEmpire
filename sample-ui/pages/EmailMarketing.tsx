import React from 'react';
import { Mail, Send, Users, BarChart2, Plus, ArrowUpRight, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EMAIL_STATS = [
  { name: 'Mon', sent: 1200, open: 450 },
  { name: 'Tue', sent: 1800, open: 780 },
  { name: 'Wed', sent: 2200, open: 1100 },
  { name: 'Thu', sent: 1600, open: 560 },
  { name: 'Fri', sent: 3400, open: 1400 },
  { name: 'Sat', sent: 800, open: 200 },
  { name: 'Sun', sent: 500, open: 150 },
];

const CAMPAIGNS = [
  { id: 1, name: 'October Newsletter', status: 'SENT', sent: 12450, openRate: '42%', clickRate: '12%', date: 'Oct 24, 2024' },
  { id: 2, name: 'Black Friday Teaser', status: 'SCHEDULED', sent: 0, openRate: '-', clickRate: '-', date: 'Nov 15, 2024' },
  { id: 3, name: 'Welcome Sequence #1', status: 'ACTIVE', sent: 8940, openRate: '68%', clickRate: '25%', date: 'Automated' },
  { id: 4, name: 'Product Update: v2.0', status: 'DRAFT', sent: 0, openRate: '-', clickRate: '-', date: '-' },
];

const EmailMarketing: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Email Marketing</h2>
            <p className="text-slate-500">Automate campaigns and track engagement.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Plus size={16} /> Create Campaign
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Users size={20} />
                </div>
                <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} className="mr-1" /> +12%
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Subscribers</p>
            <h3 className="text-3xl font-bold text-slate-800">24,892</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Mail size={20} />
                </div>
                <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} className="mr-1" /> +5%
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Avg. Open Rate</p>
            <h3 className="text-3xl font-bold text-slate-800">42.8%</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                    <Send size={20} />
                </div>
                <span className="text-xs font-bold text-slate-500 flex items-center bg-slate-50 px-2 py-1 rounded-full">
                    Last 30 Days
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Emails Sent</p>
            <h3 className="text-3xl font-bold text-slate-800">142,050</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Engagement Performance</h3>
             <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={EMAIL_STATS}>
                        <defs>
                            <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="sent" stroke="#4f46e5" strokeWidth={3} fill="url(#colorSent)" />
                        <Area type="monotone" dataKey="open" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorOpen)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>

        {/* Quick Actions / Templates */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Quick Templates</h3>
            <div className="space-y-3">
                {['Monthly Newsletter', 'Product Launch', 'Welcome Series', 'Re-engagement'].map((template, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-slate-100 rounded flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-indigo-600">
                                <Mail size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">{template}</span>
                        </div>
                        <Plus size={16} className="text-slate-300 group-hover:text-indigo-600" />
                    </button>
                ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">List Health</h4>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Active</span>
                            <span className="font-bold text-slate-800">85%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '85%'}}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Bounced</span>
                            <span className="font-bold text-slate-800">2.4%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{width: '2.4%'}}></div></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Campaigns</h3>
            <div className="flex gap-2">
                <input type="text" placeholder="Search..." className="text-sm border border-slate-300 rounded-md px-3 py-1.5" />
            </div>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3">Campaign Name</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Sent</th>
                    <th className="px-6 py-3">Open Rate</th>
                    <th className="px-6 py-3">Click Rate</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {CAMPAIGNS.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 group">
                        <td className="px-6 py-4 font-medium text-slate-800">{c.name}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                c.status === 'SENT' ? 'bg-green-100 text-green-700' :
                                c.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                                c.status === 'ACTIVE' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {c.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{c.sent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-slate-600">{c.openRate}</td>
                        <td className="px-6 py-4 text-slate-600">{c.clickRate}</td>
                        <td className="px-6 py-4 text-slate-500">{c.date}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailMarketing;