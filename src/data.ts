/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stakeholder } from './types';

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'auricelia-arapiuns',
    name: 'Auricélia Arapiuns',
    avatar: '/input_file_0.png',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    title: 'Coordenadora de Defesa Territorial e Artesanato do Rio Tapajós',
    location: 'Resex Tapajós-Arapiuns, Santarém, PA',
    biome: 'Amazônia',
    communityType: 'Ribeirinha',
    quote: 'O rio é nossa rua e nossa vida. Protegê-lo é defender o corpo de nossa terra natal.',
    narrative: [
      'Auricélia representa as vozes femininas e artesanais da Reserva Extrativista Tapajós-Arapiuns. Ela atua na defesa dos ecossistemas ribeirinhos e no fomento da bioeconomia local através do artesanato trançado com palha de tucumã.',
      'Sua liderança foca em garantir autonomia financeira para as mulheres ribeirinhas, estruturando feiras ecológicas e mapeando zonas de proteção comunitária contra atividades predatórias de pesca e desmatamento.'
    ],
    specialties: [
      {
        title: 'Bioeconomia Feminina',
        description: 'Capacitação e escoamento justo de artesanato ecológico feito por mulheres das comunidades.',
        icon: 'Coins'
      },
      {
        title: 'Defesa de Ecossistemas Costeiros',
        description: 'Vigilância contra pesca predatória nos lagos e igarapés da reserva extrativista.',
        icon: 'Shield'
      },
      {
        title: 'Preservação de Tradições',
        description: 'Ensino continuado de técnicas ancestrais de tingimento natural de palha aos jovens.',
        icon: 'Heart'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1532931899771-55737bc4493a?auto=format&fit=crop&q=80&w=400',
        caption: 'Navegação e monitoramento dos rios da Amazônia'
      },
      {
        url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=400',
        caption: 'Artesanato ecológico e trançamento sustentável'
      }
    ]
  },
  {
    id: 'seu-francisco',
    name: 'Seu Francisco do Jutaí',
    avatar: '/input_file_1.png',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
    title: 'Líder Extrativista e Mestre das Sementes Crioulas',
    location: 'Comunidade Jutaí, Resex Verde para Sempre, PA',
    biome: 'Amazônia',
    communityType: 'Ribeirinha',
    quote: 'A floresta em pé nos dá o sustento e a dignidade. O progresso de verdade respeita a vida e a água.',
    narrative: [
      'Seu Francisco é um experiente extrativista e mobilizador comunitário na imensa Resex Verde para Sempre. Lidera mutirões de proteção florestal e o manejo sustentável de sementes e óleos essenciais para cosmética verde.',
      'É amplamente respeitado por mediar conflitos socioambientais e capacitar famílias das redondezas em agricultura sintrópica, assegurando que o solo e as matas ciliares se regenerem de forma autônoma.'
    ],
    specialties: [
      {
        title: 'Agricultura Sintrópica',
        description: 'Consorciação de culturas alimentares integradas à regeneração de matas nativas.',
        icon: 'Trees'
      },
      {
        title: 'Manejo de Sementes',
        description: 'Coleta ética e armazenamento em bancos de sementes crioulas locais.',
        icon: 'Bookmark'
      },
      {
        title: 'Mediação Comunitária',
        description: 'Articulação de acordos coletivos de pesca e exploração de recursos florestais.',
        icon: 'Users'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1464254786740-b97e5420c299?auto=format&fit=crop&q=80&w=400',
        caption: 'Coleta de sementes e manejo agroflorestal'
      },
      {
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400',
        caption: 'Florestas preservadas e de uso comunitário'
      }
    ]
  },
  {
    id: 'txai-surui',
    name: 'Txai Suruí',
    avatar: '/input_file_2.png',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',
    title: 'Ativista pelo Clima e Defensora da Justiça Climática',
    location: 'Terra Indígena Sete de Setembro, RO/MT',
    biome: 'Amazônia',
    communityType: 'Indígena',
    quote: 'A Terra está falando conosco. Não temos mais tempo, a mudança climática é agora.',
    narrative: [
      'Walelasoetxeige Suruí, amplamente conhecida como Txai Suruí, é uma das principais lideranças jovens do ativismo climático global. Ficou mundialmente conhecida por seu discurso na COP26 e segue articulando a defesa dos povos indígenas à urgência climática global.',
      'Sua atuação cruza direito, tecnologia e proteção ambiental ativa, conectando os ecossistemas amazônicos aos principais centros internacionais de tomada de decisão para exigir soberania de dados e respeito ao meio ambiente.'
    ],
    specialties: [
      {
        title: 'Defesa Climática Global',
        description: 'Articulação junto à ONU e fóruns climáticos para preservação florestal ativa.',
        icon: 'Compass'
      },
      {
        title: 'Soberania de Dados',
        description: 'Uso de ferramentas digitais e mapeamentos sob gestão e direito originário.',
        icon: 'FileText'
      },
      {
        title: 'Formação Jurídica Comunitária',
        description: 'Capacitação em Direitos Territoriais para lideranças de base locais.',
        icon: 'Lock'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400',
        caption: 'Mapeamento territorial indígena'
      },
      {
        url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=400',
        caption: 'Florestas preservadas pelo povo indígena'
      }
    ]
  },
  {
    id: 'sonia-guajajara',
    name: 'Sônia Guajajara',
    avatar: '/input_file_3.png',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200',
    title: 'Liderança Nacional e Luta pelos Direitos dos Povos Originários',
    location: 'Terra Indígena Araribóia, MA',
    biome: 'Amazônia',
    communityType: 'Indígena',
    quote: 'A demarcação das terras indígenas é a garantia do clima equilibrado para todo o planeta.',
    narrative: [
      'Sônia Bone de Sousa Silva Santos, ou Sônia Guajajara, é uma proeminente voz indígena brasileira reconhecida internacionalmente. Formada em Letras e Enfermagem, atua na linha de frente pela demarcação e proteção física de terras ricas em biodiversidade.',
      'Sua liderança foi responsável por coordenar marcos históricos do movimento indígena contemporâneo, integrando pautas de ecologia e defesa contra o desmatamento ilegal em biomas de transição da Amazônia.'
    ],
    specialties: [
      {
        title: 'Incidência de Políticas Públicas',
        description: 'Articulação política para demarcação e frentes de proteção física dos territórios.',
        icon: 'Shield'
      },
      {
        title: 'Defesa contra Desmatamento',
        description: 'Suporte a brigadas voluntárias comunitárias (Guardas da Floresta) no Maranhão.',
        icon: 'Trees'
      },
      {
        title: 'Saúde & Educação Indígena',
        description: 'Fórmula integrada para formação bilíngue e medicina preventiva tradicional comunitária.',
        icon: 'Heart'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=400',
        caption: 'Organização coletiva e intercâmbio de sementes'
      },
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
        caption: 'Encontro de anciãos e jovens guardiões'
      }
    ]
  },
  {
    id: 'almir-surui',
    name: 'Chefe Almir Suruí',
    avatar: '/input_file_4.png',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
    title: 'Chefe Geral do Povo Paiter Suruí e Pioneiro em Carbono Florestal',
    location: 'Aldeia Lapetanha, TI Sete de Setembro, Rondônia',
    biome: 'Amazônia',
    communityType: 'Indígena',
    quote: 'Usamos a tecnologia do homem branco para vigiar nossa floresta e compartilhar nosso grito com o mundo.',
    narrative: [
      'Almir Suruí é o grande chefe do povo Paiter Suruí. Ele ganhou notoriedade por planejar e executar o primeiro projeto de créditos de carbono florestal liderado inteiramente por indígenas na história da Amazônia.',
      'Sua gestão pioneira integra tecnologias como monitoramento por satélite e mapeamentos digitais no Google Earth para comprovar e proteger a biomassa natural de seu território ancestral, contra a invasão de grileiros e madeireiros.'
    ],
    specialties: [
      {
        title: 'Tecnologia na Floresta',
        description: 'Treinamento de guardas de floresta no uso de smartphones, drones e GPS de alta precisão.',
        icon: 'FileText'
      },
      {
        title: 'Projetos de Carbono Florestal',
        description: 'Inovação em economia regenerativa que financia a segurança e a saúde da comunidade.',
        icon: 'Coins'
      },
      {
        title: 'Plano de Gestão de 50 Anos',
        description: 'Visão estratégica intergeracional de reflorestamento ativo e fomento sustentável.',
        icon: 'Trees'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=400',
        caption: 'Mapeamento ambiental com parcerias globais'
      },
      {
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400',
        caption: 'Restauração pioneira de castanhais'
      }
    ]
  },
  {
    id: 'manoel-munduruku',
    name: 'Manoel Munduruku',
    avatar: '/input_file_5.png',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200',
    title: 'Liderança Munduruku e Articulador de Saúde Indígena',
    location: 'Terra Indígena Munduruku, Jacareacanga, PA',
    biome: 'Amazônia',
    communityType: 'Indígena',
    quote: 'Proteger nossa saúde é garantir a permanência de nossa cultura na floresta sagrada.',
    narrative: [
      'Manoel é uma proeminente voz de articulação social e saúde indígena no médio Tapajós. Trabalha na conscientização sanitária integrando conhecimentos farmacológicos tradicionais do povo Munduruku com os recursos da medicina moderna.',
      'Participou ativamente do monitoramento da qualidade da água dos rios locais para mitigar as consequências de contaminações externas, servindo de elo científico com universidades e laboratórios de saúde pública federais.'
    ],
    specialties: [
      {
        title: 'Monitoramento Ambiental de Água',
        description: 'Análise coletiva para garantir água potável e livre de dejetos nas aldeias.',
        icon: 'Compass'
      },
      {
        title: 'Sabedoria Fitoterápica',
        description: 'Documentação cuidadosa dos remédios e chás botânicos tradicionais.',
        icon: 'Bookmark'
      },
      {
        title: 'Intercâmbio de Saúde de Base',
        description: 'Sensibilização sanitária preventiva compatível com crenças autóctones.',
        icon: 'Users'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400',
        caption: 'Conservação hídrica do alto rio Tapajós'
      },
      {
        url: 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=400',
        caption: 'Coleta de plantas medicinais nativas'
      }
    ]
  },
  {
    id: 'maria-pesca',
    name: 'Dona Maria da Pesca',
    avatar: '/input_file_6.png',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    title: 'Presidente da Associação de Pescaria Artesanal Caiçara',
    location: 'Vila de Ponta Negra, Paraty, RJ',
    biome: 'Mata Atlântica',
    communityType: 'Caiçara',
    quote: 'O mar é o altar e o sustento de quem respeita o tempo da natureza e as rotas tradicionais.',
    narrative: [
      'Dona Maria lidera a comunidade caiçara de Ponta Negra na preservação dos métodos de pescaria artesanal com canoas de voga. Promove um turismo de base comunitária onde os visitantes comem o pescado fresco da pesca de cerco tradicional.',
      'Sua liderança foi essencial para que a comunidade obtivesse o auto-manejo sustentável de sua faixa costeira, promovendo a rotatividade de áreas de pesca para garantir a fertilidade das estuárias e o equilíbrio dos manguezais.'
    ],
    specialties: [
      {
        title: 'Pescaria Artesanal Rasteira',
        description: 'Pesca baseada em rotas de cardumes tradicionais e canoas manufaturadas locais.',
        icon: 'Compass'
      },
      {
        title: 'Turismo Pedagógico Sustentável',
        description: 'Trilhas, hospedagem familiar e alimentação fornecidas de maneira integrada e equitativa.',
        icon: 'MapPin'
      },
      {
        title: 'Manejo de Fauna Marinha',
        description: 'Auto-regulamentação de períodos de defeso costeiro locais baseada em saberes tradicionais.',
        icon: 'Heart'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
        caption: 'Baías e embarcações tradicionais caiçaras'
      },
      {
        url: 'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&q=80&w=400',
        caption: 'Áreas de ecossistema de manguezais costeiros'
      }
    ]
  }
];
