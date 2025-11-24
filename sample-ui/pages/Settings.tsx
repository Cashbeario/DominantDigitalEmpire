import React, { useState } from 'react';
import { CreditCard, Shield, Users, Globe, Lock, Save, Check } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('GENERAL');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // State for form fields
  const [generalSettings, setGeneralSettings] = useState({
      agencyName: 'Apex Digital Agency',
      email: 'support@apexdigital.com',
      timezone: 'UTC (GMT+0)'
  });

  const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
          setIsSaving(false);
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 3000);
      }, 1000);
  };

  const renderTabContent = () => {
    switch(activeTab) {
        case 'GENERAL':
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Agency Name</label>
                            <input 
                                type="text" 
                                value={generalSettings.agencyName}
                                onChange={(e) => setGeneralSettings({...generalSettings, agencyName: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                            <input 
                                type="email" 
                                value={generalSettings.email}
                                onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                            <select 
                                value={generalSettings.timezone}
                                onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option>UTC (GMT+0)</option>
                                <option>EST (GMT-5)</option>
                                <option>PST (GMT-8)</option>
                            </select>
                        </div>
                    </div>
                </div>
            );
        case 'WHITELABEL':
             return (
                <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-sm text-slate-600">
                            <span className="font-bold">Pro Feature:</span> Customize the dashboard branding for your clients.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Custom Domain</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">https://</span>
                                <input type="text" placeholder="portal.youragency.com" className="flex-1 p-2.5 border border-slate-300 rounded-r-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Brand Color (Hex)</label>
                            <div className="flex items-center gap-2">
                                <input type="color" defaultValue="#4f46e5" className="h-10 w-10 p-1 rounded border border-slate-300 cursor-pointer" />
                                <input type="text" defaultValue="#4f46e5" className="flex-1 p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Login Page Logo</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer">
                                <p className="text-sm">Drag and drop logo here, or click to browse</p>
                                <p className="text-xs mt-1">PNG, JPG up to 2MB</p>
                            </div>
                        </div>
                    </div>
                </div>
             );
        case 'BILLING':
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded text-white"><CreditCard size={20}/></div>
                            <div>
                                <h4 className="font-bold text-slate-800">Agency Enterprise Plan</h4>
                                <p className="text-sm text-slate-600">$299/month • Next billing date: Oct 24, 2024</p>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-indigo-700 hover:underline">Manage Subscription</button>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-800 mb-3">Payment Methods</h4>
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-12 bg-slate-100 rounded border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500">VISA</div>
                                <p className="text-sm text-slate-700 font-medium">•••• •••• •••• 4242</p>
                            </div>
                             <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Default</span>
                        </div>
                         <button className="mt-3 text-sm font-medium text-indigo-600 flex items-center gap-1 hover:text-indigo-800">
                            + Add Payment Method
                         </button>
                    </div>
                </div>
            );
        case 'TEAM':
            return (
                <div>
                     <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-800">Team Members</h4>
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Invite Member</button>
                     </div>
                     <div className="border rounded-lg overflow-hidden border-slate-200">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                        {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MR'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {i === 1 ? 'John Doe' : i === 2 ? 'Alice Smith' : 'Mike Ross'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {i === 1 ? 'Owner' : i === 2 ? 'Developer' : 'Content Writer'}
                                        </p>
                                    </div>
                                </div>
                                <select className="text-sm border-slate-200 rounded-md bg-transparent">
                                    <option>Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </div>
                        ))}
                     </div>
                </div>
            );
        default: return null;
    }
  };

  return (
    <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
                <p className="text-slate-500">Manage your agency profile, billing, and team.</p>
            </div>
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 transition-all ${
                    isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                {isSaving ? (
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : isSaved ? (
                     <Check size={16} />
                ) : (
                     <Save size={16} />
                )}
                {isSaved ? 'Saved!' : 'Save Changes'}
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation for Settings */}
            <div className="w-full md:w-64 space-y-1">
                <button 
                    onClick={() => setActiveTab('GENERAL')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'GENERAL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                >
                    <Globe size={18} /> General
                </button>
                 <button 
                    onClick={() => setActiveTab('WHITELABEL')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'WHITELABEL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                >
                    <Shield size={18} /> White-Label
                </button>
                 <button 
                    onClick={() => setActiveTab('BILLING')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'BILLING' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                >
                    <CreditCard size={18} /> Billing & Plan
                </button>
                 <button 
                    onClick={() => setActiveTab('TEAM')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'TEAM' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                >
                    <Users size={18} /> Team Members
                </button>
                <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors text-slate-500 hover:bg-white hover:text-slate-700`}
                >
                    <Lock size={18} /> API Keys
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                {renderTabContent()}
            </div>
        </div>
    </div>
  );
};

export default Settings;