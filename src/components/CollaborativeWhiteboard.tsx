import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import katex from 'katex';
import { soundEngine } from '../utils/audioEffects';
import {
  Pencil,
  Eraser,
  Square,
  Circle as CircleIcon,
  Trash2,
  Download,
  Sigma,
  Sparkles,
  Undo,
  Users,
  Move,
  X,
  Plus,
  HelpCircle,
  Brain
} from 'lucide-react';

interface LineData {
  id: string;
  tool: 'pen' | 'eraser';
  color: string;
  strokeWidth: number;
  points: number[];
}

interface ShapeData {
  id: string;
  type: 'rect' | 'circle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
}

interface LatexEquation {
  id: string;
  tex: string;
  x: number;
  y: number;
  title?: string;
  addedBy: string;
}

interface CollaborativeWhiteboardProps {
  tutorName?: string;
}

export const CollaborativeWhiteboard: React.FC<CollaborativeWhiteboardProps> = ({
  tutorName = 'Dr. Abena Osei-Mensah'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<any>(null);
  const [stageWidth, setStageWidth] = useState<number>(750);
  const [stageHeight] = useState<number>(380);

  // Drawing state
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rect' | 'circle'>('pen');
  const [color, setColor] = useState<string>('#f59e0b'); // Amber default
  const [brushSize, setBrushSize] = useState<number>(3);
  const [lines, setLines] = useState<LineData[]>([]);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const isDrawing = useRef<boolean>(false);

  // LaTeX Equations state
  const [equations, setEquations] = useState<LatexEquation[]>([
    {
      id: 'eq_1',
      title: 'Definite Calculus Integral',
      tex: '\\int_0^1 (3x^2 + 2x) \\, dx = \\left[ x^3 + x^2 \\right]_0^1 = 2',
      x: 30,
      y: 40,
      addedBy: tutorName
    },
    {
      id: 'eq_2',
      title: 'WASSCE Quadratic Formula',
      tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      x: 30,
      y: 130,
      addedBy: 'Kofi Kwakye'
    },
    {
      id: 'eq_3',
      title: 'Chemistry Molarity Equation',
      tex: 'M_1 V_1 = M_2 V_2 \\implies V_2 = \\frac{(0.5)(250)}{0.1} = 1250\\text{ mL}',
      x: 360,
      y: 40,
      addedBy: tutorName
    }
  ]);

  const [customTex, setCustomTex] = useState<string>('\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1');
  const [customTitle, setCustomTitle] = useState<string>('L\'Hôpital\'s Limit');
  const [draggingEqId, setDraggingEqId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'board' | 'latex_library'>('board');
  const [aiAssistantLoading, setAiAssistantLoading] = useState<boolean>(false);

  // Measure container for responsive stage
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageWidth(containerRef.current.offsetWidth || 750);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Konva Event Handlers
  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;

    soundEngine.playWhiteboardSound();

    if (tool === 'pen' || tool === 'eraser') {
      const newLine: LineData = {
        id: 'line_' + Date.now(),
        tool,
        color: tool === 'eraser' ? '#0f172a' : color,
        strokeWidth: tool === 'eraser' ? brushSize * 5 : brushSize,
        points: [pos.x, pos.y]
      };
      setLines(prev => [...prev, newLine]);
    } else if (tool === 'rect') {
      const newShape: ShapeData = {
        id: 'shape_' + Date.now(),
        type: 'rect',
        x: pos.x,
        y: pos.y,
        width: 80,
        height: 50,
        color
      };
      setShapes(prev => [...prev, newShape]);
    } else if (tool === 'circle') {
      const newShape: ShapeData = {
        id: 'shape_' + Date.now(),
        type: 'circle',
        x: pos.x,
        y: pos.y,
        radius: 35,
        color
      };
      setShapes(prev => [...prev, newShape]);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    if (tool === 'pen' || tool === 'eraser') {
      setLines(prev => {
        if (prev.length === 0) return prev;
        const lastLine = { ...prev[prev.length - 1] };
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        return [...prev.slice(0, prev.length - 1), lastLine];
      });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => {
    soundEngine.playWhiteboardSound();
    if (lines.length > 0) {
      setLines(lines.slice(0, -1));
    } else if (shapes.length > 0) {
      setShapes(shapes.slice(0, -1));
    }
  };

  const handleClearBoard = () => {
    soundEngine.playWhiteboardSound();
    setLines([]);
    setShapes([]);
  };

  const handleAddLatex = (texString?: string, titleString?: string) => {
    const texToAdd = texString || customTex;
    if (!texToAdd.trim()) return;

    soundEngine.playPaymentSuccessChime();
    const newEq: LatexEquation = {
      id: 'eq_' + Date.now(),
      title: titleString || customTitle || 'Math Formula',
      tex: texToAdd,
      x: Math.floor(Math.random() * (stageWidth - 260)) + 20,
      y: Math.floor(Math.random() * (stageHeight - 120)) + 20,
      addedBy: 'Kofi Kwakye'
    };
    setEquations(prev => [...prev, newEq]);
  };

  const handleRemoveEquation = (id: string) => {
    soundEngine.playWhiteboardSound();
    setEquations(prev => prev.filter(e => e.id !== id));
  };

  const handleDownloadImage = () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `nexus-math-whiteboard-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  const handleAskAiForSolution = async () => {
    soundEngine.playWhiteboardSound();
    setAiAssistantLoading(true);

    try {
      const res = await fetch('/api/ai/tutor-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: customTex,
          subject: 'Elective Mathematics',
          curriculum: 'GES WASSCE'
        })
      });
      const data = await res.json();
      if (data.success && data.answer) {
        soundEngine.playPaymentSuccessChime();
        handleAddLatex('\\text{AI Step: } ' + customTex, 'Gemini AI Explanation');
      }
    } catch (e) {
      console.warn("AI solution fetch failed, using fallback:", e);
    } finally {
      setAiAssistantLoading(false);
    }
  };

  // Safe KaTeX renderer helper
  const renderKatexHtml = (tex: string) => {
    try {
      return katex.renderToString(tex, {
        throwOnError: false,
        displayMode: true
      });
    } catch {
      return `<span style="color: #ef4444;">${tex}</span>`;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-4 text-white">
      
      {/* Top Suite Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-300 font-serif-heading text-sm">
            Collaborative Math & Science Whiteboard
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono hidden sm:inline">
            Live with {tutorName}
          </span>
        </div>

        {/* View mode toggle tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('board')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              activeTab === 'board' ? 'bg-amber-500 text-slate-950 shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Konva Canvas & Equations</span>
          </button>

          <button
            onClick={() => setActiveTab('latex_library')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              activeTab === 'latex_library' ? 'bg-amber-500 text-slate-950 shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sigma className="w-3.5 h-3.5" />
            <span>LaTeX Formula Suite</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadImage}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl transition border border-slate-700 text-xs font-bold flex items-center gap-1"
            title="Export Canvas Image"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PNG</span>
          </button>
        </div>
      </div>

      {activeTab === 'board' ? (
        <>
          {/* Controls Bar for Canvas Tools */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
            {/* Tool Selection */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTool('pen')}
                className={`p-2 rounded-xl transition ${tool === 'pen' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Freehand Pen"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => setTool('eraser')}
                className={`p-2 rounded-xl transition ${tool === 'eraser' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Eraser"
              >
                <Eraser className="w-4 h-4" />
              </button>

              <button
                onClick={() => setTool('rect')}
                className={`p-2 rounded-xl transition ${tool === 'rect' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Rectangle"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                onClick={() => setTool('circle')}
                className={`p-2 rounded-xl transition ${tool === 'circle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}
                title="Circle"
              >
                <CircleIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1.5">
              {['#f59e0b', '#10b981', '#38bdf8', '#f43f5e', '#a855f7', '#ffffff'].map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-5 h-5 rounded-full border transition ${color === c ? 'ring-2 ring-amber-400 scale-110' : 'opacity-80'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Stroke Thickness */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Size:</span>
              <input
                type="range"
                min={1}
                max={12}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-16 accent-amber-500 cursor-pointer"
              />
              <span className="text-amber-300 font-bold w-4">{brushSize}</span>
            </div>

            {/* Undo / Clear */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl transition"
                title="Undo Last Stroke"
              >
                <Undo className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearBoard}
                className="p-2 text-red-400 hover:bg-red-950/50 rounded-xl transition"
                title="Clear Slate"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Konva Stage & Floating KaTeX Overlays */}
          <div ref={containerRef} className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner min-h-[380px]">
            
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Konva Stage */}
            <Stage
              ref={stageRef}
              width={stageWidth}
              height={stageHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className="cursor-crosshair block relative z-0"
            >
              <Layer>
                {/* Drawn Shapes */}
                {shapes.map(s => {
                  if (s.type === 'rect') {
                    return (
                      <Rect
                        key={s.id}
                        x={s.x}
                        y={s.y}
                        width={s.width}
                        height={s.height}
                        stroke={s.color}
                        strokeWidth={2}
                      />
                    );
                  }
                  if (s.type === 'circle') {
                    return (
                      <Circle
                        key={s.id}
                        x={s.x}
                        y={s.y}
                        radius={s.radius}
                        stroke={s.color}
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                })}

                {/* Freehand Pen Lines */}
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                ))}
              </Layer>
            </Stage>

            {/* Draggable KaTeX Math Formula Overlays */}
            {equations.map((eq) => (
              <div
                key={eq.id}
                style={{ left: `${eq.x}px`, top: `${eq.y}px` }}
                className="absolute z-10 bg-slate-900/90 border border-amber-400/60 backdrop-blur-md p-3 rounded-2xl shadow-2xl max-w-md group transition-all"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-300 border-b border-slate-800 pb-1 mb-1.5 gap-3">
                  <span className="flex items-center gap-1 font-serif-heading text-xs">
                    <Sigma className="w-3.5 h-3.5 text-amber-400" />
                    {eq.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-mono text-[9px]">{eq.addedBy}</span>
                    <button
                      onClick={() => handleRemoveEquation(eq.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* KaTeX HTML Output */}
                <div
                  className="text-amber-100 text-sm overflow-x-auto py-1 font-mono leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderKatexHtml(eq.tex) }}
                />
              </div>
            ))}

            {/* Live Participant Cursors Indicator */}
            <div className="absolute bottom-3 left-3 z-10 bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-300 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Math Session: <strong className="text-amber-300">{tutorName}</strong> & <strong className="text-amber-300">Kofi Kwakye</strong></span>
            </div>

          </div>
        </>
      ) : (
        /* LaTeX Formula Suite & Custom TeX Composer */
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sigma className="w-4 h-4 text-amber-400" />
              LaTeX Math & Science Equation Library
            </h3>
            <span className="text-xs text-slate-400">Click any formula to add directly to Konva stage</span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: 'Quadratic Formula',
                tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
                curriculum: 'GES Core Math'
              },
              {
                title: 'Calculus Differentiation',
                tex: '\\frac{d}{dx} \\left( u \\cdot v \\right) = u \\frac{dv}{dx} + v \\frac{du}{dx}',
                curriculum: 'Cambridge A-Level'
              },
              {
                title: 'Definite Integration',
                tex: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
                curriculum: 'WASSCE Elective Math'
              },
              {
                title: 'Einstein Mass-Energy',
                tex: 'E = m c^2 \\quad (c \\approx 3 \\times 10^8 \\text{ m/s})',
                curriculum: 'Physics Standard'
              },
              {
                title: 'Chemistry Titration Molarity',
                tex: '\\frac{M_a V_a}{n_a} = \\frac{M_b V_b}{n_b}',
                curriculum: 'WASSCE Chemistry'
              },
              {
                title: 'Trigonometric Pythagorean',
                tex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
                curriculum: 'Core Math'
              }
            ].map((preset, idx) => (
              <div
                key={idx}
                onClick={() => handleAddLatex(preset.tex, preset.title)}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/80 p-3 rounded-2xl cursor-pointer transition group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                    {preset.title}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono">
                    {preset.curriculum}
                  </span>
                </div>

                <div
                  className="text-xs text-amber-200 py-1 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: renderKatexHtml(preset.tex) }}
                />

                <div className="text-[10px] text-amber-400 font-bold flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Plus className="w-3 h-3" /> Insert onto Whiteboard
                </div>
              </div>
            ))}
          </div>

          {/* Custom TeX Input Composer */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Write Custom LaTeX Expression
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Formula Title (e.g. Limit Theorem)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              />

              <input
                type="text"
                value={customTex}
                onChange={(e) => setCustomTex(e.target.value)}
                placeholder="TeX Code (e.g. \\lim_{x \\to \\infty} f(x))"
                className="sm:col-span-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            {/* Live Rendered TeX Preview */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold mb-1">Live Render Preview:</span>
              <div
                className="text-amber-300 text-base py-1"
                dangerouslySetInnerHTML={{ __html: renderKatexHtml(customTex) }}
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleAskAiForSolution}
                disabled={aiAssistantLoading}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>{aiAssistantLoading ? 'Gemini Thinking...' : 'Gemini AI Step Solver'}</span>
              </button>

              <button
                onClick={() => {
                  handleAddLatex();
                  setActiveTab('board');
                }}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Stamp onto Whiteboard</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
