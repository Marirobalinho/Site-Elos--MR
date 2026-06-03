/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { ArrowUpRight, ShieldCheck, TreePine, Map, Calendar, Search } from 'lucide-react';
import { ConnectionReport } from '../types';

interface ImpactReportsProps {
  onNewConnection: () => void;
}

// Sample metrics data
const monthlyConnectionData = [
  { month: 'Jan', connections: 85 },
  { month: 'Fev', connections: 95 },
  { month: 'Mar', connections: 110 },
  { month: 'Abr', connections: 140 },
  { month: 'Mai', connections: 125 },
  { month: 'Jun', connections: 180 },
];

const biomesDistributionData = [
  { name: 'Amazônia', value: 320, color: '#154212' },
  { name: 'Cerrado', value: 240, color: '#e5b23a' },
  { name: 'Mata Atlântica', value: 160, color: '#98462d' },
  { name: 'Caatinga', value: 90, color: '#7c3a55' },
];

const RECENT_REPORTS: ConnectionReport[] = [
  { id: '1', community: 'Aldeia Maracanã', biome: 'Amazônia', type: 'Indígena', status: 'Active' },
  { id: '2', community: 'Comunidade Kalunga', biome: 'Cerrado', type: 'Quilombola', status: 'Active' },
  { id: '3', community: 'Ponta Negra', biome: 'Mata Atlântica', type: 'Caiçara', status: 'Pending' },
  { id: '4', community: 'Resex Tapajós', biome: 'Amazônia', type: 'Ribeirinha', status: 'Active' },
];

