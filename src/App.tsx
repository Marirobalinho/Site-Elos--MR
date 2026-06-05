/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LeaderProfile from './components/LeaderProfile';
import ConnectionFlow from './components/ConnectionFlow';
import ImpactReports from './components/ImpactReports';
import SettingsPanel from './components/SettingsPanel';
import { STAKEHOLDERS } from './data';
import { Compass, Users, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Find the currently selected leader object
  const currentLeader = STAKEHOLDERS.find((leader) => leader.id === selectedLeaderId) || STAKEHOLDERS[0];

  const handleSelectLeader = (id: string | null) => {
    setSelectedLeaderId(id);
    if (id) {
      setActiveTab('leader-profile');
    }
  };

  const handleStartConnectionWizard = () => {
    setActiveTab('connection-wizard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1ea] text-brand-charcoal selection:bg-[#bcf0ae]/40 select-none pb-12">
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedLeaderId(null); // Clear active selected leader
        }}
        onSelectLeader={handleSelectLeader}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Content Area with Route Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedLeaderId || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === 'explore' && (
              <LandingPage 
                onSelectLeader={handleSelectLeader}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'leader-profile' && selectedLeaderId && (
              <LeaderProfile 
                leader={currentLeader}
                onBack={() => {
                  setSelectedLeaderId(null);
                  setActiveTab('explore');
                }}
                onRequestContact={handleStartConnectionWizard}
              />
            )}

            {activeTab === 'connection-wizard' && (
              <div className="py-8 bg-brand-background/30 px-4">
                <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between text-left font-sans">
                  <div className="flex items-center space-x-3">
                    {/* Typographic avatar monogram instead of photo */}
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-primary to-[#1c4e1a] text-brand-sand shadow-sm border border-brand-outline flex items-center justify-center font-serif font-black text-xs shrink-0 select-none">
                      {currentLeader.name
                        .split(' ')
                        .map((w: string) => w[0])
                        .filter((_: string, i: number, arr: string[]) => i === 0 || i === arr.length - 1)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#72796e] font-extrabold font-sans">Abordagem Ética</span>
                      <h2 className="text-sm font-serif font-black text-brand-primary leading-tight">Conexão com {currentLeader.name}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('leader-profile');
                    }}
                    className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                  >
                    Voltar ao perfil
                  </button>
                </div>
                <ConnectionFlow 
                  leader={currentLeader}
                  onClose={() => {
                    setSelectedLeaderId(null);
                    setActiveTab('explore');
                  }}
                />
              </div>
            )}

            {activeTab === 'comunidades' && (
              <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto text-left space-y-8">
                <div>
                  <h1 className="font-serif text-3xl font-black text-brand-primary">Comunidades Tradicionais</h1>
                  <p className="text-[#72796e] text-sm mt-1 max-w-xl font-serif">
                    Explore os diferentes grupos tradicionais que se cadastraram voluntariamente no Elos Locais para viabilizar pesquisas e mentorias sustentáveis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline space-y-4">
                    <div className="p-2.5 bg-[#bcf0ae]/40 text-brand-primary rounded-xl w-fit">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">Lideranças Indígenas</h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-serif">
                      Contatos estruturados com chefes e conselheiros de tecnologia de territórios demarcados da Amazônia Legal e Cerrado Central.
                    </p>
                    <div className="text-xs font-bold text-brand-secondary">12 aldeias ativas</div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline space-y-4">
                    <div className="p-2.5 bg-brand-secondary/10 text-brand-secondary rounded-xl w-fit">
                      <Compass className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">Comunidades Quilombolas</h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-serif">
                      Saberes tradicionais, medicina de biomas, artesanato sustentável e reparação histórica no Goiás, Bahia e Minas Gerais.
                    </p>
                    <div className="text-xs font-bold text-brand-secondary">18 quilombos cadastrados</div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline space-y-4">
                    <div className="p-2.5 bg-[#7c3a55]/10 text-[#7c3a55] rounded-xl w-fit">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">Caiçaras e Ribeirinhas</h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-serif">
                      Pescadores artesanais e produtores de bioeconomia mapeados nas encostas do litoral sudeste e rios do Pará.
                    </p>
                    <div className="text-xs font-bold text-brand-secondary">15 associações conectadas</div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="bg-brand-primary hover:bg-[#2d5a27] text-white text-xs font-bold px-6 py-3 rounded-lg cursor-pointer"
                  >
                    Ver líderes no mapa
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'impacts' && (
              <ImpactReports 
                onNewConnection={() => {
                  setSelectedLeaderId('marta-kalunga');
                  setActiveTab('connection-wizard');
                }}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
