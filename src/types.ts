/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Stakeholder {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  title: string;
  location: string;
  biome: 'Cerrado' | 'Amazônia' | 'Mata Atlântica' | 'Caatinga' | 'Pantanal' | 'Pampa';
  communityType: 'Quilombola' | 'Indígena' | 'Ribeirinha' | 'Caiçara' | 'Sertaneja' | 'Tradicional';
  quote: string;
  narrative: string[];
  specialties: {
    title: string;
    description: string;
    icon: string;
  }[];
  gallery: {
    url: string;
    caption: string;
  }[];
}

export interface ConnectionReport {
  id: string;
  community: string;
  biome: string;
  type: string;
  status: 'Active' | 'Pending';
}

export interface ConnectionRequest {
  stakeholderId: string;
  type: 'Pesquisa' | 'Mentoria' | 'Palestra';
  description: string;
  beneficiaryDetails: string;
  step: number;
}
