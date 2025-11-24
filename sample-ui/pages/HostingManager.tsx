import React, { useState } from 'react';
import { MOCK_SERVERS } from '../constants';
import { ServerNode, ServerStatus } from '../types';
import { Terminal, Cpu, HardDrive, Zap, Play, Square, RotateCw, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const HostingManager: React.FC = () => {
  const [servers, setServers] = useState<ServerNode[]>(MOCK_SERVERS);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const getStatusColor = (status: ServerStatus) => {
    switch (status) {
      case ServerStatus.RUNNING: return 'bg-green-500';
      case ServerStatus.STOPPED: return 'bg-red-500';
      case ServerStatus.MAINTENANCE: return 'bg-orange-500';
      case ServerStatus.PROVISIONING: return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  const handleAction = (id: string, action: 'START' | 'STOP' | 'RESTART') => {
    setProcessingId(id);
    
    // Simulate network delay
    setTimeout(() => {
        setServers(prev => prev.map(server => {
            if (server.id !== id) return server;
            
            let newStatus = server.status;
            let cpu = server.cpuUsage;
            
            if (action === 'START') {
                newStatus = ServerStatus.RUNNING;
                cpu = Math.floor(Math.random() * 30) + 10;
            } else if (action === 'STOP') {
                newStatus = ServerStatus.STOPPED;
                cpu = 0;
            } else if (action === 'RESTART') {
                newStatus = ServerStatus.RUNNING;
                cpu = Math.floor(Math.random() * 40) + 10;
            }

            return { ...server, status: newStatus, cpuUsage: cpu };
        }));
        setProcessingId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">VPS Infrastructure</h2>
            <p className="text-slate-500">Manage isolated containers and fleet performance.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Zap size={16} /> Deploy New Node
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Server List */}
        <div className="xl:col-span-2 grid grid-cols-1 gap-4">
            {servers.map((server) => (
                <div key={server.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                    {processingId === server.id && (
                        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                            <RotateCw className="animate-spin text-indigo-600" size={32} />
                        </div>
                    )}

                    <div className="flex-1 flex items-start gap-4 w-full">
                        <div className="p-3 bg-slate-100 rounded-lg">
                            <ServerNodeIcon status={server.status} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-800">{server.name}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase ${getStatusColor(server.status).replace('bg-', 'bg-opacity-80 bg-')}`}>
                                    {server.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 font-mono mt-1">{server.ip} • {server.region}</p>
                            <div className="flex gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-1 text-slate-600">
                                    <Cpu size={14} /> {server.cpuUsage}% CPU
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                    <Zap size={14} /> {server.ramUsage}% RAM
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                    <HardDrive size={14} /> {server.diskUsage}% SSD
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                        {server.status !== ServerStatus.RUNNING && (
                            <button 
                                onClick={() => handleAction(server.id, 'START')}
                                className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" 
                                title="Start"
                            >
                                <Play size={18} />
                            </button>
                        )}
                        {server.status === ServerStatus.RUNNING && (
                            <>
                                <button 
                                    onClick={() => handleAction(server.id, 'RESTART')}
                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                                    title="Restart"
                                >
                                    <RotateCw size={18} />
                                </button>
                                <button 
                                    onClick={() => handleAction(server.id, 'STOP')}
                                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                    title="Stop"
                                >
                                    <Square size={18} />
                                </button>
                            </>
                        )}
                        <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors" title="Terminal">
                            <Terminal size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Global Resource Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Cluster Load Distribution</h3>
            <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={servers}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="cpuUsage" fill="#4f46e5" radius={[4, 4, 0, 0]} name="CPU %" />
                        <Bar dataKey="ramUsage" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="RAM %" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6 bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-hidden relative h-48">
                <div className="absolute top-2 right-2 flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <p className="mb-1"><span className="text-blue-400">admin@dominant-os</span>:<span className="text-blue-200">~</span>$ docker ps -a</p>
                <p className="mb-1 text-slate-300">CONTAINER ID   IMAGE          STATUS    PORTS</p>
                {servers.filter(s => s.status === ServerStatus.RUNNING).map(s => (
                    <p key={s.id} className="mb-1 text-slate-300">{s.id.substring(4, 12)}...   nginx:latest   Up      80/tcp</p>
                ))}
                <p className="animate-pulse">_</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const ServerNodeIcon: React.FC<{status: ServerStatus}> = ({status}) => {
    const color = status === ServerStatus.RUNNING ? 'text-green-600' : status === ServerStatus.STOPPED ? 'text-red-500' : 'text-slate-400';
    return <div className={color}><HardDrive size={24} /></div>
}

export default HostingManager;