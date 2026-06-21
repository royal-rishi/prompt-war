import { useState } from 'react';
import { Leaf, Navigation, Target, Activity as ActivityIcon } from 'lucide-react';
import { DashboardOverview } from './components/DashboardOverview';
import { ActivityTracker } from './components/ActivityTracker';
import { ChallengesPanel } from './components/ChallengesPanel';
import { TransportInsights } from './components/TransportInsights';
import { mockUserStats, defaultChallenges, initialActivities, mockTransitOptions } from './data';
import { ActivityLog } from './types';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'dashboard' | 'tracker' | 'challenges' | 'transit';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState(mockUserStats);
  const [logs, setLogs] = useState<ActivityLog[]>(initialActivities);
  const [challenges, setChallenges] = useState(defaultChallenges);

  const handleAddLog = (newLog: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const log: ActivityLog = {
      ...newLog,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    
    setLogs(prev => [log, ...prev]);
    
    // Update stats simplistically
    if (log.carbonSavedOrEmitted < 0) {
       setStats(prev => ({
         ...prev,
         totalCarbonSaved: parseFloat((prev.totalCarbonSaved + Math.abs(log.carbonSavedOrEmitted)).toFixed(1)),
         totalPoints: prev.totalPoints + 15
       }));
    }
  };

  const handleCompleteChallenge = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id && !c.completed) {
        setStats(s => ({ ...s, totalPoints: s.totalPoints + c.points }));
        return { ...c, completed: true };
      }
      return c;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview stats={stats} recentLogs={logs} />;
      case 'tracker':
        return <ActivityTracker logs={logs} onAddLog={handleAddLog} />;
      case 'challenges':
        return <ChallengesPanel challenges={challenges} onComplete={handleCompleteChallenge} />;
      case 'transit':
        return <TransportInsights options={mockTransitOptions} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-slate-100 sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Leaf size={18} className="text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">EcoTrack</h1>
        </div>
        <div className="flex gap-3">
           <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level 12</span>
             <span className="text-sm font-bold text-emerald-600">{stats.totalPoints} pts</span>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:max-w-md lg:mx-auto w-full lg:mt-6 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
             {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 pb-safe z-20 flex justify-between items-center lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-96 lg:rounded-2xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {[
          { id: 'dashboard', icon: ActivityIcon, label: 'Stats' },
          { id: 'tracker', icon: Leaf, label: 'Log' },
          { id: 'challenges', icon: Target, label: 'Quests' },
          { id: 'transit', icon: Navigation, label: 'Transit' }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="flex flex-col items-center gap-1 min-w-[64px] relative"
            >
              {isActive && (
                <motion.div layoutId="nav-indicator" className="absolute -top-3 w-10 h-1 bg-emerald-500 rounded-b-md" />
              )}
              <Icon size={20} className={`transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  );
}
