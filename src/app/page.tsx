"use client";

import React, { useState, useRef } from 'react';
import { Flame, Snowflake, Plus, Play, ChevronRight, Scale, Trophy, X, Share, UtensilsCrossed, Heart, Bell, Lightbulb, Leaf, TrendingDown, Droplet, GlassWater, Salad, ClipboardList, Star, RefreshCw, Users, Gem, Medal, Target, Home, Dumbbell, User, Expand, Settings, Loader2, Pause, SkipForward } from 'lucide-react';

export default function FitnessDashboard() {
  const [mealLogged, setMealLogged] = useState(false);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [mindfulnessDone, setMindfulnessDone] = useState(false);
  const [hydrationLogged, setHydrationLogged] = useState(false);
  const [weightLogged, setWeightLogged] = useState(false);
  const [xp, setXp] = useState(0);
  const [challengeXp, setChallengeXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [showXpModal, setShowXpModal] = useState(false);
  const [workoutLoading, setWorkoutLoading] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<{ id: number; title: string; color: string; viewed: boolean } | null>(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(77.5);
  const [previousWeight, setPreviousWeight] = useState(78);
  const [editingWeight, setEditingWeight] = useState(77.5);
  const [weightUnit, setWeightUnit] = useState('kg');
  const mealScrolledRef = useRef(false);
  const [showAppleHealth, setShowAppleHealth] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [hydrationMl, setHydrationMl] = useState(0);
  const [hydration250Count, setHydration250Count] = useState(0);
  const [hydration1000Count, setHydration1000Count] = useState(0);
  const [hydrationHistory, setHydrationHistory] = useState<number[]>([]);
  const [hydrationCompleted, setHydrationCompleted] = useState(false);
  const [dietPlanMealAdded, setDietPlanMealAdded] = useState(false);
  const [hasDietPlan, setHasDietPlan] = useState(false);
  const [calcPage, setCalcPage] = useState(0);

  const handleLogMeal = () => {
    if (!mealLogged) {
      setMealLogged(true);
      setXp(prev => prev + 50);
    }
  };

  const handleWorkout = () => {
    if (!workoutDone) {
      setWorkoutDone(true);
      setXp(prev => prev + 50);
      setStreak(1);
    }
  };

  const handleMindfulness = () => {
    if (!mindfulnessDone) {
      setMindfulnessDone(true);
      setXp(prev => prev + 20);
    }
  };

  const handleHydration = () => {
    setHydrationLogged(true);
    setXp(prev => prev + 5);
  };

  const handleWeightLog = () => {
    if (!weightLogged) {
      setWeightLogged(true);
      setXp(prev => prev + 30);
    }
  };

  // System poziomów
  const levels = [
    { level: 1, name: 'Początkujący', minXp: 0, maxXp: 99, color: 'gray' },
    { level: 2, name: 'Aktywny', minXp: 100, maxXp: 299, color: 'green' },
    { level: 3, name: 'Zaawansowany', minXp: 300, maxXp: 599, color: 'blue' },
    { level: 4, name: 'Mistrz', minXp: 600, maxXp: 999, color: 'purple' },
    { level: 5, name: 'Legenda', minXp: 1000, maxXp: Infinity, color: 'yellow' },
  ];

  const getCurrentLevel = () => {
    return levels.find(l => xp >= l.minXp && xp <= l.maxXp) || levels[0];
  };

  const currentLevel = getCurrentLevel();
  const progressToNextLevel = currentLevel.maxXp === Infinity 
    ? 100 
    : ((xp - currentLevel.minXp) / (currentLevel.maxXp - currentLevel.minXp + 1)) * 100;

  const levelColors: Record<string, string> = {
    gray: 'stroke-gray-500',
    green: 'stroke-green-500',
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    yellow: 'stroke-yellow-500',
  };

  const completedDailyGoals = (mealLogged ? 1 : 0) + (workoutDone ? 1 : 0);
  const totalDailyGoals = 2;

  const days = [
    { day: 'pt.', date: '24.01', active: false },
    { day: 'sob.', date: '25.01', active: false },
    { day: 'niedz.', date: '26.01', active: false },
    { day: 'pon.', date: '27.01', active: true },
    { day: 'wt.', date: '28.01', active: false },
    { day: 'śr.', date: '29.01', active: false },
    { day: 'czw.', date: '30.01', active: false },
  ];

  const stories = [
    { id: 1, title: 'Jak schudnąć', color: 'bg-green-500', viewed: false },
    { id: 2, title: 'Kontroluj kalorie', color: 'bg-blue-500', viewed: false },
    { id: 3, title: 'Pierwszy trening', color: 'bg-orange-500', viewed: false },
    { id: 4, title: 'Odkryj więcej', color: 'bg-purple-500', viewed: false },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Phone Frame */}
      <div style={{
        width: '393px',
        height: '852px',
        background: '#1a1a1a',
        borderRadius: '55px',
        padding: '12px',
        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(0,0,0,0.3), inset 0 0 0 2px #2a2a2a',
        position: 'relative'
      }}>
        {/* Inner bezel */}
        <div style={{
          width: '100%',
          height: '100%',
          background: '#1a1a1a',
          borderRadius: '44px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '126px',
            height: '37px',
            background: '#000',
            borderRadius: '20px',
            zIndex: 20
          }} />

          {/* Screen */}
          <div className="bg-gray-950 text-white h-full flex flex-col">
            {/* Status Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 28px 8px',
              zIndex: 21
            }}>
              <span style={{ fontWeight: '600', fontSize: '15px' }}>09:41</span>
              <div style={{ width: '126px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                  <div style={{ width: '3px', height: '6px', background: '#fff', borderRadius: '1px' }} />
                  <div style={{ width: '3px', height: '9px', background: '#fff', borderRadius: '1px' }} />
                  <div style={{ width: '3px', height: '12px', background: '#fff', borderRadius: '1px' }} />
                  <div style={{ width: '3px', height: '15px', background: '#fff', borderRadius: '1px' }} />
                </div>
                <div style={{
                  width: '28px',
                  height: '14px',
                  border: '1.5px solid #fff',
                  borderRadius: '4px',
                  position: 'relative',
                  marginLeft: '2px'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '2px',
                    top: '2px',
                    bottom: '2px',
                    width: '18px',
                    background: '#34c759',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            </div>

            {/* Header - fixed */}
            <header className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Progress ring around avatar */}
            <svg className="w-10 h-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="#374151"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                className={levelColors[currentLevel.color]}
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 17}`}
                strokeDashoffset={`${2 * Math.PI * 17 * (1 - progressToNextLevel / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            {/* Avatar */}
            <div className="absolute inset-1 bg-green-500 rounded-full flex items-center justify-center font-bold text-sm text-black">
              R
            </div>
            {/* Level badge */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-gray-900 border-2 ${currentLevel.color === 'gray' ? 'border-gray-500 text-gray-400' : currentLevel.color === 'green' ? 'border-green-500 text-green-400' : currentLevel.color === 'blue' ? 'border-blue-500 text-blue-400' : currentLevel.color === 'purple' ? 'border-purple-500 text-purple-400' : 'border-yellow-500 text-yellow-400'}`}>
              {currentLevel.level}
            </div>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => setShowXpModal(true)}>
            {/* Main XP */}
            <div className="flex items-center gap-1.5 bg-gray-800 px-2.5 py-1.5 rounded-l-full">
              <Gem size={14} className="text-cyan-400" />
              <span className="text-xs font-medium">{xp} XP</span>
            </div>
            {/* Challenge XP */}
            <div className="flex items-center gap-1 bg-yellow-900/60 px-2.5 py-1.5 rounded-r-full">
              <Medal size={12} className="text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">{challengeXp} XP</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full">
          <div className="flex items-center gap-1">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-medium">{streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Snowflake size={16} className="text-blue-400" />
            <span className="text-sm font-medium">2</span>
          </div>
        </div>
      </header>

      {/* Timeline - fixed pod headerem */}
      <div className="px-4 py-2 border-b border-gray-800 shrink-0">
        <div className="flex items-center justify-between">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <div className="flex justify-between flex-1">
            {days.slice(1, 6).map((d, i) => (
              <div
                key={i}
                className={`flex flex-col items-center py-1.5 px-2 rounded-xl flex-1 ${
                  d.active ? 'bg-green-500/20 border border-green-500' : ''
                }`}
              >
                <span className="text-[10px] text-gray-400">{d.day}</span>
                <span className={`text-xs font-medium ${d.active ? 'text-green-500' : 'text-white'}`}>
                  {d.date}
                </span>
                {(mealLogged || workoutDone) && d.active && (
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-0.5" />
                )}
              </div>
            ))}
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Kalkulator kalorii */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Target size={18} className="text-green-500" /> {mealLogged ? 'Kalkulator kalorii' : 'Zaloguj pierwszy posiłek'}
            </h2>
            {!mealLogged ? (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +50 XP 🎁
              </span>
            ) : (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                ✓ +50 XP
              </span>
            )}
          </div>

          {/* Swipeable content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${calcPage * 100}%)` }}
            >
              {/* Page 1: Calories overview with inner macro ring */}
              <div className="w-full shrink-0">
                <div className="flex items-center justify-between">
                  {/* Stats */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-2">
                      <div>
                        <span className="text-[10px] text-gray-400">Do zjedzenia</span>
                        <p className="text-xl font-bold">{mealLogged ? '1250' : '1700'} <span className="text-xs font-normal text-gray-400">kcal</span></p>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400">Zjedzone</span>
                        <p className="text-xl font-bold">{mealLogged ? '450' : '0'} <span className="text-xs font-normal text-gray-400">kcal</span></p>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400">Spalone</span>
                      <p className="text-xl font-bold text-red-400">{workoutDone ? '120' : '0'} <span className="text-xs font-normal text-gray-400">kcal</span></p>
                    </div>
                  </div>

                  {/* Ring chart with inner macro segments */}
                  <div className="relative w-28 h-28 shrink-0 ml-2">
                    {/* Outer calorie ring */}
                    <svg className="w-28 h-28 -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="none" stroke="#1f2937" strokeWidth="8" />
                      <circle 
                        cx="56" cy="56" r="48" fill="none" 
                        stroke="#22c55e" strokeWidth="8" 
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - (mealLogged ? 0.26 : 0))}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Inner macro ring - 3 separate segments with gaps */}
                    <svg className="w-28 h-28 absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
                      {/* Background segments with gaps */}
                      <circle cx="56" cy="56" r="34" fill="none" stroke="#1f2937" strokeWidth="6" 
                        strokeDasharray={`${2 * Math.PI * 34 / 3 - 6} 6`}
                      />
                      
                      {/* Protein segment - Blue */}
                      <circle 
                        cx="56" cy="56" r="34" fill="none" 
                        stroke="#3b82f6" strokeWidth="6" 
                        strokeDasharray={`${(2 * Math.PI * 34 / 3 - 6) * (mealLogged ? 0.30 : 0)} ${2 * Math.PI * 34}`}
                        strokeLinecap="round"
                      />
                      
                      {/* Carbs segment - Purple */}
                      <circle 
                        cx="56" cy="56" r="34" fill="none" 
                        stroke="#a855f7" strokeWidth="6" 
                        strokeDasharray={`${(2 * Math.PI * 34 / 3 - 6) * (mealLogged ? 0.24 : 0)} ${2 * Math.PI * 34}`}
                        strokeDashoffset={`${-(2 * Math.PI * 34 / 3)}`}
                        strokeLinecap="round"
                      />
                      
                      {/* Fat segment - Yellow */}
                      <circle 
                        cx="56" cy="56" r="34" fill="none" 
                        stroke="#eab308" strokeWidth="6" 
                        strokeDasharray={`${(2 * Math.PI * 34 / 3 - 6) * (mealLogged ? 0.32 : 0)} ${2 * Math.PI * 34}`}
                        strokeDashoffset={`${-(2 * Math.PI * 34 * 2 / 3)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Page 2: Macros detail as progress bars */}
              <div className="w-full shrink-0 px-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-500">Twoje makra</span>
                  <button className="text-gray-400 hover:text-white">
                    <Settings size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Protein bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Białko</span>
                      <span className="text-xs font-medium">{mealLogged ? '32' : '0'} / 106g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: mealLogged ? '30%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Carbs bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Węglowodany</span>
                      <span className="text-xs font-medium">{mealLogged ? '45' : '0'} / 191g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all"
                        style={{ width: mealLogged ? '24%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Fat bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Tłuszcze</span>
                      <span className="text-xs font-medium">{mealLogged ? '18' : '0'} / 57g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: mealLogged ? '32%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-3">
            <button 
              onClick={() => setCalcPage(0)}
              className={`w-2 h-2 rounded-full transition-colors ${calcPage === 0 ? 'bg-green-500' : 'bg-gray-600'}`}
            />
            <button 
              onClick={() => setCalcPage(1)}
              className={`w-2 h-2 rounded-full transition-colors ${calcPage === 1 ? 'bg-green-500' : 'bg-gray-600'}`}
            />
          </div>

          <div className="mt-4">
            <button
              onClick={handleLogMeal}
              className="w-full py-2.5 rounded-xl font-medium text-sm flex items-center bg-green-500 text-black hover:bg-green-400 overflow-hidden"
            >
              <div className="flex-1 flex items-center justify-center gap-2">
                <Plus size={18} />
                {mealLogged ? 'Dodaj kolejny posiłek' : 'Dodaj do kalkulatora'}
              </div>
              <div className="w-px self-stretch bg-black/20" />
              <div className="px-3 flex items-center justify-center text-black/60">
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
        </div>

        {/* Trening */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Flame size={18} className="text-orange-500" /> {workoutDone ? 'Trening' : 'Zrób pierwszy trening'}
            </h2>
            {!workoutDone ? (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +50 XP 🎁
              </span>
            ) : (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                ✓ +50 XP
              </span>
            )}
          </div>

          {!workoutDone ? (
            <>
              <div className="bg-gray-800 rounded-xl overflow-hidden mb-3">
                <div className="h-32 bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center relative">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium">Quick Start: Full Body</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">15 min · Dla początkujących · ~120 kcal <Flame size={12} className="text-red-400" /></p>
                </div>
              </div>
              <button
                onClick={() => {
                  setWorkoutLoading(true);
                  setTimeout(() => {
                    setWorkoutLoading(false);
                    setShowWorkoutModal(true);
                  }, 2000);
                }}
                disabled={workoutLoading}
                className="w-full py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {workoutLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Pobieram trening...
                  </>
                ) : (
                  <>
                    Rozpocznij trening
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center text-[10px]">A</div>
                  <div className="w-5 h-5 rounded-full bg-pink-500 border-2 border-gray-900 flex items-center justify-center text-[10px]">M</div>
                  <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center text-[10px]">K</div>
                </div>
                <span className="text-xs text-gray-400">325 osób rozpoczęło dziś ten trening</span>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                  <span>✓</span>
                  <span>Quick Start: Full Body · 15 min</span>
                </div>
                <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white">
                  <Share size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">Spaliłeś ~120 kcal <Flame size={12} className="text-red-400" /></p>
              <button className="w-full py-2.5 rounded-xl font-medium text-sm bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center gap-2">
                Wybierz swój plan treningowy
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Stories */}
        <div>
          <h3 className="text-xs text-gray-400 mb-3">Dowiedz się więcej</h3>
          <div className="flex justify-between">
            {stories.map((story) => (
              <div 
                key={story.id} 
                className="flex flex-col items-center gap-1 flex-1 cursor-pointer"
                onClick={() => {
                  setSelectedStory(story);
                  setShowStoriesModal(true);
                }}
              >
                <div className={`w-16 h-16 rounded-full ${story.color} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full ${story.color} opacity-80`} />
                  </div>
                </div>
                <span className="text-xs text-gray-400 text-center">{story.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Twój Plan Diety */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Salad size={18} className="text-green-500" /> Twój plan diety
            </h2>
            {!hasDietPlan ? (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +50 XP 🎁
              </span>
            ) : (
              dietPlanMealAdded ? (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                  ✓ +30 XP
                </span>
              ) : (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                  +30 XP 🎁
                </span>
              )
            )}
          </div>
          
          {!hasDietPlan ? (
            <>
              <p className="text-xs text-gray-400 mb-3">Brak aktywnego planu</p>

              {/* Placeholder meals */}
              {(() => {
                const hour = new Date().getHours();
                const getCurrentMealId = () => {
                  if (hour >= 6 && hour < 10) return 1;
                  if (hour >= 10 && hour < 12) return 2;
                  if (hour >= 12 && hour < 16) return 3;
                  if (hour >= 16 && hour < 18) return 4;
                  return 5;
                };
                const currentMealId = getCurrentMealId();
                
                const meals = [
                  { id: 1, name: 'Śniadanie', emoji: '🍳' },
                  { id: 2, name: 'II Śniadanie', emoji: '🥜' },
                  { id: 3, name: 'Obiad', emoji: '🥗' },
                  { id: 4, name: 'Podwieczorek', emoji: '🍎' },
                  { id: 5, name: 'Kolacja', emoji: '🍲' },
                ];
                
                return (
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {meals.map((meal) => {
                      const isCurrent = meal.id === currentMealId;
                      return (
                        <div 
                          key={meal.id}
                          ref={(el) => {
                            if (el && isCurrent && !mealScrolledRef.current) {
                              setTimeout(() => {
                                el.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
                                mealScrolledRef.current = true;
                              }, 100);
                            }
                          }}
                          className={`flex-shrink-0 w-28 rounded-xl p-3 flex flex-col items-center ${
                            isCurrent 
                              ? 'bg-green-500/10 border-2 border-green-500' 
                              : 'bg-gray-800 opacity-60'
                          }`}
                        >
                          {isCurrent && (
                            <span className="text-[10px] text-green-400 font-medium mb-1">Teraz</span>
                          )}
                          <span className="text-2xl mb-1">{meal.emoji}</span>
                          <span className={`text-xs font-medium text-center ${isCurrent ? 'text-green-400' : ''}`}>{meal.name}</span>
                          <span className="text-xs text-gray-500">--- kcal</span>
                          <span className="text-[10px] text-gray-600 text-center mt-1">Brak planu</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              <button 
                onClick={() => {
                  setHasDietPlan(true);
                  setXp(prev => prev + 50);
                }}
                className="w-full mt-3 py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2"
              >
                Przygotuj plan diety
                <ChevronRight size={18} />
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">Dzisiaj: 1680 kcal w 5 posiłkach</p>

              {/* Scrollable meals */}
              {(() => {
                const hour = new Date().getHours();
                const getCurrentMealId = () => {
                  if (hour >= 6 && hour < 10) return 1;  // Śniadanie
                  if (hour >= 10 && hour < 12) return 2; // II Śniadanie
                  if (hour >= 12 && hour < 16) return 3; // Obiad
                  if (hour >= 16 && hour < 18) return 4; // Podwieczorek
                  return 5; // Kolacja
                };
                const currentMealId = getCurrentMealId();
                
                const meals = [
                  { id: 1, name: 'Śniadanie', emoji: '🍳', kcal: 420, dish: 'Jajecznica z awokado' },
                  { id: 2, name: 'II Śniadanie', emoji: '🥜', kcal: 150, dish: 'Orzechy i jogurt' },
                  { id: 3, name: 'Obiad', emoji: '🥗', kcal: 550, dish: 'Kurczak z ryżem' },
                  { id: 4, name: 'Podwieczorek', emoji: '🍎', kcal: 120, dish: 'Jabłko i masło orzech.' },
                  { id: 5, name: 'Kolacja', emoji: '🍲', kcal: 440, dish: 'Zupa krem z warzyw' },
                ];
                
                return (
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {meals.map((meal) => {
                      const isCurrent = meal.id === currentMealId;
                      return (
                        <div 
                          key={meal.id}
                          ref={(el) => {
                            if (el && isCurrent && !mealScrolledRef.current) {
                              setTimeout(() => {
                                el.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
                                mealScrolledRef.current = true;
                              }, 100);
                            }
                          }}
                          className={`flex-shrink-0 w-28 rounded-xl p-3 flex flex-col items-center ${
                            isCurrent 
                              ? 'bg-green-500/10 border-2 border-green-500' 
                              : 'bg-gray-800'
                          }`}
                        >
                          {isCurrent && (
                            <span className="text-[10px] text-green-400 font-medium mb-1">Teraz</span>
                          )}
                          <span className="text-2xl mb-1">{meal.emoji}</span>
                          <span className={`text-xs font-medium text-center ${isCurrent ? 'text-green-400' : ''}`}>{meal.name}</span>
                          <span className="text-xs text-gray-400">{meal.kcal} kcal</span>
                          <span className="text-[10px] text-gray-500 text-center mt-1 line-clamp-1">{meal.dish}</span>
                          <button 
                            onClick={() => {
                              if (!dietPlanMealAdded) {
                                setDietPlanMealAdded(true);
                                setXp(prev => prev + 30);
                              }
                              handleLogMeal();
                            }}
                            className={`mt-2 text-xs px-3 py-1 rounded-full ${
                              isCurrent 
                                ? 'bg-green-500 text-black hover:bg-green-400' 
                                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            }`}
                          >
                            + Dodaj
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-2 bg-gray-800 rounded-xl">
                  <ClipboardList size={16} />
                  Lista zakupów
                </button>
                <button className="flex-1 py-1.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-2 bg-gray-800 rounded-xl">
                  <RefreshCw size={16} />
                  Wymień dzień
                </button>
              </div>
            </>
          )}
        </div>

        {/* Twój postęp */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <TrendingDown size={18} className="text-green-500" />
              Twój postęp
            </h2>
            <button 
              onClick={() => {
                setEditingWeight(currentWeight);
                setShowWeightModal(true);
              }}
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              {(() => {
                const startWeight = 82;
                const goalWeight = 75;
                const weightLost = startWeight - currentWeight;
                const totalToLose = startWeight - goalWeight;
                const progressPercent = Math.max(0, Math.min(100, Math.round((weightLost / totalToLose) * 100)));
                const weightDiff = currentWeight - previousWeight;
                
                return (
                  <>
                    <p className="text-xl font-bold text-green-400">{currentWeight.toFixed(1).replace('.', ',')} <span className="text-sm font-normal text-gray-400">kg</span></p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      {weightDiff < 0 ? '↘' : weightDiff > 0 ? '↗' : '→'} 
                      {Math.abs(weightDiff).toFixed(1).replace('.', ',')} kg · {progressPercent}% celu
                    </p>
                  </>
                );
              })()}
            </div>
            {/* Trend chart */}
            <div className="w-28 h-14">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {(() => {
                  const weightDiff = currentWeight - previousWeight;
                  // Waga spadła = linia idzie w dół (sukces)
                  // Waga wzrosła = linia idzie w górę (regres)
                  const startY = weightDiff > 0 ? 35 : weightDiff < 0 ? 15 : 25;
                  const endY = weightDiff > 0 ? 15 : weightDiff < 0 ? 35 : 25;
                  
                  return (
                    <>
                      {/* Line showing trend */}
                      <line 
                        x1="10" 
                        y1={startY}
                        x2="90" 
                        y2={endY}
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      {/* Start point (previous weight) */}
                      <circle 
                        cx="10" 
                        cy={startY}
                        r="4" 
                        fill="#22c55e" 
                        opacity="0.5" 
                      />
                      {/* End point (current weight) */}
                      <circle 
                        cx="90" 
                        cy={endY}
                        r="5" 
                        fill="#22c55e" 
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-2">Cel: 82 kg → 75 kg</p>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${Math.max(0, Math.min(100, ((82 - currentWeight) / (82 - 75)) * 100))}%`,
                background: 'linear-gradient(90deg, #1f2937 0%, #22c55e 100%)'
              }} 
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-gray-800/50 rounded-lg p-2.5">
            <Lightbulb size={14} className="text-yellow-500 shrink-0" />
            <span>Waż się o tej samej porze dla najlepszych rezultatów</span>
          </div>
        </div>

        {/* Nawodnienie */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Droplet size={18} className="text-blue-500" /> Nawodnienie
            </h2>
            {hydrationCompleted ? (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                ✓ +50 XP
              </span>
            ) : (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +50 XP 🎁
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {/* Ring */}
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#1e3a5f" strokeWidth="8" />
                <circle 
                  cx="48" cy="48" r="40" fill="none" 
                  stroke="#3b82f6" strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - hydrationMl / 2850)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{hydrationMl} ml</span>
                <span className="text-[10px] text-gray-500">z 2850 ml</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {hydrationHistory.length > 0 && (
                <button 
                  onClick={() => { 
                    const lastValue = hydrationHistory[hydrationHistory.length - 1];
                    setHydrationMl(prev => prev - lastValue);
                    setHydrationHistory(prev => prev.slice(0, -1));
                    if (lastValue === 250) setHydration250Count(prev => prev - 1);
                    if (lastValue === 1000) setHydration1000Count(prev => prev - 1);
                    if (hydrationMl - lastValue < 2850) setHydrationCompleted(false);
                  }}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center"
                >
                  <X size={16} className="text-red-500" />
                </button>
              )}
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { 
                    const newMl = hydrationMl + 250;
                    setHydrationMl(newMl); 
                    setHydration250Count(prev => prev + 1);
                    setHydrationHistory(prev => [...prev, 250]);
                    setXp(prev => prev + 5);
                    if (newMl >= 2850 && !hydrationCompleted) {
                      setHydrationCompleted(true);
                      setXp(prev => prev + 50);
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-medium w-32 text-sm"
                >
                  <GlassWater size={16} />
                  250 ml
                </button>
                
                <button 
                  onClick={() => { 
                    const newMl = hydrationMl + 1000;
                    setHydrationMl(newMl); 
                    setHydration1000Count(prev => prev + 1);
                    setHydrationHistory(prev => [...prev, 1000]);
                    setXp(prev => prev + 5);
                    if (newMl >= 2850 && !hydrationCompleted) {
                      setHydrationCompleted(true);
                      setXp(prev => prev + 50);
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-medium w-32 text-sm"
                >
                  <Droplet size={18} />
                  1000 ml
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-gray-800/50 rounded-lg p-2.5 mt-4">
            <Bell size={14} className="text-blue-400 shrink-0" />
            <span>Włącz przypomnienia, aby zadbać o prawidłowe nawodnienie</span>
          </div>
        </div>

        {/* Notifications */}
        {showNotifications && (
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold flex items-center gap-2 text-sm">
                <Bell size={18} className="text-yellow-500" /> Włącz powiadomienia
              </h2>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +50 XP 🎁
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Przypomnimy Ci o posiłkach i treningach</p>
            <button className="w-full py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2">
              Włącz
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Apple Health Connection */}
        {showAppleHealth && (
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold flex items-center gap-2 text-sm">
                <Heart size={18} className="text-red-500 shrink-0" /> Połącz z Apple Health
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium whitespace-nowrap">
                  +100 XP 🎁
                </span>
                <button 
                  onClick={() => setShowAppleHealth(false)}
                  className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">Synchronizuj aktywność i pomiary automatycznie</p>
            <button className="w-full py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2">
              Połącz
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Balans / Mindfulness */}
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold flex items-center gap-2 text-sm">
              <Leaf size={18} className="text-green-500" /> {mindfulnessDone ? 'Balans' : 'Posłuchaj pierwszej sesji'}
            </h2>
            {!mindfulnessDone ? (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                +20 XP 🎁
              </span>
            ) : (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                ✓ +20 XP
              </span>
            )}
          </div>

          {!mindfulnessDone ? (
            <>
              <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌅</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Kurs: Oddech</h3>
                  <p className="text-xs text-gray-400">Wprowadzenie · 2:45</p>
                </div>
              </div>
              <button
                onClick={handleMindfulness}
                className="w-full py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2"
              >
                <Play size={18} fill="black" />
                Słuchaj
              </button>
              <button className="w-full py-1.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 mt-2">
                lub wybierz inny
                <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span>Kurs: Oddech · Wprowadzenie</span>
              </div>
              <p className="text-xs text-gray-400">Następna sesja: 1.1 - Pierwszy oddech · 6:58</p>
              <button className="w-full py-2.5 rounded-xl font-medium text-sm bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center gap-2">
                <Play size={18} />
                Kontynuuj kurs
              </button>
            </div>
          )}
        </div>

        {/* Podziel się z przyjacielem */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-red-800 to-red-700 relative">
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-bold pr-2">Podaruj znajomemu darmowy 7-dniowy dostęp do apki</h3>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium whitespace-nowrap shrink-0">
                +200 XP 🎁
              </span>
            </div>
            <button className="mt-2 bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 text-sm">
              Zaproś
            </button>
          </div>
          {/* Dekoracyjne elementy */}
          <div className="absolute right-4 bottom-4">
            <Users size={48} className="text-white/30" />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowActions(true)}
        className="absolute bottom-24 right-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-400 transition-all z-40"
      >
        <Plus size={24} className="text-black" />
        {completedDailyGoals < totalDailyGoals && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full text-xs font-bold flex items-center justify-center text-black border-2 border-gray-950">
            {totalDailyGoals - completedDailyGoals}
          </div>
        )}
      </button>

      {/* Bottom Sheet Overlay */}
      {showActions && (
        <div 
          className="absolute inset-0 bg-black/60 z-50"
          onClick={() => setShowActions(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl z-50 transition-transform duration-300 max-h-[70%] overflow-y-auto ${showActions ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4">
          {/* Handle */}
          <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-4" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Akcje</h2>
            <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
              <Trophy size={14} />
              <span className="text-sm font-medium">Do zdobycia: {(!mealLogged ? 50 : 5) + (!workoutDone ? 50 : 20) + (!mindfulnessDone ? 20 : 10) + 5 + (!weightLogged ? 30 : 0)} XP</span>
            </div>
          </div>

          {/* Dzisiejsze cele */}
          <div className="mb-4">
            <h3 className="text-xs text-gray-400 mb-2 flex items-center gap-2">
              <span>⭐</span> Dzisiejsze cele
              <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">{completedDailyGoals}/{totalDailyGoals}</span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => { handleLogMeal(); }}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {mealLogged ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">✓</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 text-xs">★</span>
                    </div>
                  )}
                  <span className="font-medium flex items-center gap-2"><UtensilsCrossed size={16} className="text-green-500" /> Zaloguj posiłek</span>
                </div>
                {mealLogged ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+5 XP</span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+50 XP 🎁</span>
                )}
              </button>

              <button
                onClick={() => { handleWorkout(); }}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {workoutDone ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">✓</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 text-xs">★</span>
                    </div>
                  )}
                  <span className="font-medium flex items-center gap-2"><Flame size={16} className="text-orange-500" /> Zrób trening</span>
                </div>
                {workoutDone ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">+20 XP</span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+50 XP 🎁</span>
                )}
              </button>
            </div>
          </div>

          {/* Więcej akcji */}
          <div>
            <h3 className="text-xs text-gray-400 mb-2">Więcej akcji</h3>
            <div className="space-y-2">
              <button
                onClick={handleHydration}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium">💧 Dodaj nawodnienie</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">+5 XP</span>
              </button>

              <button
                onClick={handleWeightLog}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium">⚖️ Dodaj pomiar wagi</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">+30 XP</span>
              </button>

              <button
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium">⚡ Dodaj aktywność</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">+15 XP</span>
              </button>

              <button
                onClick={() => { handleMindfulness(); }}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium flex items-center gap-2"><Leaf size={16} className="text-green-500" /> Posłuchaj mindfulness</span>
                {mindfulnessDone ? (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">+10 XP</span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">+20 XP 🎁</span>
                )}
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-8" />
        </div>
      </div>

      {/* Bottom Navigation - fixed */}
      <nav className="bg-gray-900 border-t border-gray-800 shrink-0">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center gap-1 text-green-500">
            <Home size={22} />
            <span className="text-[10px]">Plan</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Dumbbell size={22} />
            <span className="text-[10px]">Treningi</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <UtensilsCrossed size={22} />
            <span className="text-[10px]">Posiłki</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Leaf size={22} />
            <span className="text-[10px]">Balans</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <User size={22} />
            <span className="text-[10px]">Profil</span>
          </button>
        </div>
      </nav>

      {/* XP History Modal */}
      {showXpModal && (
        <>
          <div 
            className="absolute inset-0 bg-black/60 z-50"
            onClick={() => setShowXpModal(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl z-50 flex flex-col" style={{ height: '92%' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <button 
                onClick={() => setShowXpModal(false)}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
              <h2 className="text-sm font-semibold">Historia XP</h2>
              <div className="w-8" />
            </div>

            {/* Summary */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Gem size={16} className="text-cyan-400" />
                    <span className="text-lg font-bold">{xp}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Łącznie XP</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Medal size={16} className="text-yellow-400" />
                    <span className="text-lg font-bold text-yellow-400">{challengeXp}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">XP Wyzwań</span>
                </div>
              </div>
            </div>

            {/* History list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="text-[10px] text-gray-500 uppercase mb-2">Dzisiaj</p>
              
              {mealLogged && (
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Target size={16} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Zalogowano posiłek</p>
                      <p className="text-[10px] text-gray-500">Pierwszy posiłek dnia</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">+50 XP</span>
                </div>
              )}

              {workoutDone && (
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Flame size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Ukończono trening</p>
                      <p className="text-[10px] text-gray-500">Quick Start: Full Body</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">+50 XP</span>
                </div>
              )}

              {mindfulnessDone && (
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Leaf size={16} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Sesja mindfulness</p>
                      <p className="text-[10px] text-gray-500">Kurs: Oddech</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">+20 XP</span>
                </div>
              )}

              {hydrationMl > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Droplet size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Nawodnienie</p>
                      <p className="text-[10px] text-gray-500">{hydrationMl} ml dodane</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">+{(hydration250Count + hydration1000Count) * 5} XP</span>
                </div>
              )}

              {!mealLogged && !workoutDone && !mindfulnessDone && hydrationMl === 0 && (
                <div className="text-center py-8">
                  <Gem size={32} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Brak aktywności</p>
                  <p className="text-[10px] text-gray-600">Zacznij zdobywać XP!</p>
                </div>
              )}

              <p className="text-[10px] text-gray-500 uppercase mb-2 mt-4">Wczoraj</p>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-xl opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Flame size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Ukończono trening</p>
                    <p className="text-[10px] text-gray-500">Cardio Burn</p>
                  </div>
                </div>
                <span className="text-xs text-green-400 font-medium">+20 XP</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Weight Modal */}
      {showWeightModal && (
        <>
          <div 
            className="absolute inset-0 bg-black/60 z-50"
            onClick={() => setShowWeightModal(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl z-50 flex flex-col" style={{ height: '50%' }}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-700 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
              <button 
                onClick={() => setShowWeightModal(false)}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
              <h2 className="text-sm font-semibold">Dodaj aktualną masę ciała</h2>
              <div className="w-8" />
            </div>

            {/* Weight display */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <span className="text-5xl font-bold">{editingWeight.toFixed(1).replace('.', ',')}</span>
                <span className="text-2xl text-gray-400 ml-2">kg</span>
              </div>

              {/* Scale dial */}
              <div className="relative w-full h-24 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Center line indicator */}
                  <div className="absolute w-0.5 h-16 bg-green-500 z-10" />
                  
                  {/* Scale marks */}
                  <div 
                    className="flex items-end transition-transform duration-100"
                    style={{ transform: `translateX(${(85 - editingWeight) * 32}px)` }}
                  >
                    {Array.from({ length: 141 }, (_, i) => {
                      const weight = 50 + i * 0.5;
                      const isMajor = weight % 5 === 0;
                      const isWhole = weight % 1 === 0 && !isMajor;
                      return (
                        <div 
                          key={i} 
                          className="flex flex-col items-center"
                          style={{ width: '16px' }}
                        >
                          <div 
                            className={`rounded-full ${
                              isMajor ? 'w-0.5 h-10 bg-white' : isWhole ? 'w-0.5 h-6 bg-gray-400' : 'w-0.5 h-3 bg-gray-600'
                            }`}
                          />
                          {isMajor && (
                            <span className="text-[10px] text-gray-400 mt-1">{weight}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Touch slider */}
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="0.5"
                  value={editingWeight}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    const snapped = Math.round(value * 2) / 2;
                    setEditingWeight(snapped);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-grab"
                />
              </div>
            </div>

            {/* Bottom action */}
            <div className="p-4">
              <button 
                onClick={() => {
                  setPreviousWeight(currentWeight);
                  setCurrentWeight(editingWeight);
                  setShowWeightModal(false);
                  setXp(prev => prev + 30);
                }}
                className="w-full py-3 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400"
              >
                Zapisz pomiar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Stories Modal */}
      {showStoriesModal && selectedStory && (
        <>
          <div 
            className="absolute inset-0 bg-black/60 z-50"
            onClick={() => setShowStoriesModal(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl z-50 flex flex-col" style={{ height: '92%' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <button 
                onClick={() => setShowStoriesModal(false)}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
              <h2 className="text-sm font-semibold">{selectedStory.title}</h2>
              <div className="w-8" />
            </div>

            {/* Story content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Hero image */}
              <div className={`h-40 ${selectedStory.color} rounded-2xl flex items-center justify-center mb-4`}>
                <span className="text-6xl">
                  {selectedStory.id === 1 ? '🥗' : selectedStory.id === 2 ? '💪' : selectedStory.id === 3 ? '😴' : '🧘'}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">{selectedStory.title}</h3>
                
                <p className="text-sm text-gray-400">
                  {selectedStory.id === 1 && 'Odkryj jak zbalansowana dieta wpływa na Twoje samopoczucie i wyniki treningowe. Dowiedz się więcej o makroskładnikach i ich roli w budowaniu zdrowych nawyków.'}
                  {selectedStory.id === 2 && 'Poznaj najlepsze ćwiczenia dla początkujących. Nasz przewodnik pomoże Ci bezpiecznie rozpocząć przygodę z treningami siłowymi.'}
                  {selectedStory.id === 3 && 'Sen to podstawa regeneracji. Sprawdź jak jakość snu wpływa na Twoje postępy i co możesz zrobić, aby lepiej odpoczywać.'}
                  {selectedStory.id === 4 && 'Mindfulness i medytacja mogą znacząco poprawić Twoje wyniki. Poznaj techniki, które pomogą Ci zachować równowagę.'}
                </p>

                <div className="space-y-3 pt-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="text-sm font-medium mb-2">Kluczowe punkty</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Regularność jest ważniejsza niż intensywność
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Małe kroki prowadzą do wielkich zmian
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Słuchaj swojego ciała
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div className="p-4 border-t border-gray-800">
              <button 
                onClick={() => setShowStoriesModal(false)}
                className="w-full py-3 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400"
              >
                Rozumiem
              </button>
            </div>
          </div>
        </>
      )}

      {/* Workout Modal */}
      {showWorkoutModal && (
        <>
          <div 
            className="absolute inset-0 bg-black/60 z-50"
            onClick={() => setShowWorkoutModal(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl z-50 flex flex-col" style={{ height: '92%' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <button 
                onClick={() => setShowWorkoutModal(false)}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
              <h2 className="text-sm font-semibold">Quick Start: Full Body</h2>
              <div className="w-8" />
            </div>

            {/* Exercise video placeholder */}
            <div className="h-48 bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Pause size={32} className="text-white" fill="white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between text-xs text-white mb-1">
                  <span>0:45</span>
                  <span>3:00</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>

            {/* Current exercise */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Ćwiczenie 1/8</p>
                  <h3 className="text-lg font-bold">Przysiady</h3>
                  <p className="text-xs text-gray-400">12 powtórzeń</p>
                </div>
                <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white">
                  <SkipForward size={24} />
                </button>
              </div>
            </div>

            {/* Exercise list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="text-[10px] text-gray-500 uppercase mb-2">Lista ćwiczeń</p>
              
              {[
                { name: 'Przysiady', reps: '12 powtórzeń', active: true },
                { name: 'Pompki', reps: '10 powtórzeń', active: false },
                { name: 'Wykroki', reps: '10 na nogę', active: false },
                { name: 'Plank', reps: '30 sekund', active: false },
                { name: 'Brzuszki', reps: '15 powtórzeń', active: false },
                { name: 'Burpees', reps: '8 powtórzeń', active: false },
                { name: 'Mountain climbers', reps: '20 powtórzeń', active: false },
                { name: 'Rozciąganie', reps: '2 minuty', active: false },
              ].map((exercise, i) => (
                <div 
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl ${exercise.active ? 'bg-green-500/20 border border-green-500' : 'bg-gray-800'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${exercise.active ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-400'}`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${exercise.active ? 'text-green-400' : ''}`}>{exercise.name}</p>
                      <p className="text-[10px] text-gray-500">{exercise.reps}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom action */}
            <div className="p-4 border-t border-gray-800">
              <button 
                onClick={() => {
                  setShowWorkoutModal(false);
                  handleWorkout();
                }}
                className="w-full py-3 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 flex items-center justify-center gap-2"
              >
                Zakończ trening
              </button>
            </div>
          </div>
        </>
      )}

            {/* Home Indicator */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0 4px',
              background: '#030712'
            }}>
              <div style={{
                width: '134px',
                height: '5px',
                background: '#fff',
                borderRadius: '100px',
                opacity: 0.3
              }} />
            </div>
          </div>
        </div>

        {/* Physical Buttons */}
        <div style={{
          position: 'absolute',
          left: '-3px',
          top: '120px',
          width: '3px',
          height: '32px',
          background: '#3a3a3a',
          borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute',
          left: '-3px',
          top: '170px',
          width: '3px',
          height: '64px',
          background: '#3a3a3a',
          borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute',
          left: '-3px',
          top: '250px',
          width: '3px',
          height: '64px',
          background: '#3a3a3a',
          borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute',
          right: '-3px',
          top: '190px',
          width: '3px',
          height: '80px',
          background: '#3a3a3a',
          borderRadius: '0 2px 2px 0'
        }} />
      </div>
    </div>
  );
}
