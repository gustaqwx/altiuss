// Assistant API adapter: three modes: real (Edge Function), demo, unconfigured
// No new frontend dependencies; uses fetch with SSE streaming

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
const FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || '/functions/v1';

const DEMO_RESPONSES = {
  student: {
    'mentoria': 'A mentoria quinzenal acontece a cada 15 dias. Você terá 6 sessões ao longo do programa: 3 individuais e 3 em grupo. O mentor é um profissional de mercado da indústria tech. Na sua área de aluno, acesse a aba "Mentoria" para ver agendamentos e confirmar presença.',
    'progresso': 'Seu progresso nas 6 competências WEF aparece no Dashboard de Competências (em desenvolvimento). Por enquanto, veja a visão geral na página inicial /app: fase atual, trilha, próxima entrega.',
    'envio': 'Para enviar uma atividade: 1) Abra a trilha em /app. 2) Clique na atividade desejada. 3) Leia enunciado e critérios. 4) Clique "Enviar entrega" e cole o texto ou anexe o arquivo. 5) Confirme. O mentor será notificado.',
    'fase3': 'A Fase 3 (Aplicar, meses 7 a 9) traz projetos reais de empresas parceiras. Você trabalha em squad heterogêneo e entrega: MVP funcional, documentação técnica e apresentação executiva. Gera portfólio e networking.',
    'default': 'Resposta de exemplo (modo demo). No modo real, o assistente usa a base de conhecimento completa e responde via Edge Function com streaming. Pergunte sobre trilhas, mentoria, simulações, dashboard, projetos ou comunidade.'
  },
  mentor: {
    'revisao': 'Para revisar uma entrega: 1) Acesse /app/mentor/revisao. 2) Clique na entrega pendente. 3) Leia enunciado, entrega do aluno e rubrica. 4) Preencha feedback estruturado (pontos fortes, melhorias, nota por critério). 5) Publique: o aluno é notificado.',
    'alunos': 'Em /app/mentor você vê a lista de alunos designados: nome, fase, progresso, última atividade. Clique no aluno para detalhar.',
    'mentoria': 'Agende sessões quinzenais em /app/mentor/mentoria. Registre anotações pós-sessão e avalie soft skills. Sessões podem ser individuais ou em grupo.',
    'default': 'Resposta de exemplo (modo demo). Como mentor, você pode perguntar sobre fila de revisão, agendamento de mentoria, avaliação de soft skills ou alunos designados.'
  },
  instructor: {
    'video': 'Para cadastrar vídeo-aula: 1) Acesse /app/admin/aulas. 2) Clique "Nova aula". 3) Preencha título, fase, módulo, YouTube Video ID (11 caracteres) e descrição. 4) Salve como rascunho. 5) O sistema valida o ID via oEmbed + YouTube Data API. 6) Publique quando aprovado.',
    'presenca': 'Para marcar presença: 1) Acesse /app/ao-vivo. 2) Clique na sua sessão. 3) Use o botão "Marcar presença" para cada aluno. Só sessões próprias.',
    'alunos': 'Em /app/alunos você consulta (via RPC limitada): nome, fase, progresso, última atividade. Não acessa e-mail, CPF, mentor, matrícula nem audit_log.',
    'default': 'Resposta de exemplo (modo demo). Como instrutor, pergunte sobre cadastro de vídeo-aula, aula ao vivo, marcação de presença ou consulta de alunos.'
  },
  admin: {
    'promover': 'Para promover a Mentor/Instrutor: 1) Acesse /app/admin ou /app/equipe. 2) Use a RPC segura de promoção (auditada). 3) Informe user_id e novo papel. Só Admin executa.',
    'bolsa': 'Códigos de turma e bolsa são gerados em /app/admin. Defina quantidade, validade e regras. Aplicados no checkout.',
    'suporte': 'Em /app/admin/suporte você vê todos os pedidos de ajuda humana. Filtre por status (open, in_progress, closed), busque por usuário/assunto. Abra/feche pedidos. Notificação in-app ao chegar novo.',
    'default': 'Resposta de exemplo (modo demo). Como admin, pergunte sobre promoção de papéis, códigos de bolsa, gestão de squads, suporte ou métricas gerais.'
  },
  visitor: {
    'preco': 'A definir com a Altius. Para informações sobre valores e planos, entre em contato pelo WhatsApp: +55 41 98713-2450 ou cadastre-se para receber novidades.',
    'turma': 'A definir com a Altius. Datas de início das próximas turmas não estão publicadas. WhatsApp: +55 41 98713-2450.',
    'programa': 'O Directio é um programa de 12 meses em 4 fases (Explorar, Desenvolver, Aplicar, Decolar) baseado nas 6 competências do WEF. Inclui: trilhas personalizadas, mentoria quinzenal, simulações de entrevista, dashboard de competências, projetos reais na Fase 3 e comunidade exclusiva.',
    'inscricao': 'Para se inscrever, clique em "Garanta sua vaga" no header ou acesse /checkout. Também pode tirar dúvidas pelo WhatsApp: +55 41 98713-2450.',
    'default': 'Resposta de exemplo (modo demo, visitante). Perguntas sobre preço, datas ou vaga: "A definir com a Altius" + WhatsApp. Fatos do programa: 4 fases, 6 competências WEF, mentoria quinzenal, simulações, projetos reais, comunidade.'
  }
};

