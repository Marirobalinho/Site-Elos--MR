/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, GraduationCap, Users, ShieldCheck, HeartHandshake, ArrowRight, ArrowLeft, Sparkles, Check, Loader2 } from 'lucide-react';
import { Stakeholder } from '../types';

interface ConnectionFlowProps {
  leader: Stakeholder;
  onClose: () => void;
}

export default function ConnectionFlow({ leader, onClose }: ConnectionFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [requestType, setRequestType] = useState<'Pesquisa' | 'Mentoria' | 'Palestra'>('Pesquisa');
  const [objective, setObjective] = useState<string>('');
  
  // States for Gemini response
  const [loading, setLoading] = useState<boolean>(false);
  const [ethicalTips, setEthicalTips] = useState<string[]>([]);
  const [outreachDraft, setOutreachDraft] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Trigger server-side Gemini assist on entering step 2
  const handleProceedToStep2 = async () => {
    if (!objective.trim()) {
      alert('Por favor, descreva seu objetivo para prosseguir.');
      return;
    }

    setStep(2);
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stakeholderName: leader.name,
          stakeholderBiome: leader.biome,
          requestType,
          objectiveDescription: objective
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      setEthicalTips(data.ethicalTips || [
        'Respeite o tempo natural da comunidade (evite prazos de entrega urgentes).',
        'Estruture uma compensação ou compartilhamento transparente dos resultados da sua pesquisa.'
      ]);
      setOutreachDraft(data.outreachDraft || '');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Não foi possível carregar as dicas éticas e o rascunho. Mas sinta-se à vontade para enviar seu rascunho original!');
      setEthicalTips([
        'Considere que comunidades remotas possuem tempos e épocas específicas de plantio/colheita.',
        'Sempre realize parcerias baseadas no mútuo respeito e na justa divisão do conhecimento gerado.'
      ]);
      setOutreachDraft(`Olá Marta, gostaríamos de propor uma parceria no escopo de ${requestType}. Nosso objetivo é: ${objective}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-left font-sans">
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex md:items-center justify-between text-xs font-bold uppercase tracking-wider text-[#72796e] mb-2">
          <span>Etapa {step} de 3</span>
          <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'} concluído</span>
        </div>
        <div className="h-2 bg-[#d9dbd3] rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-primary transition-all duration-300"
            style={{ width: `${step * 33.3}%` }}
          />
        </div>
      </div>

      {/* Main card box */}
      <div className="bg-[#f9faf2] rounded-2xl border border-brand-outline p-8 mb-8 relative">
        
        {/* Step 1: Objective Formulation */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-black text-brand-primary">
                Objetivo da Conexão
              </h2>
              <p className="font-serif text-sm text-brand-charcoal/60 mt-1">
                Conte-nos brevemente o que motiva este encontro com <strong>{leader.name}</strong>. Buscamos parcerias baseadas em respeito mútuo e impacto sustentável positivo.
              </p>
            </div>

            {/* Selector: Request type */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#72796e] tracking-widest uppercase">Tipo de Solicitação</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* option 1: Pesquisa */}
                <button
                  type="button"
                  onClick={() => setRequestType('Pesquisa')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 text-center transition-all cursor-pointer ${
                    requestType === 'Pesquisa'
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold'
                      : 'border-brand-outline hover:border-brand-primary/40 text-brand-charcoal'
                  }`}
                >
                  <Search className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs">Pesquisa</span>
                </button>

                {/* option 2: Mentoria */}
                <button
                  type="button"
                  onClick={() => setRequestType('Mentoria')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 text-center transition-all cursor-pointer ${
                    requestType === 'Mentoria'
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold'
                      : 'border-brand-outline hover:border-brand-primary/40 text-brand-charcoal'
                  }`}
                >
                  <GraduationCap className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs">Mentoria</span>
                </button>

                {/* option 3: Palestra */}
                <button
                  type="button"
                  onClick={() => setRequestType('Palestra')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 text-center transition-all cursor-pointer ${
                    requestType === 'Palestra'
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold'
                      : 'border-brand-outline hover:border-brand-primary/40 text-brand-charcoal'
                  }`}
                >
                  <Users className="h-5 w-5 text-brand-primary" />
                  <span className="text-xs">Palestra</span>
                </button>
              </div>
            </div>

            {/* Description Text area */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#72796e] tracking-widest uppercase">Descrição do Objetivo</label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={5}
                placeholder="Como esta conexão pode beneficiar a comunidade local e sua organização? Descreva detalhadamente..."
                className="w-full bg-[#f9faf2] p-4 border border-[#c2c9bb] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-charcoal"
              />
            </div>

            {/* Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleProceedToStep2}
                disabled={!objective.trim()}
                className="bg-brand-primary hover:bg-[#2d5a27] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-2 disabled:bg-brand-primary/40 disabled:cursor-not-allowed"
              >
                <span>Próximo passo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Gemini Ethical Review & Drafting */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-black text-brand-primary flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-brand-accent fill-brand-accent/20 animate-spin-slow" />
                <span>Roteiro de Abordagem Sugerido</span>
              </h2>
              <p className="font-serif text-sm text-brand-charcoal/60 mt-1">
                A IA da Elos Locais analisou seu objetivo para ajustar seu roteiro às diretrizes éticas da comunidade no bioma <strong>{leader.biome}</strong>.
              </p>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 text-brand-primary animate-spin" />
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Consultando guardiões éticos...
                </span>
                <p className="text-xs text-brand-charcoal/50">Mapeando saberes com respeito local e cultural.</p>
              </div>
            ) : (
              <>
                {/* Dicas Éticas */}
                <div className="bg-[#ffd9e4]/20 border border-brand-secondary/15 rounded-xl p-5 text-left">
                  <h4 className="text-[11px] font-bold text-brand-secondary uppercase tracking-wider mb-3">Recomendações Éticas de Abordagem</h4>
                  <ul className="space-y-2">
                    {ethicalTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs font-serif text-[#853b24]">
                        <Check className="h-4 w-4 text-brand-secondary shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Edit draft outreach draft */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#72796e] tracking-widest uppercase">Mensagem de Abordagem Final</label>
                  <textarea
                    value={outreachDraft}
                    onChange={(e) => setOutreachDraft(e.target.value)}
                    rows={8}
                    className="w-full bg-[#f9faf2] p-4 border border-[#c2c9bb] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-charcoal font-serif"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-brand-secondary font-medium">{errorMsg}</p>
                )}

                {/* Step 2 buttons */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-brand-charcoal/60 hover:text-brand-primary text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-brand-primary hover:bg-[#2d5a27] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-2"
                  >
                    <span>Enviar Proposta</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Confirmation page */}
        {step === 3 && (
          <div className="space-y-8 py-6 text-center">
            <div className="h-16 w-16 bg-[#bcf0ae]/40 text-brand-primary rounded-full flex items-center justify-center mx-auto border border-brand-primary/20">
              <ShieldCheck className="h-10 w-10 animate-scale-up" />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-black text-brand-primary">
                Proposta Recebida com Sucesso!
              </h2>
              <p className="font-serif text-sm text-brand-charcoal/60 mt-2 max-w-lg mx-auto">
                Sua proposta de conexão para <strong>{leader.name}</strong> deu entrada em nossa triagem humanizada e será analisada pelos curadores locais.
              </p>
            </div>

            <div className="bg-[#f0f1ea]/70 rounded-2xl p-6 border border-brand-outline max-w-xl mx-auto space-y-4">
              <h4 className="text-[10px] font-extrabold text-[#72796e] tracking-wider uppercase text-center mb-2">Próximos Passos do Elos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-[#f9faf2] p-4 rounded-xl border border-brand-outline">
                  <span className="block text-xs font-bold text-brand-primary">1. Curadoria</span>
                  <p className="text-[11px] text-brand-charcoal/60 mt-1">Nossos guardiões verificam a aderência ética e se o contato respeita as sazonalidades.</p>
                </div>
                <div className="bg-[#f9faf2] p-4 rounded-xl border border-brand-outline">
                  <span className="block text-xs font-bold text-brand-primary">2. Agendamento</span>
                  <p className="text-[11px] text-brand-charcoal/60 mt-1">Se aprovado, um agente de ligação da comunidade auxilia os trâmites de comunicação.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="bg-brand-primary hover:bg-[#2d5a27] text-white font-bold text-sm px-10 py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Voltar ao painel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Support footer informational boxes */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline text-left">
            <div className="flex items-center space-x-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Curadoria Humana</span>
            </div>
            <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-serif">
              Cada pedido é avaliado pessoalmente por nossos guardiões culturais para garantir a segurança da comunidade tradicional e a privacidade de liderança local.
            </p>
          </div>

          <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline text-left">
            <div className="flex items-center space-x-2 text-brand-secondary font-bold text-xs uppercase tracking-wider mb-2">
              <HeartHandshake className="h-4 w-4" />
              <span>Impacto Gerado</span>
            </div>
            <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-serif">
              85% de nossas taxas e apoios corporativos voluntários são revertidos diretamente para fundos comunitários autogeridos na infraestrutura dos povos remotos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
