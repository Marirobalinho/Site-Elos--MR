/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely with lazy checking
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('Warning: GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint to generate connection outreach drafts and advisory notes
app.post('/api/gemini/generate', async (req, res) => {
  const { stakeholderName, stakeholderBiome, requestType, objectiveDescription } = req.body;

  if (!stakeholderName || !requestType || !objectiveDescription) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const ai = getGenAI();
    
    // System instruction to guide Gemini inside the cultural respect context of Elos Locais
    const systemInstruction = `Você é o Assistente Digital de Ética e Facilitação da Elos Locais, uma plataforma que conecta o setor corporativo a lideranças e guardiões tradicionais em territórios remotos do Brasil (indígenas, quilombolas, ribeirinhos).
Seu objetivo é analisar a proposta de conexão de uma empresa e formular:
1. Uma recomendação ética baseada no respeito ao bioma (${stakeholderBiome || 'Brasil Profundo'}) e ao tempo da comunidade.
2. Um roteiro/briefing de abordagem inicial respeitoso em português, evitando jargões corporativos agressivos como "sprint", "fração de equity", "escalabilidade ágil", focando em escuta mútua, repartição justa de benefícios e regeneração local.
A saída deve ser em JSON estruturado com o seguinte esquema:
{
  "ethicalTips": ["Dica 1 de contextualização cultural", "Dica 2..."],
  "outreachDraft": "Texto elegante e respeitoso para propor a entrevista ou mentoria..."
}`;

    const prompt = `Gere uma proposta de conexão para:
Nome do Especialista: ${stakeholderName}
Bioma: ${stakeholderBiome || 'Brasil remoto'}
Tipo de Solicitação: ${requestType} (Pesquisa, Mentoria ou Palestra)
Objetivo da Conexão planejado pelo solicitante: "${objectiveDescription}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    });

    const bodyText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(bodyText);
    } catch (e) {
      parsedData = {
        ethicalTips: [
          'Garanta que seu cronograma respeite o ritmo de vida da comunidade tradicional.',
          'Evite impor ferramentas digitais complexas e dê preferência à comunicação direta se necessário.'
        ],
        outreachDraft: bodyText || 'Erro ao estruturar o rascunho. Entre em contato com as diretrizes da Elos Locais.'
      };
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error generating with Gemini API:', error);
    return res.status(500).json({ 
      error: 'Failed to generate proposal insights', 
      details: error.message || error 
    });
  }
});

// Setup Vite Dev Server / Static Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from "dist"
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

startServer();
