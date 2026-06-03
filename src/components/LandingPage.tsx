/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, Users, MapPin, ChevronRight, HelpCircle } from 'lucide-react';
import { Stakeholder } from '../types';
import { STAKEHOLDERS } from '../data';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectLeader: (id: string) => void;
  searchQuery: string;
}

export default function LandingPage({ onSelectLeader, searchQuery }: LandingPageProps) {
  const [selectedBiome, setSelectedBiome] = useState<string>('all');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');

  // Filter leaders based on dropdown filters and active header search query
  const filteredStakeholders = STAKEHOLDERS.filter((leader) => {
    const matchesBiome = selectedBiome === 'all' || leader.biome.toLowerCase() === selectedBiome.toLowerCase();
    const matchesCommunity = selectedCommunity === 'all' || leader.communityType.toLowerCase() === selectedCommunity.toLowerCase();
    
    const matchesSearch = searchQuery === '' || 
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.biome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.communityType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBiome && matchesCommunity && matchesSearch;
  });

  return (
    <div className="font-sans">
      {/* Premium Typographic Hero Banner Section */}
      <section className="relative min-h-[460px] flex items-center justify-center text-white px-6 md:px-12 py-16 overflow-hidden bg-gradient-to-br from-brand-primary via-[#1c4e1a] to-[#7a5528]">
        {/* Subtle decorative grid/grain pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#bcf0ae_1px,transparent_1px)] [background-size:24px_24px] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-background to-transparent z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mr-auto text-left">
          <span className="inline-block bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs px-3 py-1 rounded-full font-semibold tracking-widest uppercase mb-4 animate-pulse">
            Iniciativa Compartilhada • Elos Locais
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-2xl text-shadow-md mb-6">
            Conectando saberes locais ao futuro global
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-brand-sand/95 leading-relaxed max-w-2xl mb-8 font-serif">
            Descubra, conecte-se e impulsione projetos liderados por comunidades nos biomas brasileiros. 
            Uma ponte direta entre a sabedoria ancestral e o impacto regenerativo do Brasil Profundo.
          </p>

          {/* Quick Filter Bar */}
          <div className="bg-white text-brand-charcoal p-4 md:p-3 rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-4 max-w-2xl border border-brand-outline">
            
            {/* Biome dropdown */}
            <div className="flex-1 flex items-center space-x-3 px-3 py-2 border-r border-brand-outline last:border-none md:border-r">
              <Compass className="h-5 w-5 text-brand-primary" />
              <div className="flex-1 text-left">
                <span className="block text-[10px] text-brand-charcoal/50 font-bold uppercase tracking-wide">Bioma</span>
                <select
                  value={selectedBiome}
                  onChange={(e) => setSelectedBiome(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-primary focus:outline-none cursor-pointer"
                >
                  <option value="all">Saber por Bioma</option>
                  <option value="cerrado">Cerrado</option>
                  <option value="amazônia">Amazônia</option>
                  <option value="pampa">Pampa</option>
                  <option value="pantanal">Pantanal</option>
                </select>
              </div>
            </div>

            {/* Community selector */}
            <div className="flex-1 flex items-center space-x-3 px-3 py-2 border-r border-brand-outline last:border-none md:border-r">
              <Users className="h-5 w-5 text-brand-primary" />
              <div className="flex-1 text-left">
                <span className="block text-[10px] text-brand-charcoal/50 font-bold uppercase tracking-wide">Comunidades</span>
                <select
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-primary focus:outline-none cursor-pointer"
                >
                  <option value="all">Tipo de Comunidade</option>
                  <option value="indígena">Indígena</option>
                  <option value="quilombola">Quilombola</option>
                  <option value="ribeirinha">Ribeirinha</option>
                </select>
              </div>
            </div>

            {/* Explore Button */}
            <button className="bg-brand-primary hover:bg-brand-primary-container text-white px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-102 flex items-center justify-center space-x-2 shadow-md cursor-pointer">
              <span>Explorar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Destaques da Semana Section */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-primary">
              Destaques da Semana
            </h2>
            <p className="text-brand-charcoal/60 text-sm mt-1 max-w-xl font-serif">
              Conheça os líderes e projetos territoriais que estão moldando o amanhã com preservação e respeito.
            </p>
          </div>
          {/* Quick Clear filters if active */}
          {(selectedBiome !== 'all' || selectedCommunity !== 'all') && (
            <button 
              onClick={() => { setSelectedBiome('all'); setSelectedCommunity('all'); }}
              className="mt-4 md:mt-0 text-xs font-semibold text-brand-secondary hover:underline cursor-pointer"
            >
              Exibir todas as lideranças ×
            </button>
          )}
        </div>

        {/* Stakeholder Bento Grid */}
        {filteredStakeholders.length === 0 ? (
          <div className="bg-[#f9faf2] rounded-2xl p-12 text-center border border-brand-outline max-w-lg mx-auto">
            <Compass className="h-10 w-10 text-brand-charcoal/30 mx-auto mb-4" />
            <h3 className="text-md font-bold text-brand-primary">Nenhum líder encontrado</h3>
            <p className="text-sm text-brand-charcoal/50 mt-1">Experimente remover seus filtros ou buscar por outro termo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStakeholders.map((leader, idx) => {
              // Extract initials for beautiful monogram
              const initials = leader.name
                .split(' ')
                .map((w) => w[0])
                .filter((_, i, arr) => i === 0 || i === arr.length - 1)
                .join('')
                .toUpperCase();

              // Biome styling helper
              const biomeStyles = leader.biome.toLowerCase() === 'amazônia' 
                ? { bg: 'from-emerald-800 to-[#123110]', border: 'border-emerald-600/30', color: 'text-emerald-400' }
                : leader.biome.toLowerCase() === 'cerrado'
                ? { bg: 'from-amber-700 to-[#4d3209]', border: 'border-amber-600/30', color: 'text-amber-400' }
                : { bg: 'from-amber-900 to-[#501c0c]', border: 'border-amber-800/30', color: 'text-amber-500' };

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  onClick={() => onSelectLeader(leader.id)}
                  className="bg-[#f9faf2] rounded-2xl overflow-hidden border border-brand-outline hover:border-brand-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer text-left"
                >
                  {/* Stylized Monogram/Badge layout container holding no photos */}
                  <div className={`h-40 w-full relative overflow-hidden bg-gradient-to-br ${biomeStyles.bg} flex flex-col justify-between p-6`}>
                    {/* Tiny grid overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0" />
                    
                    <div className="flex items-center justify-between z-10 w-full">
                      <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                        {leader.biome}
                      </span>
                      <span className={`text-[10px] font-extrabold tracking-wider uppercase ${biomeStyles.color}`}>
                        Líder Local
                      </span>
                    </div>

                    {/* Monogram circle emblem */}
                    <div className="flex items-center space-x-4 z-10">
                      <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <span className="font-serif text-2xl font-black text-white leading-none">
                          {initials}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-extrabold text-brand-sand/60 uppercase tracking-widest block">Iniciais do Guarda</span>
                        <span className="text-sm font-semibold text-white">Território de Origem</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col text-left">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-brand-primary group-hover:text-brand-secondary transition-colors duration-200">
                      {leader.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-brand-charcoal/50 font-medium mt-1">
                      <MapPin className="h-3 w-3 text-brand-secondary" />
                      <span>{leader.location}</span>
                    </div>

                    <p className="text-sm text-brand-charcoal/70 leading-relaxed font-serif mt-4 line-clamp-3">
                      {leader.narrative[0]}
                    </p>

                    <div className="mt-6 pt-4 border-t border-brand-outline flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                        {leader.communityType}
                      </span>
                      <button className="bg-[#154212] hover:bg-[#2d5a27] text-white text-xs font-bold px-4 py-2.1 rounded-lg transition-all flex items-center space-x-1 cursor-pointer">
                        <span>Apoiar Projeto</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Nosso Impacto em Números Section */}
      <section className="bg-brand-background/40 py-16 px-6 md:px-12 border-t border-b border-brand-outline">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
            Nosso Impacto em Números
          </h2>
          <p className="text-brand-charcoal/60 mt-2 max-w-2xl mx-auto font-serif">
            Construindo uma rede de apoio sólida e transparente, baseada no respeito mútuo e na valorização dos territórios tradicionais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-[#f9faf2] p-8 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all shadow-sm">
              <span className="block font-serif text-4xl md:text-5xl font-black text-brand-primary italic">
                +1.200
              </span>
              <span className="block text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest mt-2">
                Conexões Realizadas
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#f9faf2] p-8 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all shadow-sm">
              <span className="block font-serif text-4xl md:text-5xl font-black text-brand-primary italic">
                45
              </span>
              <span className="block text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest mt-2">
                Comunidades Atendidas
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#f9faf2] p-8 rounded-2xl border border-brand-outline hover:border-brand-primary/20 transition-all shadow-sm">
              <span className="block font-serif text-4xl md:text-5xl font-black text-brand-primary italic">
                R$ 5M+
              </span>
              <span className="block text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest mt-2">
                Investimento Direcionado
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#f9faf2] py-12 px-6 md:px-12 border-t border-brand-outline">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-left">
            <h3 className="font-serif text-lg font-bold text-brand-primary">Elos Locais</h3>
            <p className="text-xs text-brand-charcoal/50 mt-1">
              © 2026 Elos Locais. Valorizando o Brasil Profundo de forma humana e ética.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 md:mt-0 text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-wider">
            <a href="#" className="hover:text-brand-primary transition-colors">Diversidade Cultural</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Nossos Valores</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Código de Ética</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
