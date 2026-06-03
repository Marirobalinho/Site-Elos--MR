/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { Sparkles, Trash2, HelpCircle, FileText, Compass, Trees, Heart, Plus, Map, Info, AlertTriangle, Monitor, Move } from 'lucide-react';

interface MoodboardProps {
  onBack?: () => void;
}

export default function Moodboard({ onBack }: MoodboardProps) {
  const [editor, setEditor] = useState<any>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Helper to place programmatical shapes inside tldraw
  const handleAddSticky = (text: string, color: string, xOffset = 0, yOffset = 0) => {
    if (!editor) return;
    
    // Calculate coordinates around viewport center
    const { x, y } = editor.getCenter();
    const targetX = x - 100 + xOffset;
    const targetY = y - 100 + yOffset;

    editor.createShape({
      type: 'note',
      x: targetX,
      y: targetY,
      props: {
        text,
        color: color || 'green',
        size: 'm',
      },
    });
  };

  const handleAddText = (text: string, xOffset = 0, yOffset = 0) => {
    if (!editor) return;
    const { x, y } = editor.getCenter();
    editor.createShape({
      type: 'text',
      x: x - 150 + xOffset,
      y: y - 50 + yOffset,
      props: {
        text,
        size: 'l',
      },
    });
  };

  const clearCanvas = () => {
    if (!editor) return;
    const confirmClear = window.confirm('Tem certeza que deseja limpar tudo e reiniciar a mesa de cocriação?');
    if (confirmClear) {
      editor.selectAll();
      editor.deleteShapes(editor.getSelectedShapeIds());
    }
  };

  // Pre-configured templates to load instantly onto the canvas
  const loadAmazonasPreset = () => {
    if (!editor) return;
    setActivePreset('amazonas');
    
    const { x, y } = editor.getCenter();

    // Reset shapes in the view area first to avoid overlaps
    editor.selectAll();
    editor.deleteShapes(editor.getSelectedShapeIds());

    // Create title
    editor.createShape({
      type: 'text',
      x: x - 250,
      y: y - 240,
      props: {
        text: '🌴 Inspiração Amazônia Profunda',
        size: 'l',
      },
    });

    // Create notes
    editor.createShape({
      id: 'am1',
      type: 'note',
      x: x - 250,
      y: y - 120,
      props: {
        text: '🔋 BIOECONOMIA AMBIENTAL\nFoco em óleos essenciais e sementes nativas coletadas por famílias tradicionais.',
        color: 'green',
      },
    });

    editor.createShape({
      id: 'am2',
      type: 'note',
      x: x - 30,
      y: y - 120,
      props: {
        text: '☀️ ENERGIA & PROTEÇÃO\nMinirredes híbridas solares interconectadas. Vigilância proativa contra focos de invasão.',
        color: 'blue',
      },
    });

    editor.createShape({
      id: 'am3',
      type: 'note',
      x: x + 190,
      y: y - 120,
      props: {
        text: '🎨 PALETA E CORES DA FLORESTA\nVerde Cerrado (#154212)\nAzul Igarapé (#216091)\nTerracota Ancestral (#98462d)\nAreia de Rio (#f4f1ea)',
        color: 'yellow',
      },
    });

    editor.zoomToFit();
  };

  const loadCerradoPreset = () => {
    if (!editor) return;
    setActivePreset('cerrado');
    const { x, y } = editor.getCenter();

    // Reset shapes in the view area first to avoid overlaps
    editor.selectAll();
    editor.deleteShapes(editor.getSelectedShapeIds());

    editor.createShape({
      type: 'text',
      x: x - 250,
      y: y - 240,
      props: {
        text: '🌾 Vivências do Cerrado Tradicional',
        size: 'l',
      },
    });

    editor.createShape({
      id: 'cr1',
      type: 'note',
      x: x - 250,
      y: y - 120,
      props: {
        text: '🌱 AGRICULTURA SINTRÓPICA\nSistemas agrícolas que rejuvenescem a terra enquanto salvaguardam as águas nativas.',
        color: 'orange',
      },
    });

    editor.createShape({
      id: 'cr2',
      type: 'note',
      x: x - 30,
      y: y - 120,
      props: {
        text: '✨ FIBRA COMPARTILHADA\nArtesanato ético com base no capim-dourado para a autonomia feminina regional.',
        color: 'yellow',
      },
    });

    editor.createShape({
      id: 'cr3',
      type: 'note',
      x: x + 190,
      y: y - 120,
      props: {
        text: '✊ MEMÓRIA & AUTODETERMINAÇÃO\n"O Cerrado é nossa farmácia natural e nossa raiz ancestral de cura coletiva."',
        color: 'light-neutral',
      },
    });

    editor.zoomToFit();
  };

  const loadEthicsPreset = () => {
    if (!editor) return;
    setActivePreset('ethics');
    const { x, y } = editor.getCenter();

    // Reset shapes in the view area first to avoid overlaps
    editor.selectAll();
    editor.deleteShapes(editor.getSelectedShapeIds());

    editor.createShape({
      type: 'text',
      x: x - 250,
      y: y - 240,
      props: {
        text: '🤝 Diretrizes Éticas e de Consentimento',
        size: 'l',
      },
    });

    editor.createShape({
      id: 'et1',
      type: 'note',
      x: x - 250,
      y: y - 120,
      props: {
        text: '⏳ RITMO SOCIOAMBIENTAL\nCronogramas corporativos respeitam o repouso da terra e as colheitas comunitárias.',
        color: 'green',
      },
    });

    editor.createShape({
      id: 'et2',
      type: 'note',
      x: x - 30,
      y: y - 120,
      props: {
        text: '⚖️ REPARTIÇÃO INTEGRAL DE CRÉDITOS\nOs saberes imateriais pertencem às comunidades coletoras, de forma inalienável.',
        color: 'red',
      },
    });

    editor.createShape({
      id: 'et3',
      type: 'note',
      x: x + 190,
      y: y - 120,
      props: {
        text: '🔐 SOBERANIA DIGITAL E DE DADOS\nProibido registrar patentes comerciais sem prévia anuência consensual documentada.',
        color: 'blue',
      },
    });

    editor.zoomToFit();
  };

  const setupDefaultTutorial = (tldrawEditor: any) => {
    setEditor(tldrawEditor);
    
    // Add default welcoming shapes
    const { x, y } = tldrawEditor.getCenter();

    tldrawEditor.createShape({
      type: 'text',
      x: x - 250,
      y: y - 260,
      props: {
        text: '🎨 Mesa de Cocriação Elos Locais',
        size: 'l',
      },
    });

    tldrawEditor.createShape({
      id: 'tut1',
      type: 'note',
      x: x - 220,
      y: y - 120,
      props: {
        text: '💫 BEM-VINDO(A) À COCRIÇÃO VISUAL!\nUse este canvas digital infinito para esboçar novas ideias, traçar rotas sustentáveis e alinhar metas com seu território.',
        color: 'yellow',
      },
    });

    tldrawEditor.createShape({
      id: 'tut2',
      type: 'note',
      x: x + 40,
      y: y - 120,
      props: {
        text: '💡 DICA RÁPIDA:\nSelecione um dos "Modelos Temáticos" na barra lateral esquerda para povoar instantaneamente este mapa de saberes!',
        color: 'green',
      },
    });

    tldrawEditor.zoomToFit();
  };

  return (
    <div id="moodboard-main-container" className="h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-[#f4f1ea] overflow-hidden">
      
      {/* Lateral Control Panel - Redesigned to be highly organized and intuitive */}
      <aside 
        id="moodboard-sidebar" 
        className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-brand-outline bg-[#f9faf2] p-6 text-left flex flex-col justify-between shrink-0 overflow-y-auto max-h-[380px] lg:max-h-full scrollbar-thin shadow-sm z-10"
      >
        <div className="space-y-6">
          
          {/* Section 1: Heading Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-brand-secondary font-bold text-[10px] uppercase tracking-widest bg-brand-secondary/5 border border-brand-secondary/10 px-2.5 py-1 rounded-full w-fit">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-secondary" />
              <span>Espaço de Planejamento Ativo</span>
            </div>
            <h2 className="font-serif text-2xl font-black text-brand-primary tracking-tight">Cocriação</h2>
            <p className="font-serif text-xs text-brand-charcoal/60 leading-relaxed">
              Esboce metas de desenvolvimento, compile sugestões de sustentabilidade e crie quadros com as comunidades tradicionais sobre o quadro infinito.
            </p>
          </div>

          <hr className="border-brand-outline/80" />

          {/* Section 2: Step-by-step guidance */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-[#72796e] tracking-widest block mb-1">
                Passo 1: Carregar Modelo Temático
              </span>
              <p className="text-[10px] text-brand-charcoal/40 font-sans leading-tight">
                Limpa o quadro atual e injeta notas informativas de exemplo do respectivo bioma brasileiro.
              </p>
            </div>
            
            <div className="space-y-2.5">
              <button
                onClick={loadAmazonasPreset}
                className={`w-full text-left font-sans text-xs font-bold p-3 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                  activePreset === 'amazonas' 
                    ? 'bg-brand-primary/10 border-brand-primary/45 text-brand-primary shadow-sm' 
                    : 'bg-white hover:bg-brand-background border-brand-outline'
                }`}
              >
                <Trees className="h-5 w-5 text-emerald-800 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-brand-primary">Iniciativas da Amazônia</span>
                  <span className="text-[9.5px] font-medium text-brand-charcoal/45 block truncate">Energia limpa, bioeconomia e preservação</span>
                </div>
              </button>

              <button
                onClick={loadCerradoPreset}
                className={`w-full text-left font-sans text-xs font-bold p-3 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                  activePreset === 'cerrado' 
                    ? 'bg-brand-secondary/15 border-brand-secondary/45 text-brand-secondary shadow-sm' 
                    : 'bg-white hover:bg-brand-background border-brand-outline'
                }`}
              >
                <Compass className="h-5 w-5 text-brand-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-brand-primary">Riquezas do Cerrado</span>
                  <span className="text-[9.5px] font-medium text-brand-charcoal/45 block truncate">Capim-dourado e agroecologia sintrópica</span>
                </div>
              </button>

              <button
                onClick={loadEthicsPreset}
                className={`w-full text-left font-sans text-xs font-bold p-3 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                  activePreset === 'ethics' 
                    ? 'bg-brand-primary/10 border-indigo-500/40 text-brand-primary shadow-sm' 
                    : 'bg-white hover:bg-brand-background border-brand-outline'
                }`}
              >
                <Heart className="h-5 w-5 text-[#853b24] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-brand-primary">Preceitos de Conduta</span>
                  <span className="text-[9.5px] font-medium text-brand-charcoal/45 block truncate">Soberania de dados e respeito mútuo</span>
                </div>
              </button>
            </div>
          </div>

          <hr className="border-brand-outline/80" />

          {/* Section 3: Elements Custom Insertion */}
          <div className="space-y-3 font-sans">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-[#72796e] tracking-widest block">
                Passo 2: Inserir Notas Individuais
              </span>
              <p className="text-[10px] text-brand-charcoal/40 leading-tight mt-0.5">
                Clique para lançar blocos de anotações no centro de sua visualização ativa.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddSticky('🌱 Preservação Ativa\nInserir dados de controle...', 'green', 0, 0)}
                className="bg-white hover:bg-brand-background border border-brand-outline text-brand-primary text-[10.5px] font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Nota Verde</span>
              </button>

              <button
                onClick={() => handleAddSticky('💡 Estratégias do Bioma\nPráticas de bioeconomia...', 'yellow', 30, 30)}
                className="bg-white hover:bg-brand-background border border-brand-outline text-brand-primary text-[10.5px] font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Nota Ouro</span>
              </button>

              <button
                onClick={() => handleAddSticky('📊 Escopo de Benefícios\nDivisão justa e regular...', 'blue', -30, 30)}
                className="bg-white hover:bg-brand-background border border-brand-outline text-brand-primary text-[10.5px] font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Nota Azul</span>
              </button>

              <button
                onClick={() => handleAddText('📝 NOVO TEMA DO BIOMA', -20, -50)}
                className="bg-white hover:bg-brand-background border border-brand-outline text-brand-primary text-[10.5px] font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer transition-all shadow-sm"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Texto Plano</span>
              </button>
            </div>
          </div>

        </div>

        {/* Section 4: Canvas Actions and Quick Info Disclaimer */}
        <div className="space-y-4 pt-6 lg:pt-0">
          
          {/* Quick instructions block */}
          <div className="p-3.5 bg-brand-background/60 rounded-xl border border-brand-outline text-left">
            <div className="flex items-center space-x-2 text-brand-primary font-bold text-[10px] uppercase tracking-wider mb-1">
              <Info className="h-3.5 w-3.5 text-brand-primary" />
              <span>Instruções da Mesa</span>
            </div>
            <ul className="text-[10px] text-brand-charcoal/50 space-y-1 font-serif leading-relaxed">
              <li className="flex items-center space-x-1">
                <Move className="h-3 w-3 text-brand-secondary shrink-0" />
                <span>Pressione <strong>Espaço</strong> para arrastar a tela global</span>
              </li>
              <li className="flex items-center space-x-1">
                <Monitor className="h-3 w-3 text-brand-secondary shrink-0" />
                <span>Use a roda do mouse + <strong>Ctrl</strong> para dar Zoom</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              onClick={clearCanvas}
              className="w-full bg-[#fddbc7] hover:bg-[#faa175] text-[#912d1b] text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 border border-[#f57463]/30 cursor-pointer transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
              <span>Limpar Todo o Canvas</span>
            </button>
            
            <p className="text-[9px] text-center text-[#72796e]/70">
              Mesa de Cocriação Visual • Elos Locais 2026
            </p>
          </div>

        </div>
      </aside>

      {/* Infinite Canvas Tldraw Component Framed Container - Styled elegantly with clean canvas mask */}
      <main id="moodboard-canvas-holder" className="flex-1 relative bg-white border-t lg:border-t-0 select-none">
        
        {/* Ambient watermark/clinker on top right to mark authenticity */}
        <div className="absolute top-4 right-4 z-40 bg-[#f9faf2]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-outline text-[10px] font-bold text-brand-primary shadow-sm flex items-center space-x-1.5 pointer-events-none select-none animate-fade-in uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
          <span>Canvas de Planejamento Ativo</span>
        </div>

        <Tldraw 
          onMount={setupDefaultTutorial} 
        />
      </main>
    </div>
  );
}
