import { Challenge, TransitOption, ActivityLog, UserStats } from './types.ts';

export const mockUserStats: UserStats = {
  totalPoints: 1250,
  currentStreak: 5,
  weeklyCarbonTrend: [12.5, 11.2, 9.8, 14.1, 8.5, 9.0, 7.2],
  weeklyCarbonSavings: [1.2, 2.5, 1.0, 3.4, 2.1, 4.5, 3.2],
  totalCarbonSaved: 45.5,
};

export const defaultChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Meatless Monday',
    description: 'Skip meat for all meals today to save approximately 2kg of CO2 limit.',
    points: 50,
    completed: true,
    type: 'meal',
    icon: 'Leaf'
  },
  {
    id: '2',
    title: 'Transit Pioneer',
    description: 'Take public transit instead of driving to work.',
    points: 100,
    completed: false,
    type: 'transport',
    icon: 'Train'
  },
  {
    id: '3',
    title: 'Vampire Slayer',
    description: 'Unplug 3 distinct electronics when not in use.',
    points: 30,
    completed: false,
    type: 'energy',
    icon: 'Zap'
  },
  {
    id: '4',
    title: 'Local Shopper',
    description: 'Buy groceries from a local farmers market.',
    points: 60,
    completed: false,
    type: 'shopping',
    icon: 'ShoppingBag'
  }
];

export const mockTransitOptions: TransitOption[] = [
  {
    id: 'tr-1',
    mode: 'Electric Bus',
    route: 'Route 42 (Downtown Expr)',
    durationMins: 25,
    carbonEmissionKg: 0.2,
    costEstimate: '$2.50'
  },
  {
    id: 'tr-2',
    mode: 'Subway',
    route: 'Line B (Northbound)',
    durationMins: 18,
    carbonEmissionKg: 0.15,
    costEstimate: '$2.75'
  },
  {
    id: 'tr-3',
    mode: 'Standard Car (Solo)',
    route: 'Highway 101',
    durationMins: 15,
    carbonEmissionKg: 2.5,
    costEstimate: '$4.00 (Gas + Toll)'
  },
  {
    id: 'tr-4',
    mode: 'Bicycle',
    route: 'River Path',
    durationMins: 35,
    carbonEmissionKg: 0,
    costEstimate: 'Free'
  }
];

export const initialActivities: ActivityLog[] = [
  {
    id: 'a1',
    type: 'transport',
    title: 'Biked to grocery store',
    carbonSavedOrEmitted: -1.2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'a2',
    type: 'meal',
    title: 'Plant-based lunch',
    carbonSavedOrEmitted: -0.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'a3',
    type: 'energy',
    title: 'Left AC on while out',
    carbonSavedOrEmitted: 3.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  }
];
