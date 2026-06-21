export type ActivityType = 'transport' | 'meal' | 'energy' | 'shopping';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  title: string;
  carbonSavedOrEmitted: number; // positive = emitted, negative = saved
  timestamp: string;
  description?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: ActivityType | 'general';
  icon: string;
}

export interface TransitOption {
  id: string;
  mode: string;
  route: string;
  durationMins: number;
  carbonEmissionKg: number;
  costEstimate: string;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  weeklyCarbonTrend: number[]; // e.g. last 7 days emissions
  weeklyCarbonSavings: number[]; // e.g. last 7 days savings
  totalCarbonSaved: number;
}
