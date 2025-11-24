import React, { useState } from 'react';
import { Plus, ExternalLink, MoreVertical, Layout, Type, Image, Code, Eye, Smartphone, Monitor, Tablet, ArrowLeft, Save, Trash2 } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  url: string;
  status: 'LIVE' | 'STAGING' | 'BUILDING';
  thumbnail: string;
  lastEdited: string;
}

interface CanvasElement {
    id: string;
    type: 'HEADER' | 'HERO' | 'FEATURES' | 'TEXT' | 'IMAGE';
    content?: string;
}

const MOCK_SITES: Site[] = [
  { id: '1', name: 'Apex Finance', url: 'apex-finance.dominant.app', status: 'LIVE', thumbnail: 'bg-indigo-100', lastEdited: '2 hours ago' },
  { id: '2', name: 'Bakery Delight', url: 'bakery-delight.com', status: 'STAGING', thumbnail: 'bg-orange-100', lastEdited: '1 day ago' },
  { id: '3', name: 'TechStart Landing', url: 'techstart.io', status: 'BUILDING', thumbnail: 'bg-blue-100', lastEdited: '5 mins ago' },
];

const Sites: React.FC = () => {
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  
  // Builder State
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([
      { id: 'el-1', type: 'HEADER' },
      { id: 'el-2', type: 'HERO' },
      { id: 'el-3', type: 'FEATURES' }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const openBuilder = (site: Site) => {
    setSelectedSite(site);
    setIsBuilderMode(true);
  };

  const addElement = (type: CanvasElement['type']) => {
      const newEl = { id: `el-${Date.now()}`, type };
      setCanvasElements([...canvasElements, newEl]);
      // Scroll to bottom (mock)
  };

  const removeElement = (id: string) => {
      setCanvasElements(canvasElements.filter(el => el.id !== id));
      if(selectedElementId === id) setSelectedElementId(null);
  }

  const renderCanvasElement = (el: CanvasElement) => {
      const isSelected = selectedElementId === el.id;
      const baseClass = `border-2 border-dashed relative group transition-all cursor-pointer ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-transparent hover:border-indigo-300'}`;
      
      const DeleteBtn = () => (
          <button 
            onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
            className="absolute -right-3 -top-3 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
          >
              <Trash2 size={12} />
          </button>
      );

      switch(el.type) {
          case 'HEADER':
              return (
                <div onClick={() => setSelectedElementId(el.id)} className={baseClass}>
                  <DeleteBtn />
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">Header</div>
                  <nav className="p-6 flex justify-between items-center border-b border-slate-100 bg-white">
                    <div className="font-bold text-xl text-slate-800">Logo</div>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span>Home</span>
                      <span>Services</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </nav>
                </div>
              );
          case 'HERO':
               return (
                <div onClick={() => setSelectedElementId(el.id)} className={`${baseClass} p-12 text-center bg-white`}>
                  <DeleteBtn />
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">Hero Section</div>
                  <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Build Faster. Scale Harder.</h1>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">The ultimate platform for digital agencies to dominate their market share.</p>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg">Get Started</button>
               </div>
               );
          case 'FEATURES':
               return (
                <div onClick={() => setSelectedElementId(el.id)} className={`${baseClass} grid grid-cols-3 gap-8 p-12 bg-slate-50`}>
                  <DeleteBtn />
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">Feature Grid</div>
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg mb-4"></div>
                      <h3 className="font-bold mb-2">Feature {i}</h3>
                      <p className="text-sm text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  ))}
               </div>
               );
          case 'TEXT':
              return (
                  <div onClick={() => setSelectedElementId(el.id)} className={`${baseClass} p-8 bg-white`}>
                      <DeleteBtn />
                      <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">Text Block</div>
                      <h3 className="text-2xl font-bold mb-2">New Section</h3>
                      <p className="text-slate-600">Click to edit this text content. This is a placeholder for your awesome copy.</p>
                  </div>
              );
          case 'IMAGE':
               return (
                  <div onClick={() => setSelectedElementId(el.id)} className={`${baseClass} p-8 bg-slate-100 flex items-center justify-center min-h-[200px]`}>
                      <DeleteBtn />
                      <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">Image Container</div>
                      <div className="text-slate-400 flex flex-col items-center">
                          <Image size={48} />
                          <span className="text-sm mt-2">Image Placeholder</span>
                      </div>
                  </div>
              );
          default: return null;
      }
  }

  if (isBuilderMode && selectedSite) {
    return (
      <div className="fixed inset-0 bg-slate-100 z-[60] flex flex-col h-screen">
        {/* Builder Header */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsBuilderMode(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{selectedSite.name}</h3>
              <p className="text-xs text-slate-500">Editing Home Page</p>
            </div>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="p-1.5 text-slate-600 bg-white shadow-sm rounded-md"><Monitor size={16} /></button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600"><Tablet size={16} /></button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600"><Smartphone size={16} /></button>
          </div>

          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium border border-transparent hover:border-slate-200">
               <Eye size={16} /> Preview
             </button>
             <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
               <Save size={16} /> Publish
             </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components */}
          <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-100">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Components</h4>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
               <button onClick={() => addElement('HERO')} className="aspect-square border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <Layout size={24} className="text-slate-400" />
                  <span className="text-xs text-slate-600 font-medium">Hero</span>
               </button>
               <button onClick={() => addElement('TEXT')} className="aspect-square border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <Type size={24} className="text-slate-400" />
                  <span className="text-xs text-slate-600 font-medium">Text</span>
               </button>
               <button onClick={() => addElement('IMAGE')} className="aspect-square border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <Image size={24} className="text-slate-400" />
                  <span className="text-xs text-slate-600 font-medium">Image</span>
               </button>
               <button onClick={() => addElement('FEATURES')} className="aspect-square border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <Code size={24} className="text-slate-400" />
                  <span className="text-xs text-slate-600 font-medium">Grid</span>
               </button>
            </div>
            <div className="p-4 bg-slate-50 mt-auto border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center">Click components to add them to the canvas.</p>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg min-h-[800px] rounded-sm relative flex flex-col">
               {canvasElements.length === 0 && (
                   <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                       <Layout size={64} className="mb-4 opacity-20" />
                       <p>Canvas is empty. Add components from the left.</p>
                   </div>
               )}
               {canvasElements.map(el => (
                   <div key={el.id}>
                       {renderCanvasElement(el)}
                   </div>
               ))}
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          {selectedElementId ? (
            <div className="w-72 bg-white border-l border-slate-200 p-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">Properties</h4>
                <div className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Typography</label>
                    <select className="w-full text-sm border-slate-200 rounded-md p-2 border"><option>Inter</option><option>Roboto</option></select>
                </div>
                <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Font Size</label>
                    <div className="flex items-center gap-2">
                    <input type="range" className="flex-1 accent-indigo-600" />
                    <span className="text-xs text-slate-500">16px</span>
                    </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Padding</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="T" className="text-sm border-slate-200 rounded-md p-2 border" />
                        <input type="number" placeholder="R" className="text-sm border-slate-200 rounded-md p-2 border" />
                        <input type="number" placeholder="B" className="text-sm border-slate-200 rounded-md p-2 border" />
                        <input type="number" placeholder="L" className="text-sm border-slate-200 rounded-md p-2 border" />
                    </div>
                </div>
                </div>
            </div>
          ) : (
             <div className="w-72 bg-white border-l border-slate-200 p-4 flex items-center justify-center text-center">
                 <div>
                     <p className="text-sm font-medium text-slate-800">No selection</p>
                     <p className="text-xs text-slate-500 mt-1">Click an element on the canvas to edit properties.</p>
                 </div>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Websites</h2>
            <p className="text-slate-500">Manage, edit, and deploy client websites.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Plus size={16} /> Create New Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_SITES.map((site) => (
          <div key={site.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
            <div className={`h-40 w-full ${site.thumbnail} flex items-center justify-center relative`}>
               <Layout size={48} className="text-slate-400 opacity-50" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => openBuilder(site)}
                    className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50"
                  >
                    Edit Site
                  </button>
                  <button className="bg-slate-800 text-white p-2 rounded-lg hover:bg-black">
                    <ExternalLink size={18} />
                  </button>
               </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-800 truncate">{site.name}</h3>
                  <a href={`https://${site.url}`} className="text-xs text-indigo-600 hover:underline truncate block">{site.url}</a>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                  site.status === 'LIVE' ? 'bg-green-100 text-green-700' :
                  site.status === 'STAGING' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {site.status}
                </span>
                <span className="text-xs text-slate-400">Edited {site.lastEdited}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* New Site Placeholder */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/10 cursor-pointer transition-all min-h-[200px]">
           <Plus size={32} className="mb-2" />
           <span className="font-medium">New Project</span>
        </div>
      </div>
    </div>
  );
};

export default Sites;