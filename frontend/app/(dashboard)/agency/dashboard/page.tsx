"use client"

import React from 'react';
import { DollarSign, Users, Activity, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '@/components/ui/stats-card';

const data = [
  { name: 'Jan', revenue: 4000, clients: 24 },
  { name: 'Feb', revenue: 3000, clients: 13 },
  { name: 'Mar', revenue: 2000, clients: 38 },
  { name: 'Apr', revenue: 2780, clients: 39 },
  { name: 'May', revenue: 1890, clients: 48 },
  { name: 'Jun', revenue: 2390, clients: 38 },
  { name: 'Jul', revenue: 3490, clients: 43 },
];

export default function AgencyDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Agency Dashboard</h2>
          <p className="text-slate-500">Real-time overview of your digital agency.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">Export Report</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Add Client</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value="$128,430" 
          change="12.5%" 
          isPositive={true} 
          icon={DollarSign} 
          color="text-emerald-600 bg-emerald-50" 
        />
        <StatsCard 
          title="Active Clients" 
          value="24" 
          change="4 New" 
          isPositive={true} 
          icon={Users} 
          color="text-blue-600 bg-blue-50" 
        />
        <StatsCard 
          title="Active Websites" 
          value="36" 
          change="8.3%" 
          isPositive={true} 
          icon={Globe} 
          color="text-violet-600 bg-violet-50" 
        />
        <StatsCard 
          title="Client Satisfaction" 
          value="98%" 
          change="2%" 
          isPositive={true} 
          icon={Activity} 
          color="text-green-600 bg-green-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New client registered", client: "TechCorp Inc", time: "2 mins ago" },
              { action: "Website deployed", client: "StartupXYZ", time: "15 mins ago" },
              { action: "Payment received", client: "MegaBusiness", time: "1 hour ago" },
              { action: "Project milestone", client: "DesignStudio", time: "2 hours ago" },
              { action: "Support ticket closed", client: "RetailChain", time: "4 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.client}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">Add Client</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">New Website</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">Generate Invoice</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">View Analytics</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">Team Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}