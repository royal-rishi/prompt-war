import { useState } from 'react';
import { ActivityLog, ActivityType } from '../types';
import { motion } from 'motion/react';
import { Plus, Bike, Utensils, Zap, ShoppingBag, Leaf, AlertCircle } from 'lucide-react';

interface Props {
  logs: ActivityLog[];
  onAddLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

const typeConfig: Record<ActivityType, { icon: any, color: string, label: string }> = {
  transport: { icon: Bike, color: 'text-blue-500 bg-blue-50', label: 'Transport' },
  meal: { icon: Utensils, color: 'text-orange-500 bg-orange-50', label: 'Meal' },
  energy: { icon: Zap, color: 'text-yellow-500 bg-yellow-50', label: 'Energy' },
  shopping: { icon: ShoppingBag, color: 'text-purple-500 bg-purple-50', label: 'Shopping' }
};

export function ActivityTracker({ logs, onAddLog }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ActivityType>('transport');
  const [newImpact, setNewImpact] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImpact) return;
    
    // basic parse
    const impactNum = parseFloat(newImpact);
    
    onAddLog({
      type: newType,
      title: newTitle,
      carbonSavedOrEmitted: impactNum,
    });
    
    setShowAdd(false);
    setNewTitle('');
    setNewImpact('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-slate-800">Impact Log</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition"
        >
          <Plus size={16} /> Add Log
        </button>
      </div>

      {showAdd && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 space-y-4"
          onSubmit={handleAdd}
        >
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Activity Type</label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(typeConfig) as ActivityType[]).map(type => {
                const Icon = typeConfig[type].icon;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewType(type)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border ${newType === type ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:bg-slate-50'}`}
                  >
                    <Icon size={20} className={newType === type ? 'text-emerald-600' : 'text-slate-400'} />
                    <span className={`text-[10px] mt-1 font-medium ${newType === type ? 'text-emerald-700' : 'text-slate-500'}`}>{typeConfig[type].label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Took the train to work" 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Carbon Impact (kg CO2)</label>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                step="0.1"
                required
                placeholder="-1.5 (Saved) or 2.0 (Emitted)" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                value={newImpact}
                onChange={e => setNewImpact(e.target.value)}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><AlertCircle size={10}/> Tip: Enter negative numbers for saved emissions.</p>
          </div>

          <div className="pt-2 flex gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition">Save Alert</button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {logs.map((log) => {
          const config = typeConfig[log.type];
          const Icon = config.icon;
          const isSaved = log.carbonSavedOrEmitted < 0;
          
          return (
            <motion.div 
              key={log.id} 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className={`p-3 rounded-2xl shrink-0 ${config.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 text-sm truncate pr-2">{log.title}</h3>
                  <div className={`font-bold text-sm whitespace-nowrap ${isSaved ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {isSaved ? '' : '+'}{log.carbonSavedOrEmitted} kg
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                
                {isSaved && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-medium border border-emerald-100">
                    <Leaf size={10} /> Eco-friendly choice
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        {logs.length === 0 && (
          <div className="py-10 text-center text-slate-500">
            <Leaf size={48} className="mx-auto text-slate-200 mb-3" />
            <p className="text-sm">No activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
