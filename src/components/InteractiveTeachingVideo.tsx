import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Sparkles, Video, Layers, UserCheck, Play, Pause } from 'lucide-react';
import { KenteWatermark } from './KentePattern';

interface InteractiveTeachingVideoProps {
  onJoinLiveClass?: () => void;
}

export const InteractiveTeachingVideo: React.FC<InteractiveTeachingVideoProps> = ({ onJoinLiveClass }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTopic, setActiveTopic] = useState<'GES' | 'CAMBRIDGE' | 'MONTESSORI'>('GES');
  const [showHUD, setShowHUD] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth 3D tilt on mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for perspective tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll wheel zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.15, 2.2));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.15, 0.95));
    }
  };

  const topicVideos = {
    GES: {
      title: 'GES SHS WASSCE Core & Elective Math Classroom',
      tutor: 'Dr. Abena Osei-Mensah (NaCCA Certified)',
      subject: 'Calculus: Derivatives & Curves',
      hudFormula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
      curriculumBadge: 'GES WASSCE Standard',
      tutorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    CAMBRIDGE: {
      title: 'Cambridge IGCSE & A-Level Physics & Chemistry Lab',
      tutor: 'Sarah Jenkins-Agyeman (CIE Master)',
      subject: 'Thermodynamics & Atomic Structure',
      hudFormula: 'E = h\\nu = h\\frac{c}{\\lambda}',
      curriculumBadge: 'Cambridge CIE Standard',
      tutorImg: 'https://images.unsplash.com/photo-1580894732413-a7051a9ad1c1?auto=format&fit=crop&q=80&w=400'
    },
    MONTESSORI: {
      title: 'AMI Montessori Sensory Math & Phonics Mastery',
      tutor: 'Kwame Mensah-Bonsu (AMI Diploma)',
      subject: 'Concrete Fractions & Spatial Reasoning',
      hudFormula: 'Visual Concrete Bead Operations (3-12 yrs)',
      curriculumBadge: 'AMI Montessori Standard',
      tutorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    }
  };

  const currentTopicData = topicVideos[activeTopic];

  return (
    <div className="relative my-6 rounded-3xl overflow-hidden border border-stone-200 shadow-xs bg-white text-slate-900">
      {/* Top Banner Control Header */}
      <div className="bg-stone-50 px-6 py-3.5 border-b border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 z-20 relative">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
            <Video className="w-5 h-5 animate-pulse text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900">
                Interactive Virtual Whiteboard Canvas
              </span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                3D Mouse Tilt & Scroll Zoom
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Hover & move mouse to tilt 3D perspective • Scroll mouse wheel to zoom in/out
            </p>
          </div>
        </div>

        {/* Curriculum Topic Selector */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-300">
          {(['GES', 'CAMBRIDGE', 'MONTESSORI'] as const).map(curr => (
            <button
              key={curr}
              onClick={() => setActiveTopic(curr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTopic === curr
                  ? 'bg-amber-700 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>

      </div>

      {/* Interactive 3D Canvas Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        className="relative h-[380px] md:h-[440px] w-full overflow-hidden cursor-crosshair flex items-center justify-center select-none bg-stone-50"
        style={{ perspective: 1200 }}
      >
        <KenteWatermark opacity={0.03} />

        <motion.div
          style={{
            rotateX,
            rotateY,
            translateZ,
            scale: zoomLevel,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full h-full flex items-center justify-center p-6"
        >
          {/* Animated Background Grid Canvas Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

          {/* HUD Overlay layer (floats in 3D perspective) */}
          {showHUD && (
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none z-10">
              
              {/* Top HUD Stats */}
              <div className="flex justify-between items-start gap-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/95 backdrop-blur-md border border-stone-200 p-3.5 rounded-2xl space-y-1 max-w-xs shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                    <span className="text-xs font-black text-amber-800">
                      {currentTopicData.curriculumBadge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{currentTopicData.title}</h4>
                  <div className="flex items-center gap-2 pt-1">
                    <img
                      src={currentTopicData.tutorImg}
                      alt={currentTopicData.tutor}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-500/80"
                    />
                    <p className="text-[11px] text-slate-600 font-medium">{currentTopicData.tutor}</p>
                  </div>
                </motion.div>

                {/* Live Zoom HUD Badge */}
                <div className="bg-white/95 backdrop-blur-md border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-emerald-800 flex items-center gap-2 shadow-2xs">
                  <ZoomIn className="w-4 h-4 text-emerald-700" />
                  <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
                </div>
              </div>

              {/* Center Formula Overlay (Simulating Whiteboard) */}
              <div className="self-center bg-white/95 backdrop-blur-xl border border-stone-200 p-5 md:p-6 rounded-3xl max-w-lg w-full text-center space-y-3 shadow-xs">
                <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Interactive Whiteboard Render
                </div>
                <div className="text-lg md:text-xl font-mono font-extrabold text-amber-900 tracking-wide bg-stone-50 py-3 px-4 rounded-xl border border-stone-200 shadow-2xs">
                  {currentTopicData.hudFormula}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Active Subject: <strong className="text-slate-900">{currentTopicData.subject}</strong>
                </p>
              </div>

              {/* Bottom HUD Bar */}
              <div className="flex justify-between items-end">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium text-slate-700 flex items-center gap-2 shadow-2xs">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <span>24 Students Connected Live</span>
                </div>

                {onJoinLiveClass && (
                  <button
                    onClick={onJoinLiveClass}
                    className="pointer-events-auto bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 text-xs"
                  >
                    <Video className="w-4 h-4 text-amber-300" />
                    <span>Enter Live Classroom</span>
                  </button>
                )}
              </div>

            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Interactive Toolbar */}
      <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 z-20 relative">
        
        {/* HUD Toggle & Simulation Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-amber-800 transition"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowHUD(!showHUD)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              showHUD ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-white border border-stone-200 text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>HUD {showHUD ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Zoom canvas:</span>
          
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.2))}
            className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-emerald-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.95))}
            className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(1)}
            className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-amber-800 transition"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
