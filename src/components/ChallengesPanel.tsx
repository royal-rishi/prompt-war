import { Challenge } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Zap, Train, Leaf, ShoppingBag, Award } from 'lucide-react';

interface Props {
  challenges: Challenge[];
  onComplete: (id: string) => void;
}

const iconMap: Record<string, any> = {
  Leaf, Train, Zap, ShoppingBag
};

export function ChallengesPanel({ challenges, onComplete }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-yellow-300" size={24} />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">Hero Mode</h2>
          </div>
          <p className="text-indigo-100 text-sm max-w-[80%]">Complete challenges to earn points and level up your ecosystem.</p>
        </div>
        {/* Background decorations */}
        <div className="absolute -right-6 -bottom-6 opacity-20">
          <Award size={120} />
        </div>
      </div>

      <div className="space-y-4 px-1">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bold text-slate-800">Daily Quests</h3>
          <span className="text-xs font-medium text-slate-500">{challenges.filter(c => c.completed).length}/{challenges.length} Done</span>
        </div>

        {challenges.map((challenge, i) => {
          const Icon = iconMap[challenge.icon] || Leaf;
          return (
            <motion.div 
              key={challenge.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden transition-all duration-300 ${challenge.completed ? 'bg-slate-50 border border-slate-200' : 'bg-white border border-indigo-100 shadow-sm'} p-4 rounded-2xl flex items-center gap-4`}
            >
              {/* Confetti or color stripe for completed */}
              {challenge.completed && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400" />
              )}
              
              <button 
                onClick={() => !challenge.completed && onComplete(challenge.id)}
                className={`shrink-0 transition-colors ${challenge.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-400'}`}
              >
                {challenge.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </button>
              
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm truncate ${challenge.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                    {challenge.title}
                  </h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-bold ${challenge.completed ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-700'}`}>
                    +{challenge.points}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${challenge.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                  {challenge.description}
                </p>
              </div>
              
              <div className={`shrink-0 p-2 rounded-xl ${challenge.completed ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-500'}`}>
                <Icon size={20} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
