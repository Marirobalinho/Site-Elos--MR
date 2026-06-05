/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, HelpCircle, User, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectLeader: (id: string | null) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  userEmail?: string;
  onSignOut?: () => void;
}

export default function Header({ activeTab, setActiveTab, onSelectLeader, onSearch, searchQuery, userEmail, onSignOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#f9faf2] border-b border-brand-outline px-6 py-4 flex items-center justify-between">
      {/* Brand logo & Slogan */}
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => {
          onSelectLeader(null);
          setActiveTab('explore');
        }}
      >
        <span className="font-serif text-2xl font-bold tracking-tight text-brand-primary">
          Elos Locais
        </span>
        <span className="hidden md:inline text-xs text-brand-primary/60 border-l border-brand-primary/20 pl-2 font-sans font-medium tracking-wide uppercase">
          Modernidade Humana
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8 font-sans text-sm font-semibold tracking-wide">
        <button
          onClick={() => {
            onSelectLeader(null);
            setActiveTab('explore');
          }}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'explore' 
              ? 'text-brand-primary border-b-2 border-brand-primary pb-1' 
              : 'text-brand-charcoal/60 hover:text-brand-primary'
          }`}
        >
          Biomas
        </button>
        <button
          onClick={() => {
            onSelectLeader(null);
            setActiveTab('comunidades');
          }}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'comunidades'
              ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
              : 'text-brand-charcoal/60 hover:text-brand-primary'
          }`}
        >
          Comunidades
        </button>
        <button
          onClick={() => {
            onSelectLeader(null);
            setActiveTab('impacts');
          }}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'impacts'
              ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
              : 'text-brand-charcoal/60 hover:text-brand-primary'
          }`}
        >
          Impactos
        </button>
      </nav>

      {/* Utilities */}
      <div className="flex items-center space-x-4">
        {/* Dynamic global search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Pesquisar saberes..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-56 bg-brand-background/60 focus:bg-white text-sm text-brand-charcoal placeholder-brand-charcoal/50 pl-9 pr-3 py-2 rounded-full border border-brand-outline focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all duration-200"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-charcoal/40" />
        </div>

        {/* Notifications */}
        <button className="p-2 text-brand-charcoal/70 hover:text-brand-primary hover:bg-brand-background/60 rounded-full transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-secondary"></span>
        </button>

        {/* Help */}
        <button className="p-2 text-brand-charcoal/70 hover:text-brand-primary hover:bg-brand-background/60 rounded-full transition-all">
          <HelpCircle className="h-5 w-5" />
        </button>

        {userEmail && onSignOut ? (
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs text-brand-charcoal/70 truncate max-w-[160px]">{userEmail}</span>
            <button
              onClick={onSignOut}
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              Sair
            </button>
          </div>
        ) : null}

        {/* Profile Avatar Monogram / Quick click to Settings */}
        <button 
          onClick={() => setActiveTab('settings')}
          className="flex items-center justify-center h-9 w-9 bg-gradient-to-br from-brand-primary to-[#1c4e1a] text-brand-sand font-serif font-black text-xs hover:border-brand-primary transition-all rounded-full border border-brand-outline cursor-pointer shadow-sm shrink-0"
        >
          AF
        </button>
      </div>
    </header>
  );
}
