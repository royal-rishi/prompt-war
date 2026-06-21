import { TransitOption } from '../types';
import { MapPin, ArrowRight, Activity, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  options: TransitOption[];
}

export function TransportInsights({ options }: Props) {
  // Sort primarily by carbon emission (lowest to highest) to emphasize the greenest option.
  const sortedOptions = [...options].sort((a, b) => a.carbonEmissionKg - b.carbonEmissionKg);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={18} className="text-emerald-400" />
          <h2 className="font-semibold text-sm">Local Transit Integrations</h2>
        </div>
        
        <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <div className="text-xs">
            <p className="text-slate-400">From</p>
            <p className="font-medium mt-0.5">Downtown Commons</p>
          </div>
          <ArrowRight size={16} className="text-slate-500" />
          <div className="text-xs text-right">
            <p className="text-slate-400">To</p>
            <p className="font-medium mt-0.5">Tech Park</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-1">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Activity size={16} className="text-blue-500" /> Comparing Routes
        </h3>
        
        {sortedOptions.map((opt, i) => {
          const isGreenest = i === 0;
          return (
            <motion.div 
              key={opt.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden bg-white p-4 rounded-2xl border ${isGreenest ? 'border-emerald-300 shadow-sm' : 'border-slate-100'} flex items-center gap-4`}
            >
              {isGreenest && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
                  GREENEST
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-800">{opt.mode}</h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{opt.route}</p>
                <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                  <span className="text-slate-600">{opt.durationMins} min</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600">{opt.costEstimate}</span>
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <div className={`text-lg font-bold ${opt.carbonEmissionKg === 0 ? 'text-emerald-600' : (opt.carbonEmissionKg > 1 ? 'text-rose-500' : 'text-orange-500')}`}>
                  {opt.carbonEmissionKg} <span className="text-xs font-normal">kg</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">CO2 IMPACT</div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
        <Leaf className="text-emerald-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-emerald-800 font-medium leading-relaxed">
          Switching from driving solo to the <span className="font-bold">Electric Bus</span> for this daily commute can save you over <span className="font-bold">50kg</span> of CO2 per month!
        </p>
      </div>
    </div>
  );
}
