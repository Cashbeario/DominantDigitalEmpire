import React, { useState } from 'react';
import { Plus, MoreHorizontal, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  tag: 'DESIGN' | 'DEV' | 'MARKETING' | 'SEO';
  assignee: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
}

const MOCK_TASKS: Task[] = [
  { id: 't-1', title: 'Redesign Homepage', tag: 'DESIGN', assignee: 'Alice', dueDate: 'Oct 24', priority: 'HIGH', status: 'IN_PROGRESS' },
  { id: 't-2', title: 'Fix API Latency', tag: 'DEV', assignee: 'Bob', dueDate: 'Oct 25', priority: 'HIGH', status: 'TODO' },
  { id: 't-3', title: 'Q4 Marketing Strategy', tag: 'MARKETING', assignee: 'Charlie', dueDate: 'Nov 1', priority: 'MEDIUM', status: 'TODO' },
  { id: 't-4', title: 'Backlink Outreach', tag: 'SEO', assignee: 'Alice', dueDate: 'Oct 22', priority: 'LOW', status: 'DONE' },
  { id: 't-5', title: 'Client Dashboard V2', tag: 'DEV', assignee: 'Bob', dueDate: 'Nov 15', priority: 'HIGH', status: 'IN_PROGRESS' },
  { id: 't-6', title: 'Blog Content Plan', tag: 'MARKETING', assignee: 'David', dueDate: 'Oct 30', priority: 'MEDIUM', status: 'REVIEW' },
];

const COLUMNS = [
  { id: 'TODO', label: 'To Do', color: 'bg-slate-500' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-500' },
  { id: 'REVIEW', label: 'Review', color: 'bg-orange-500' },
  { id: 'DONE', label: 'Done', color: 'bg-green-500' },
];

const Projects: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'HIGH': return 'text-red-600 bg-red-50';
      case 'MEDIUM': return 'text-orange-600 bg-orange-50';
      case 'LOW': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getTagColor = (t: string) => {
    switch(t) {
      case 'DESIGN': return 'bg-purple-100 text-purple-700';
      case 'DEV': return 'bg-cyan-100 text-cyan-700';
      case 'MARKETING': return 'bg-pink-100 text-pink-700';
      case 'SEO': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const moveTask = (taskId: string) => {
    // Simple cycle for demo purposes
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const order = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
      const nextIdx = (order.indexOf(t.status) + 1) % order.length;
      return { ...t, status: order[nextIdx] as any };
    }));
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Projects & Tasks</h2>
            <p className="text-slate-500">Manage sprints, track progress, and ship faster.</p>
        </div>
        <div className="flex gap-2">
            <div className="flex -space-x-2 mr-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {['A','B','C','D'][i-1]}
                    </div>
                ))}
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                <Plus size={16} /> Add Task
            </button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-[1000px] h-full pb-4">
            {COLUMNS.map(col => (
                <div key={col.id} className="flex-1 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200/60">
                    <div className="p-4 flex items-center justify-between border-b border-slate-100">
                        <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                             <h3 className="font-bold text-slate-700 text-sm">{col.label}</h3>
                             <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                {tasks.filter(t => t.status === col.id).length}
                             </span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><Plus size={16} /></button>
                    </div>

                    <div className="p-3 flex-1 overflow-y-auto space-y-3">
                        {tasks.filter(t => t.status === col.id).map(task => (
                            <div 
                                key={task.id}
                                onClick={() => moveTask(task.id)}
                                className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wide ${getTagColor(task.tag)}`}>
                                        {task.tag}
                                    </span>
                                    <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                                <h4 className="font-semibold text-slate-800 text-sm mb-3 line-clamp-2">{task.title}</h4>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                            {task.assignee.charAt(0)}
                                        </div>
                                        {task.dueDate && (
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <Calendar size={12} />
                                                <span>{task.dueDate}</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;