export default function ImpactReports({ onNewConnection }: ImpactReportsProps) {
  return (
    <div className="p-6 md:p-10 text-left font-sans max-w-7xl mx-auto space-y-10">
      
      {/* Dashboard Heading with search */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest block">Monitoramento & Métricas</span>
          <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-primary mt-1">
            Relatórios de Impacto
          </h1>
          <p className="font-serif text-sm text-brand-charcoal/60 mt-1 max-w-xl">
            Mensurando a conexão entre a infraestrutura moderna e a sabedoria das comunidades tradicionais brasileiras.
          </p>
        </div>
        
        {/* Search reports */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-64 bg-[#f9faf2] text-xs text-brand-charcoal px-3 py-2 pl-9 rounded-lg border border-brand-outline focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-charcoal/40" />
        </div>
      </div>

      {/* Grid: 3 Stats widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Widget 1: Total Connections Bar graph */}
        <div className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest">Total Connections</h3>
                <span className="text-xs text-brand-charcoal/40">Active nodes in ecosystem</span>
              </div>
              <span className="bg-[#bcf0ae]/40 text-brand-primary text-[10px] font-bold px-2 py-1 rounded-md">
                +12% this month
              </span>
            </div>
            
            <span className="block font-serif text-4xl font-extrabold text-[#154212] mt-4">
              1,284
            </span>
          </div>

          {/* Bar Chart graph segment */}
          <div className="h-28 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyConnectionData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#72796e' }} />
                <Tooltip cursor={{ fill: 'rgba(21, 66, 18, 0.05)' }} />
                <Bar dataKey="connections" fill="#154212" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Widget 2: Reached communities list breakdown progress */}
        <div className="bg-[#f9faf2] rounded-2xl p-6 border border-brand-outline text-left">
          <h3 className="text-xs font-bold text-brand-charcoal/50 uppercase tracking-widest">Communities Reached</h3>
          <span className="text-xs text-brand-charcoal/40 block">Territory categories breakdown</span>
          
          <span className="block font-serif text-4xl font-extrabold text-[#154212] mt-4 mb-6">
            412
          </span>

          <div className="space-y-4 text-xs font-semibold">
            {/* Indígena */}
            <div>
              <div className="flex justify-between text-brand-charcoal/80 mb-1">
                <span>Indigenous</span>
                <span>65%</span>
              </div>
              <div className="h-1.5 bg-[#d9dbd3] rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary" style={{ width: '65%' }} />
              </div>
            </div>

            {/* Quilombola */}
            <div>
              <div className="flex justify-between text-brand-charcoal/80 mb-1">
                <span>Quilombolas</span>
                <span>20%</span>
              </div>
              <div className="h-1.5 bg-[#d9dbd3] rounded-full overflow-hidden">
                <div className="h-full bg-brand-secondary" style={{ width: '20%' }} />
              </div>
            </div>

            {/* Caiçara / Ribeirinha */}
            <div>
              <div className="flex justify-between text-[#191c18] mb-1">
                <span>Ribeirinhas</span>
                <span>15%</span>
              </div>
              <div className="h-1.5 bg-[#d9dbd3] rounded-full overflow-hidden">
                <div className="h-full bg-brand-accent animate-pulse" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Widget 3: Gauge Biodiversity preservation banner */}
        <div className="bg-brand-primary text-white rounded-2xl p-6 border border-[#2d5a27]/20 flex flex-col justify-between text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-container/40 to-transparent z-0" />
          
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-brand-sand/70 uppercase tracking-widest">Biodiversity Impact</h3>
            <p className="text-[11px] text-brand-sand/50 mt-0.5">Forest conservation metrics</p>
          </div>

          <div className="flex items-center justify-around py-4 relative z-10">
            {/* Preservation Gauge Piechart */}
            <div className="h-28 w-28 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: 84, fill: '#bcf0ae' },
                      { value: 16, fill: '#2d5a27' }
                    ]}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={35}
                    outerRadius={45}
                    dataKey="value"
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[52%] text-center">
                <span className="block text-xl font-serif font-black text-brand-sand">84%</span>
                <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-brand-sand/65">Preservation</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-[#bcf0ae]/20 pt-3">
            <span className="text-[10px] text-brand-sand/80 font-semibold block uppercase tracking-wider">
              Data validated by local ecological monitors
            </span>
          </div>
        </div>
      </div>

      {/* Stats table: Recent connection reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Table segment (takes 2 col sizes on xl width) */}
        <div className="lg:col-span-2 bg-[#f9faf2] rounded-2xl border border-brand-outline p-6 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-brand-outline mb-4">
            <h3 className="font-serif text-lg font-bold text-brand-primary">Recent Connection Reports</h3>
            <button className="text-xs font-bold text-brand-secondary hover:underline cursor-pointer">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-semibold">
              <thead>
                <tr className="text-brand-charcoal/40 uppercase tracking-wider text-[10px] border-b border-brand-outline">
                  <th className="py-2.5 text-left font-bold">Community</th>
                  <th className="py-2.5 text-left font-bold">Biome</th>
                  <th className="py-2.5 text-left font-bold">Type</th>
                  <th className="py-2.5 text-left font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-outline/40">
                {RECENT_REPORTS.map((rep) => (
                  <tr key={rep.id} className="text-brand-charcoal/80">
                    <td className="py-3 text-left font-bold text-brand-primary">{rep.community}</td>
                    <td className="py-3 text-left text-brand-charcoal/60">{rep.biome}</td>
                    <td className="py-3 text-left text-brand-charcoal/70">{rep.type}</td>
                    <td className="py-3 text-left">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        rep.status === 'Active' 
                          ? 'bg-brand-primary/10 text-brand-primary' 
                          : 'bg-brand-charcoal/10 text-brand-charcoal'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${rep.status === 'Active' ? 'bg-brand-primary' : 'bg-brand-charcoal/50'}`}></span>
                        <span>{rep.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Info Card side with beautiful illustration image of Cerrado */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Support blocks */}
          <div className="bg-[#f9faf2] p-6 rounded-2xl border border-brand-outline text-left flex-1 space-y-4">
            <h3 className="text-xs font-extrabold text-brand-secondary uppercase tracking-widest block mb-1">Deep Brazil: Territorial Focus</h3>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-[#bcf0ae]/40 text-brand-primary rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-brand-primary">Transparent Governance</span>
                <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Every connection is mapped and verified by local tribal elder panels, ensuring cultural boundaries.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-[#ffd9e4]/40 text-[#813054] rounded-lg shrink-0 mt-0.5">
                <TreePine className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-brand-primary">Eco-Regeneration Focus</span>
                <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Reporting indexes more than raw bandwidth; we model carbon sequestration and water table integrity metrics.</p>
              </div>
            </div>
          </div>

          {/* Featured Biome graphic poster card - Typographic no-photo variant */}
          <div className="relative h-44 rounded-2xl overflow-hidden border border-brand-outline shadow-sm text-white flex items-end bg-gradient-to-br from-[#7a5528] to-[#4c330f] p-4">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#bcf0ae_1px,transparent_1px)] [background-size:16px_16px] z-0" />
            <div className="absolute top-4 right-4 text-brand-accent opacity-60">
              <TreePine className="h-10 w-10 stroke-[1.5]" />
            </div>
            <div className="relative z-10 text-left">
              <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest block">Featured Biome</span>
              <h4 className="font-serif text-base font-bold text-brand-sand">Cerrado Restoration</h4>
              <p className="text-[10px] text-brand-sand/65 mt-1 font-sans">Active recovery monitoring zone</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
