import React, { useRef, useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioEffects';
import { Pencil, Eraser, Circle, Square, Minus, Trash2, Download, Sigma, Sparkles, Check } from 'lucide-react';

interface CollaborativeWhiteboardProps {
  tutorName?: string;
}

export const CollaborativeWhiteboard: React.FC<CollaborativeWhiteboardProps> = ({ tutorName = 'Dr. Abena Osei-Mensah' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'line' | 'rect' | 'circle'>('pen');
  const [color, setColor] = useState<string>('#f59e0b'); // Amber default
  const [brushSize, setBrushSize] = useState<number>(3);
  
  // LaTeX Equation overlay state
  const [equationsOnBoard, setEquationsOnBoard] = useState<Array<{ id: string; tex: string; x: number; y: number }>>([
    { id: 'eq_1', tex: '\\int_0^1 (3x^2 + 2x) dx = [x^3 + x^2]_0^1 = 2', x: 40, y: 50 },
    { id: 'eq_2', tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', x: 40, y: 120 }
  ]);
  const [customTexInput, setCustomTexInput] = useState<string>('\\sum_{i=1}^n x_i = \\bar{x} \\cdot n');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial grid background
    ctx.fillStyle = '#0f172a'; // Deep Slate Dark Board
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw graph paper grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#0f172a' : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
    ctx.lineCap = 'round';

    setIsDrawing(true);
    soundEngine.playWhiteboardSound();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    soundEngine.playWhiteboardSound();
  };

  const handleAddLatexEquation = (texString?: string) => {
    const textToAdd = texString || customTexInput;
    if (!textToAdd.trim()) return;

    soundEngine.playPaymentSuccessChime();
    setEquationsOnBoard(prev => [
      ...prev,
      {
        id: 'eq_' + Date.now(),
        tex: textToAdd,
        x: Math.floor(Math.random() * 200) + 40,
        y: Math.floor(Math.random() * 150) + 160
      }
    ]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-4 text-white">
      
      {/* Board Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-400">
            Live Math & Science Whiteboard • Shared with {tutorName}
          </span>
        </div>

        {/* Tools Palette */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-xl transition ${tool === 'pen' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            title="Pen Tool"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-xl transition ${tool === 'eraser' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 my-auto" />

          {/* Colors */}
          {['#f59e0b', '#10b981', '#38bdf8', '#f43f5e', '#ffffff'].map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-5 h-5 rounded-full border transition ${color === c ? 'ring-2 ring-amber-400 scale-110' : 'opacity-80'}`}
              style={{ backgroundColor: c }}
            />
          ))}

          <div className="h-4 w-px bg-slate-800 my-auto" />

          <button
            onClick={handleClearBoard}
            className="p-2 rounded-xl text-red-400 hover:bg-red-950/60 transition"
            title="Clear Board"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area with Floating LaTeX Formula Overlays */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <canvas
          ref={canvasRef}
          width={680}
          height={320}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-[320px] cursor-crosshair block"
        />

        {/* Rendered LaTeX Math Overlays */}
        {equationsOnBoard.map((eq) => (
          <div
            key={eq.id}
            style={{ left: `${eq.x}px`, top: `${eq.y}px` }}
            className="absolute bg-slate-900/90 border border-amber-400/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-amber-300 font-mono text-xs shadow-lg flex items-center gap-2 cursor-move select-none"
          >
            <Sigma className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{eq.tex}</span>
          </div>
        ))}
      </div>

      {/* Quick LaTeX Formula Palette */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            LaTeX Math & Chemistry Formula Suite
          </span>
          <span className="text-[10px] text-slate-400">Click formula to stamp onto live canvas</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Quadratic Formula', tex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
            { label: 'Calculus Integral', tex: '\\int_a^b f(x)dx = F(b) - F(a)' },
            { label: 'Pythagoras Theorem', tex: 'a^2 + b^2 = c^2' },
            { label: 'Einstein Energy', tex: 'E = m c^2' },
            { label: 'Chemical Molarity', tex: 'M = \\frac{\\text{moles of solute}}{\\text{liters of solution}}' }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddLatexEquation(item.tex)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-[11px] font-mono transition flex items-center gap-1"
            >
              <Sigma className="w-3 h-3 text-amber-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customTexInput}
            onChange={(e) => setCustomTexInput(e.target.value)}
            placeholder="Type custom LaTeX TeX equation (e.g. \\lim_{x \\to \\infty})"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-amber-200 font-mono outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleAddLatexEquation()}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition shrink-0"
          >
            Insert TeX
          </button>
        </div>
      </div>

    </div>
  );
};
