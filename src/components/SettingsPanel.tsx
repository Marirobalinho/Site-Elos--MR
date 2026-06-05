/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Save, Plus, ArrowUpRight, ToggleLeft, ToggleRight, ShieldAlert, Sparkles, User, Briefcase, Mail, Building, Globe, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { getOrCreateUserProfile, updateUserProfile } from '../lib/profileService';

interface SettingsPanelProps {
  userEmail?: string;
  userId?: string;
}

export default function SettingsPanel({ userEmail, userId }: SettingsPanelProps) {
  // User Profile State (Self-management)
  const [userName, setUserName] = useState<string>('');
  const [userTitle, setUserTitle] = useState<string>('');
  const [userEmailState, setUserEmail] = useState<string>(userEmail ?? '');

  const [userBio, setUserBio] = useState<string>('');

  // Corporate Profile State
  const [companyName, setCompanyName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [companyDesc, setCompanyDesc] = useState<string>('');

  // Dynamic Toggles for advanced features
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    arcgis: true,
    email: true,
    api: false,
    backup: true,
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega o perfil do Supabase ao montar o componente
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!userId && userEmail) {
          // Obtém o ID do usuário a partir da sessão
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await loadUserProfileData(user.id);
          }
        } else if (userId) {
          await loadUserProfileData(userId);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, userEmail]);

  const loadUserProfileData = async (id: string) => {
    try {
      const profile = await getOrCreateUserProfile(id, userEmail || '');
      if (profile) {
        setUserName(profile.name);
        setUserTitle(profile.title);
        setUserEmail(profile.email);
        setUserBio(profile.bio);
        setCompanyName(profile.company_name);
        setWebsite(profile.website);
        setCompanyDesc(profile.company_desc);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const handleToggle = (key: string) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSaveError('Usuário não encontrado. Faça login novamente.');
        setSaving(false);
        return;
      }

      const result = await updateUserProfile(user.id, {
        name: userName,
        title: userTitle,
        email: userEmailState,
        bio: userBio,
        company_name: companyName,
        website: website,
        company_desc: companyDesc,
      });

      if (result) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Erro ao salvar alterações. Tente novamente.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao salvar';
      console.error('Erro completo:', error);
      setSaveError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Extract Initials for User Avatar
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="p-6 md:p-10 text-left font-sans max-w-5xl mx-auto space-y-10">
      
      {/* Title & Introduction */}
      <div className="pb-4 border-b border-brand-outline">
        <h1 className="font-serif text-3xl font-black text-brand-primary tracking-tight">
          Perfil e Configurações
        </h1>
        <p className="text-brand-charcoal/60 text-xs mt-1.5 font-serif">
          Gerencie sua identidade, visualize seus parâmetros de impacto e configure suas parcerias com os biomas protegidos.
        </p>
      </div>

      {/* Grid Layout: Left Column (Profile & Org), Right Column (Plan & Integrations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Personal & Corp Info (8 columns on lg) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* PERSONAL USER PROFILE CARD */}
          <section className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-2 border-b border-brand-outline/40">
              <span className="p-1.5 bg-brand-primary/10 text-brand-primary rounded-lg">
                <User className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wide">Seu Perfil Profissional</h2>
                <p className="text-[#72796e] text-[10px]">Customize seus dados de identificação na plataforma.</p>
              </div>
            </div>

            {/* Elevated Monogram Avatar (No photograph, clean geometric layout) */}
            <div className="flex items-center space-x-5 py-2">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-primary to-[#1c4e1a] flex items-center justify-center text-brand-sand font-serif font-black text-2xl shadow-inner border border-brand-primary/20">
                {userInitials}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold text-[#72796e] tracking-widest block">Credencial da Conexão</span>
                <span className="text-xs bg-[#bcf0ae]/40 text-brand-primary font-bold px-2.5 py-1 rounded-full border border-brand-primary/10 inline-block font-sans">
                  Nível Master • Elos Locais
                </span>
              </div>
            </div>

            {/* Editing fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Nome Completo</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Cargo / Atuação</label>
                  <input 
                    type="text" 
                    value={userTitle} 
                    onChange={(e) => setUserTitle(e.target.value)}
                    className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">E-mail de Contato</label>
                <input 
                  type="email" 
                  value={userEmailState} 
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Breve Biografia / Foco</label>
                <textarea 
                  value={userBio} 
                  onChange={(e) => setUserBio(e.target.value)}
                  rows={3}
                  className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg p-3 text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all font-sans leading-relaxed" 
                />
              </div>
            </div>
          </section>

          {/* ORGANIZACIONAL PROFILE CARD */}
          <section className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-2 border-b border-brand-outline/40">
              <span className="p-1.5 bg-brand-secondary/10 text-brand-secondary rounded-lg">
                <Building className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wide">Sua Organização</h2>
                <p className="text-[#72796e] text-[10px]">Defina os propósitos e links públicos da corporação parceira.</p>
              </div>
            </div>

            {/* Geometric organization shield emblem - NO PHOTOS */}
            <div className="flex items-center space-x-4 py-2">
              <div className="h-12 w-12 bg-brand-primary/10 rounded-xl border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Sparkles className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-[#72796e] tracking-widest uppercase">Emblema Registrado</span>
                <span className="text-[11px] text-brand-charcoal/60 block font-serif">Iniciativa Social Integrada</span>
              </div>
            </div>

            {/* Org fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Nome Institucional</label>
                <input 
                  type="text" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg px-3 py-2 text-xs text-brand-charcoal focus:outline-noneFocus" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Página Web</label>
                <input 
                  type="text" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-primary" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider block">Apresentação Institucional</label>
              <textarea 
                value={companyDesc} 
                onChange={(e) => setCompanyDesc(e.target.value)}
                rows={3}
                className="w-full bg-[#f9faf2] border border-[#c2c9bb] focus:border-brand-primary rounded-lg p-3 text-xs text-brand-charcoal focus:outline-none" 
              />
            </div>

            {/* Save Buttons & Toast Feedback */}
            <div className="flex justify-end items-center space-x-4 pt-2">
              {saveSuccess && (
                <span className="text-xs text-brand-primary font-bold flex items-center space-x-1 animate-fade-in">
                  <span className="bg-brand-primary/15 p-1 rounded-full text-brand-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>Configurações salvas com sucesso!</span>
                </span>
              )}
              {saveError && (
                <span className="text-xs text-red-600 font-bold flex items-center space-x-1 animate-fade-in">
                  <span className="bg-red-100 p-1 rounded-full text-red-600">
                    <ShieldAlert className="h-3 w-3" />
                  </span>
                  <span>{saveError}</span>
                </span>
              )}
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-brand-primary hover:bg-[#2d5a27] text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-sm cursor-pointer disabled:bg-brand-primary/60 flex items-center space-x-2 transition-all"
              >
                {saving ? (
                  <span>Salvando dados...</span>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Plans, Usage Indicators & Integrations (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* SUBSCRIPTION & METRIC CAPACITY CARD */}
          <section className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline shadow-sm space-y-6 flex flex-col justify-between">
            <div className="pb-2 border-b border-brand-outline/40">
              <span className="text-[9px] font-bold text-[#2d5a27] uppercase tracking-widest bg-[#bcf0ae]/40 px-3 py-1 rounded-full border border-brand-primary/10 font-sans">
                Plano Vigente
              </span>
              <h3 className="font-serif text-3xl font-black text-brand-primary mt-3 flex items-center space-x-2">
                <span>Conector Impact+</span>
              </h3>
              <p className="text-[10px] text-[#72796e] font-sans mt-1.5 leading-relaxed">
                Acesso ilimitado ao mapeamento de biomas, ferramentas de cocriação e relatórios de métricas sociais integradas.
              </p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-xl font-sans font-black text-brand-primary">R$ 2.450</span>
                <span className="text-[9.5px] text-[#72796e] block font-sans mt-0.5">Mensal / Cobrança anual</span>
              </div>
              <button className="bg-white hover:bg-brand-primary/5 text-brand-primary border border-[#c2c9bb] transition-all text-[10px] font-bold px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-1 shadow-sm">
                <span>Faturamento</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Usage indicators */}
            <div className="space-y-4 pt-4 border-t border-brand-outline/40">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-extrabold text-brand-charcoal/65 mb-1.5 font-sans tracking-wide">
                  <span>Conexões Estabelecidas</span>
                  <span>42 / 50 Ativas</span>
                </div>
                <div className="h-2 bg-[#d9dbd3] rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </section>

          {/* INTEGRATIONS & API SWITCHES CARD */}
          <section className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline shadow-sm space-y-5">
            <div className="pb-2 border-b border-brand-outline/40">
              <h3 className="text-xs font-bold text-[#72796e] uppercase tracking-widest tracking-wide">Integrações de Tecnologia</h3>
              <p className="text-[10px] text-[#72796e] mt-0.5">Habilite ou desative feeds de geoprocessamento comunitário.</p>
            </div>

            <div className="space-y-4 pt-1">
              
              {/* GIS switch */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-outline/20">
                <div className="text-left">
                  <span className="block text-xs font-bold text-brand-primary">Camada ArcGIS</span>
                  <span className="text-[10px] text-brand-charcoal/50 block">Sincronização de limites territoriais indígenas</span>
                </div>
                <button onClick={() => handleToggle('arcgis')} className="cursor-pointer text-brand-primary transition-colors">
                  {toggles.arcgis ? <ToggleRight className="h-8 w-8 text-brand-primary" /> : <ToggleLeft className="h-8 w-8 text-brand-charcoal/30" />}
                </button>
              </div>

              {/* Email switch */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-outline/20">
                <div className="text-left font-sans">
                  <span className="block text-xs font-bold text-brand-primary">Alertas por E-mail</span>
                  <span className="text-[10px] text-brand-charcoal/50 block">Notificar avanços nos acordos de mentoria</span>
                </div>
                <button onClick={() => handleToggle('email')} className="cursor-pointer text-brand-primary transition-colors">
                  {toggles.email ? <ToggleRight className="h-8 w-8 text-brand-primary" /> : <ToggleLeft className="h-8 w-8 text-brand-charcoal/30" />}
                </button>
              </div>

              {/* API switch */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-outline/20">
                <div className="text-left font-sans">
                  <span className="block text-xs font-bold text-brand-primary">Webhook API Elos</span>
                  <span className="text-[10px] text-brand-charcoal/50 block">Receber relatórios gerados em JSON corporativo</span>
                </div>
                <button onClick={() => handleToggle('api')} className="cursor-pointer text-brand-primary transition-colors">
                  {toggles.api ? <ToggleRight className="h-8 w-8 text-brand-primary" /> : <ToggleLeft className="h-8 w-8 text-brand-charcoal/30" />}
                </button>
              </div>

              {/* Cloud Backup integration */}
              <div className="flex items-center justify-between font-sans">
                <div className="text-left">
                  <span className="block text-xs font-bold text-brand-primary">Backup Amazon S3</span>
                  <span className="text-[10px] text-brand-charcoal/50 block">Salvaguarda de saberes tradicionais</span>
                </div>
                <button onClick={() => handleToggle('backup')} className="cursor-pointer text-brand-primary transition-colors">
                  {toggles.backup ? <ToggleRight className="h-8 w-8 text-brand-primary" /> : <ToggleLeft className="h-8 w-8 text-brand-charcoal/30" />}
                </button>
              </div>

            </div>
          </section>

          {/* SECURITY WARNING */}
          <div className="p-4 bg-[#7a5528]/5 rounded-xl border border-[#7a5528]/10 flex items-start space-x-3 text-left">
            <ShieldAlert className="h-4.5 w-4.5 text-[#7a5528] shrink-0 mt-0.5" />
            <div className="font-sans text-[10.5px] leading-relaxed text-[#7a5528]/90">
              <span className="font-bold block text-[#7a5528]">Soberania Comunitária de Dados</span>
              Em cooperação com a lei de salvaguarda cultural, todas as informações são mantidas de maneira estritamente provada e revertidas caso solicitado.
            </div>
          </div>

        </div>

      </div>

      {/* USER MANAGEMENT SECTION (TEAM / COLABORADORES) */}
      <section className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline shadow-sm space-y-6">
        <div className="flex justify-between items-end pb-4 border-b border-brand-outline/40">
          <div>
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wide">Gestão de Colaboradores</h2>
            <p className="text-[#72796e] text-[10px] mt-0.5">Convide e ajuste os níveis de credenciamento técnico de sua equipe.</p>
          </div>
          <button className="bg-white hover:bg-brand-background text-brand-secondary hover:text-[#853b24] text-xs font-bold py-1.5 px-3 rounded-lg border border-brand-outline flex items-center space-x-1.5 cursor-pointer shadow-sm transition-all font-sans">
            <Plus className="h-4 w-4" />
            <span>Convidar Integrante</span>
          </button>
        </div>

        {/* Members listing - NO PHOTOGRAPHS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Member 1 */}
          <div className="flex items-center justify-between p-3.5 bg-brand-background/40 hover:bg-brand-background/60 border border-brand-outline rounded-xl transition-all">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-brand-primary/10 text-brand-primary font-bold text-xs rounded-full flex items-center justify-center border border-brand-primary/20 shrink-0 select-none">
                AF
              </div>
              <div className="text-left font-sans text-xs">
                <span className="block font-bold text-brand-primary">Ana Ferreira</span>
                <span className="text-[10px] text-brand-charcoal/50 block truncate max-w-[130px]">ana.f@eloslocais.com</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#2d5a27] bg-[#bcf0ae]/30 px-2 py-0.5 rounded-full border border-brand-primary/10">
              Gestor
            </span>
          </div>

          {/* Member 2 */}
          <div className="flex items-center justify-between p-3.5 bg-brand-background/40 hover:bg-brand-background/60 border border-brand-outline rounded-xl transition-all font-sans">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-brand-secondary/15 text-brand-secondary font-bold text-xs rounded-full flex items-center justify-center border border-brand-secondary/20 shrink-0 select-none">
                RO
              </div>
              <div className="text-left text-xs">
                <span className="block font-bold text-brand-primary">Ricardo Oliveira</span>
                <span className="text-[10px] text-brand-charcoal/50 block truncate max-w-[130px]">ricardo.o@eloslocais.com</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full border border-brand-secondary/10">
              Técnico
            </span>
          </div>

          {/* Member 3 */}
          <div className="flex items-center justify-between p-3.5 bg-brand-background/40 hover:bg-brand-background/60 border border-brand-outline rounded-xl transition-all font-sans">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-[#7c3a55]/10 text-[#7c3a55] font-bold text-xs rounded-full flex items-center justify-center border border-[#7c3a55]/20 shrink-0 select-none">
                MC
              </div>
              <div className="text-left text-xs">
                <span className="block font-bold text-brand-primary">Mariana Costa</span>
                <span className="text-[10px] text-brand-charcoal/50 block truncate max-w-[130px]">mari.c@eloslocais.com</span>
              </div>
            </div>
            <span className="text-[9px] font-bold tracking-wider text-brand-charcoal/40 bg-brand-charcoal/5 px-2 py-0.5 rounded-full border border-brand-outline shrink-0">
              Enviado
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
