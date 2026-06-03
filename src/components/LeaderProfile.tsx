/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Leaf, Feather, Shield, Sun, Database, Coins, Compass, Trees, ArrowLeft, Camera, PhoneCall, Mail, Heart, FileText, Lock, Bookmark, MapPin } from 'lucide-react';
import { Stakeholder } from '../types';
import { motion } from 'motion/react';

interface LeaderProfileProps {
  leader: Stakeholder;
  onBack: () => void;
  onRequestContact: () => void;
}

// Map string icon names to Lucide icons
const iconMap: Record<string, any> = {
  Users: Users,
  Leaf: Leaf,
  Feather: Feather,
  Shield: Shield,
  Sun: Sun,
  Database: Database,
  Coins: Coins,
  Compass: Compass,
  Trees: Trees,
  Heart: Heart,
  FileText: FileText,
  Lock: Lock,
  Bookmark: Bookmark,
  MapPin: MapPin
};

export default function LeaderProfile({ leader, onBack, onRequestContact }: LeaderProfileProps) {
  return (
    <div className="min-h-screen bg-brand-background/30 flex">
      {/* Sidebar: Navigation & Contact Trigger */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-brand-outline bg-[#f9faf2] p-6 text-left shrink-0">
        <div className="space-y-6">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao painel</span>
          </button>

          <div className="pt-4">
            <span className="block text-[11px] font-extrabold text-[#72796e] tracking-widest uppercase mb-4">Navegação</span>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onBack}
                  className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-brand-charcoal/70 hover:bg-brand-background/50 transition-all cursor-pointer"
                >
                  Explorar Saberes
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-brand-charcoal/70 hover:bg-brand-background/50 transition-all cursor-pointer">
                  Conexões Ativas
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-brand-charcoal/70 hover:bg-brand-background/50 transition-all cursor-pointer">
                  Impacto Territorial
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg bg-brand-primary text-white transition-all cursor-pointer shadow-sm">
                  Perfil Profissional
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Sidebar Request CTA */}
        <button 
          onClick={onRequestContact}
          className="w-full bg-brand-secondary hover:bg-[#853b24] text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-102 cursor-pointer uppercase tracking-wider text-center"
        >
          Solicitar Entrevista
        </button>
      </aside>

      {/* Main Profile Body */}
      <main className="flex-1 overflow-y-auto">
        {/* Sticky back header for mobile/tablet */}
        <div className="lg:hidden p-4 border-b border-brand-outline bg-[#f9faf2] flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-sm font-semibold text-brand-primary cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </button>
          <button 
            onClick={onRequestContact}
            className="bg-brand-secondary hover:bg-brand-secondary/90 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
          >
            Contatar
          </button>
        </div>

        {/* wide Cover Banner with beautiful biome typography & gradient - NO PHOTOS */}
        {(() => {
          const initials = leader.name
            .split(' ')
            .map((w) => w[0])
            .filter((_, i, arr) => i === 0 || i === arr.length - 1)
            .join('')
            .toUpperCase();

          const biomeStyles = leader.biome.toLowerCase() === 'amazônia' 
            ? { bg: 'from-emerald-900 via-[#10350d] to-[#0a2008]', border: 'border-emerald-600/30', color: 'text-emerald-400' }
            : leader.biome.toLowerCase() === 'cerrado'
            ? { bg: 'from-amber-800 via-[#4c330f] to-[#301f07]', border: 'border-amber-600/30', color: 'text-amber-400' }
            : { bg: 'from-amber-900 via-[#4e1b0c] to-[#300f05]', border: 'border-amber-800/30', color: 'text-amber-500' };

          return (
            <>
              <div className={`h-64 md:h-80 w-full relative bg-gradient-to-br ${biomeStyles.bg} flex items-center p-6 md:p-12 overflow-hidden border-b border-brand-outline`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] z-0" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-charcoal/30 to-transparent z-10" />
                
                <div className="relative z-10 text-left max-w-xl">
                  <span className="bg-white/10 text-brand-sand text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border border-white/20">
                    Selo de Autenticidade Comunitária
                  </span>
                  <p className="font-serif text-3xl md:text-4xl font-black text-brand-sand mt-4 leading-tight italic">
                    {leader.biome}
                  </p>
                  <p className="text-xs text-brand-sand/60 font-sans tracking-widest uppercase mt-2">
                    {leader.location}
                  </p>
                </div>
              </div>

              {/* Avatar Profile card header overlay */}
              <div className="px-6 md:px-12 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-outline">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                    {/* Beautiful typographic Avatar Monogram */}
                    <div className={`h-32 w-32 rounded-2xl bg-gradient-to-tr ${biomeStyles.bg} border-4 border-[#f9faf2] shadow-xl flex items-center justify-center text-white shrink-0`}>
                      <span className="font-serif text-4xl font-black tracking-wider text-brand-sand">
                        {initials}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="inline-block bg-brand-secondary/10 text-brand-secondary text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border border-brand-secondary/20">
                        {leader.communityType}
                      </span>
                      <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-primary mt-2">
                        {leader.name}
                      </h1>
                      <p className="text-sm font-medium text-[#72796e] font-sans mt-0.5">
                        {leader.title}
                      </p>
                    </div>
                  </div>

                  {/* Float Request Button */}
                  <div className="flex justify-center md:justify-end">
                    <button 
                      onClick={onRequestContact}
                      className="bg-brand-primary hover:bg-[#2d5a27] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md cursor-pointer flex items-center space-x-2 transition-all"
                    >
                      <span>Solicitar Entrevista</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })()}

        {/* Narrative & specialties section grid */}
        <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Column 1 & 2: Biography & Quote Narrative */}
          <div className="lg:col-span-2 text-left space-y-8">
            <h2 className="font-serif text-2xl font-bold text-brand-primary">
              Trajetória e Resistência
            </h2>

            {/* Blockquote Quote */}
            <blockquote className="border-l-4 border-brand-secondary pl-6 italic font-serif text-xl md:text-2xl text-[#853b24] py-1 max-w-2xl bg-[#ffd9e4]/20 rounded-r-lg pr-4">
              "{leader.quote}"
            </blockquote>

            {leader.narrative.map((para, i) => (
              <p key={i} className="font-serif text-base md:text-lg text-brand-charcoal/80 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Column 3: Specialties checklist */}
          <div className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline text-left">
            <h3 className="font-sans text-xs font-extrabold text-[#72796e] tracking-widest uppercase mb-6">
              ESPECIALIDADES & IMPACTO
            </h3>

            <div className="space-y-6">
              {leader.specialties.map((spec, i) => {
                const IconComponent = iconMap[spec.icon] || Leaf;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-2.5 bg-brand-background rounded-xl border border-brand-outline text-brand-primary">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-brand-primary">
                        {spec.title}
                      </h4>
                      <p className="font-serif text-xs text-brand-charcoal/60 leading-relaxed mt-1">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* gallery reimagined as highly elegant traditional milestones & indicators - NO IMAGE TAGS */}
        <div className="px-6 md:px-12 pb-16 max-w-7xl mx-auto text-left">
          <div className="flex items-end justify-between pb-4 border-b border-brand-outline mb-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-primary">
                Ações Governamentais e Metas em {leader.location.split(',')[0]}
              </h3>
              <p className="font-serif text-xs text-brand-charcoal/50 mt-1">
                Indicadores éticos auditados e mantidos pela comunidade local.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric Card 1 */}
            <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2 bg-brand-primary/10 text-brand-primary w-fit rounded-lg mb-4">
                  <Trees className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest">Preservação Territorial</h4>
                <p className="text-[11px] text-brand-charcoal/40 mt-0.5">Mapeamento dinâmico ativo</p>
              </div>
              <span className="block font-serif text-3xl font-extrabold text-brand-primary mt-6">
                100%
              </span>
            </div>

            {/* Metric Card 2 */}
            <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2 bg-brand-secondary/10 text-brand-secondary w-fit rounded-lg mb-4">
                  <Coins className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest">Retorno Cooperativo</h4>
                <p className="text-[11px] text-brand-charcoal/40 mt-0.5">Repartição de benefícios justa</p>
              </div>
              <span className="block font-serif text-3xl font-extrabold text-brand-primary mt-6">
                + R$ 85k
              </span>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2 bg-emerald-800/10 text-emerald-800 w-fit rounded-lg mb-4">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest">Famílias Salvaguardadas</h4>
                <p className="text-[11px] text-brand-charcoal/40 mt-0.5">Segurança alimentar e social</p>
              </div>
              <span className="block font-serif text-3xl font-extrabold text-brand-primary mt-6">
                120+
              </span>
            </div>

            {/* Metric Card 4 */}
            <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2 bg-[#7a5528]/10 text-[#7a5528] w-fit rounded-lg mb-4">
                  <Bookmark className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest">Saberes Catalogados</h4>
                <p className="text-[11px] text-brand-charcoal/40 mt-0.5">Práticas bioecológicas tradicionais</p>
              </div>
              <span className="block font-serif text-3xl font-extrabold text-brand-primary mt-6">
                Ativo
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
