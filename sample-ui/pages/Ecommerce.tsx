import React from 'react';
import { ShoppingBag, DollarSign, Package, TrendingUp, MoreHorizontal, Plus, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const PRODUCTS = [
  { id: 1, name: 'Premium SEO Audit', price: '$199.00', stock: 'Unlimited', sales: 124, status: 'ACTIVE' },
  { id: 2, name: 'Digital Marketing Course', price: '$49.00', stock: 'Unlimited', sales: 854, status: 'ACTIVE' },
  { id: 3, name: 'Agency Branding Kit', price: '$299.00', stock: '42 Left', sales: 12, status: 'LOW_STOCK' },
  { id: 4, name: '1-Hour Consultation', price: '$150.00', stock: '5 Slots', sales: 45, status: 'ACTIVE' },
  { id: 5, name: 'Legacy Template Pack', price: '$29.00', stock: 'N/A', sales: 0, status: 'DRAFT' },
];

const ORDERS = [
  { id: '#ORD-7829', customer: 'Acme Corp', product: 'Premium SEO Audit', date: '2 mins ago', amount: '$199.00', status: 'COMPLETED' },
  { id: '#ORD-7828', customer: 'Jane Doe', product: 'Digital Marketing Course', date: '15 mins ago', amount: '$49.00', status: 'COMPLETED' },
  { id: '#ORD-7827', customer: 'Stark Ind', customerImg: '', product: 'Agency Branding Kit', date: '1 hour ago', amount: '$299.00', status: 'PROCESSING' },
];

const Ecommerce: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Store & Products</h2>
            <p className="text-slate-500">Manage digital assets, inventory, and orders.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Total Revenue</span>
                <div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={18} /></div>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">$12,450</h3>
             <span className="text-xs text-green-600 flex items-center mt-1">+15% this month</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Orders</span>
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><ShoppingBag size={18} /></div>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">184</h3>
             <span className="text-xs text-green-600 flex items-center mt-1">+8 new today</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Products</span>
                <div className="p-2 bg-violet-100 rounded-lg text-violet-600"><Package size={18} /></div>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">12</h3>
             <span className="text-xs text-slate-400 mt-1">4 active categories</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-medium">Avg Order Value</span>
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><TrendingUp size={18} /></div>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">$67.20</h3>
             <span className="text-xs text-red-500 flex items-center mt-1">-2% vs last week</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6">Sales Performance</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SALES_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#64748b'}} />
                        <YAxis tickLine={false} axisLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}`} />
                        <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                        <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Orders */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Recent Orders</h3>
            <div className="space-y-4">
                {ORDERS.map((order) => (
                    <div key={order.id} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                                {order.customer.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{order.customer}</p>
                                <p className="text-xs text-slate-500 truncate w-32">{order.product}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-800">{order.amount}</p>
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">{order.status}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
                View All Orders
            </button>
         </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-slate-800">Product Inventory</h3>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
                </div>
                <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600">
                    <Filter size={18} />
                </button>
            </div>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3">Total Sales</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {PRODUCTS.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-slate-200 rounded flex-shrink-0"></div>
                                <span className="font-medium text-slate-800">{p.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{p.price}</td>
                        <td className="px-6 py-4 text-slate-600">{p.stock}</td>
                        <td className="px-6 py-4 text-slate-600">{p.sales}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                p.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                p.status === 'LOW_STOCK' ? 'bg-orange-100 text-orange-700' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {p.status.replace('_', ' ')}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                             <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal size={16} />
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

export default Ecommerce;