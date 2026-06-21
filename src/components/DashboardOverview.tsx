import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { UserStats, ActivityLog } from '../types';
import { Leaf, Award, Flame, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  stats: UserStats;
  recentLogs: ActivityLog[];
}

export function DashboardOverview({ stats, recentLogs }: Props) {
  const chartData = stats.weeklyCarbonSavings.map((val, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    savings: val
  }));

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl"
        >
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Award size={18} />
            <span className="text-sm font-medium">Eco Points</span>
          </div>
          <div className="text-3xl font-bold text-emerald-900">{stats.totalPoints}</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-orange-50 border border-orange-100 p-4 rounded-2xl"
        >
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Flame size={18} />
            <span className="text-sm font-medium">Day Streak</span>
          </div>
          <div className="text-3xl font-bold text-orange-900">{stats.currentStreak}</div>
        </motion.div>
      </div>

      {/* Main Impact Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-600 to-emerald-800 p-6 rounded-2xl text-white shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-green-100 text-sm font-medium">Total Carbon Saved</h2>
            <div className="text-4xl font-bold mt-1 tracking-tight">{stats.totalCarbonSaved} <span className="text-2xl text-green-200">kg</span></div>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Leaf size={24} className="text-green-50" />
          </div>
        </div>
        <p className="text-sm text-green-50/80">Equivalent to planting ~2 trees this month!</p>
      </motion.div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Weekly Savings Summary</h3>
          <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full gap-1">
            <TrendingDown size={14} className="rotate-180" />
            <span>+12%</span>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value} kg`, 'Saved']}
              />
              <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Activity Mini */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 px-1">Recent Activity</h3>
        <div className="space-y-3">
          {recentLogs.slice(0, 2).map((log) => (
             <div key={log.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${log.carbonSavedOrEmitted < 0 ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
                    {log.carbonSavedOrEmitted < 0 ? <Leaf size={18} /> : <Flame size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{log.title}</p>
                    <p className="text-xs text-slate-500 capitalize">{log.type}</p>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${log.carbonSavedOrEmitted < 0 ? 'text-green-600' : 'text-rose-600'}`}>
                  {log.carbonSavedOrEmitted < 0 ? '' : '+'}{log.carbonSavedOrEmitted} kg
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