function getDemoResponse(role, message) {
  const lower = message.toLowerCase();
  const responses = DEMO_RESPONSES[role] || DEMO_RESPONSES.visitor;
  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return responses.default;
}

export const assistantApi = {
  isConfigured() {
    return !DEMO_MODE && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
  },

  async sendMessage({ message, history = [], route = '/', screenTitle = '', signal }) {
    if (DEMO_MODE) {
      // Simulate streaming for demo mode
      const role = 'student'; // Would come from auth context in real implementation
      const response = getDemoResponse(role, message);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = response.split(' ');
          for (let i = 0; i < words.length; i++) {
            const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', text: chunk })}\n\n`));
            await new Promise(r => setTimeout(r, 30));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done', outputTokens: response.length })}\n\n`));
          controller.close();
        }
      });
      return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
    }

    if (!this.isConfigured()) {
      throw new Error('Assistente ainda não configurado. Configure as variáveis de ambiente ou ative VITE_DEMO_MODE.');
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const authToken = localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token');

    const response = await fetch(`${FUNCTION_URL}/assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : '',
        'apikey': anonKey,
      },
      body: JSON.stringify({ message, history, route, screenTitle }),
      signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
      if (response.status === 429) {
        throw new Error(error.error || 'Limite atingido. Tente novamente mais tarde.');
      }
      if (response.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      if (response.status === 403) {
        throw new Error(error.error || 'Acesso negado.');
      }
      throw new Error(error.error || `Erro ${response.status}`);
    }

    return response;
  },

  async createSupportRequest({ subject, message, route, role }) {
    if (DEMO_MODE) {
      return { id: 'demo-' + Date.now(), status: 'open' };
    }
    if (!this.isConfigured()) throw new Error('Não configurado');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const authToken = localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token');

    const response = await fetch(`${supabaseUrl}/rest/v1/support_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'apikey': anonKey,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ subject, message, route, role }),
    });

    if (!response.ok) throw new Error('Falha ao criar pedido de suporte');
    return response.json();
  },

  async sendFeedback({ rating, comment, route }) {
    if (DEMO_MODE) return { id: 'demo-feedback-' + Date.now() };
    if (!this.isConfigured()) throw new Error('Não configurado');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const authToken = localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token');

    const response = await fetch(`${supabaseUrl}/rest/v1/assistant_feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'apikey': anonKey,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ rating, comment, route }),
    });

    if (!response.ok) throw new Error('Falha ao enviar feedback');
    return response.json();
  },
};

export const suggestedQuestions = {
  student: [
    'Como funciona a mentoria quinzenal?',
    'Onde vejo meu progresso nas competências WEF?',
    'Como envio uma atividade para revisão?',
    'O que acontece na Fase 3 (projetos reais)?',
  ],
  mentor: [
    'Como faço uma revisão de entrega estruturada?',
    'Onde vejo os alunos designados a mim?',
    'Como agendo uma mentoria em grupo?',
  ],
  instructor: [
    'Como cadastro uma vídeo-aula do YouTube?',
    'Como marco presença na minha aula ao vivo?',
    'O que posso ver dos alunos na minha RPC?',
  ],
  admin: [
    'Como promovo um usuário a Mentor?',
    'Onde gero códigos de bolsa/turma?',
    'Como fecho um pedido de suporte?',
  ],
  visitor: [
    'O que inclui o programa?',
    'Quanto custa o programa?',
    'Quando começa a próxima turma?',
    'Como faço para me inscrever?',
  ],
};