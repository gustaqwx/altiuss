# CLAUDE.md: Altius Directio

Frontend da plataforma **Altius Directio**, programa de capacitação em tecnologia da Altius Inteligência em Negócios. Este arquivo orienta o Claude Code (e qualquer assistente) a trabalhar no projeto de forma consistente.

Leia também: `directio-produto.md` (documento do produto, fonte dos fatos).

## O produto em 3 linhas

- Programa de 12 meses com 4 fases: Explorar, Desenvolver, Aplicar, Decolar.
- Currículo baseado nas 6 competências do Future of Jobs Report 2025 (WEF).
- Público: estudantes e novos talentos de TI, mais os mentores que os acompanham.

## Stack

- React + Tailwind CSS + Lucide React
- Idioma da interface e do código-fonte de conteúdo: **português do Brasil**
- Nomes de variáveis, funções e arquivos: inglês

> Comandos de instalação, dev, build e lint: confirmar no `package.json` e registrar aqui assim que o projeto estiver criado.

## Estrutura sugerida

```
src/
  components/     # componentes pequenos e reutilizáveis
  pages/          # landing, login/registro, jornada do aluno, painel do mentor
  content/        # textos do site em arquivos próprios (nada de texto solto nos componentes)
  lib/            # modelo de domínio, utilitários e adaptadores
```

## Escopo do MVP

Dentro:
- Jornada do aluno (4 fases, entregas por fase)
- Avaliações e feedback de mentores
- Controle de acesso por perfil (Aluno, Mentor, Instrutor e Admin)
- Login/registro por e-mail e Apple
- Aulas com vídeos incorporados do YouTube e aulas ao vivo
- Terminal retrátil no rodapé com logs simulados

Fora (não implementar, não sugerir como "quick win"):
- Quadro de vagas
- Contato com empresas
- Envio de desafios pela plataforma (v2; por ora é por e-mail)

## Design

Referência: Linear, Vercel e Stripe. O resultado não pode parecer "site gerado por IA".

- Fundo escuro `#090d16`, bordas finas de 1px, tipografia limpa.
- Cor apenas para status, notas e ação primária.
- Evitar: glows e neon, glassmorphism, excesso de ícones, cards idênticos em série, buzzwords, terminal decorativo (o terminal retrátil existe, mas é funcional e discreto).
- Estética e tom de voz devem seguir altiusinteligencia.com.
- Para estrutura de plataforma e jornada em etapas, a referência é boranatech.com.br.

## Regras de conteúdo

- Fatos do programa vêm de `directio-produto.md`. Não inventar números, depoimentos, logos, preços, carga horária ou parceiros.
- Dados de exemplo na interface (notas, progresso, logs) devem ser claramente rotulados como exemplo.
- Os números 85%, +40% e 6 meses vêm do site oficial sem fonte citada; usar apenas onde o site já os usa.
- Nomes das fases e competências devem seguir exatamente a grafia do documento do produto.

## Convenções de código

- Componentes funcionais com hooks, um componente por arquivo.
- Tailwind para estilo; sem CSS solto, salvo tokens globais.
- Acessibilidade: HTML semântico, foco visível, contraste AA, respeitar `prefers-reduced-motion`.
- Mobile first.
- Sem dependências novas sem necessidade clara; se for adicionar, explicar o motivo.

## Como trabalhar aqui

- Antes de mudanças grandes, resumir o plano em poucas linhas.
- Mudanças pequenas e focadas; não refatorar código fora do pedido.
- Se algo do pedido conflitar com o escopo do MVP ou com as regras de design, avisar antes de implementar.
- Ao terminar, listar o que mudou e qualquer suposição feita.

## Contatos do produto

- WhatsApp: +55 41 98713-2450
- LinkedIn: linkedin.com/company/altius-inteligência

## Decisões de planejamento (atualizam o escopo acima)

- A plataforma é a experiência principal: `/` encaminha para `/app` quando há sessão e para `/login` sem sessão. A página pública do programa fica em `/programa`, o checkout em `/checkout` e as áreas autenticadas por perfil em `/app/*`. Cada papel abre sua página inicial contextual em `/app`; o Instrutor vê apenas os dados limitados previstos para seu perfil.
- Perfis: `student` (Aluno), `mentor` (Mentor), `instructor` (Instrutor) e `admin` (Admin). Cadastro sempre cria Aluno. Só Admin promove a Mentor ou Instrutor por RPC segura com checagem de papel e registro em `audit_log`.
- Admin tem acesso completo à área. Instrutor pode administrar aulas e sessões ao vivo que criou, marcar presença nas próprias sessões e consultar alunos apenas por RPC limitada a nome, fase, progresso e última atividade. Não pode consultar e-mails, mentores, matrícula, `audit_log`, promover pessoas ou editar vínculos. As rotas `/app/admin/aulas`, `/app/ao-vivo` e `/app/alunos` aceitam Admin e Instrutor; `/app/admin`, `/app/mentores` e `/app/equipe` são exclusivas do Admin. Guards e sidebar só orientam navegação; RLS/RPC no servidor garantem segurança.
- Supabase/Postgres é a arquitetura do projeto. O código inclui integração REST/Auth, migration inicial, RLS e RPCs `SECURITY DEFINER` com `search_path` fixo em `supabase/`; ainda é necessário aplicar tudo num projeto Supabase da Altius e executar os testes RLS. Nunca expor `service_role` no cliente.
- Sem URL e chave pública Supabase, login, cadastro, Apple e recuperação permanecem bloqueados com aviso de indisponibilidade. O cadastro real cria Aluno pelo trigger do servidor. O modo demo só é habilitado por `VITE_DEMO_MODE=true` fora de produção; dados e permissões locais são exemplos e não protegem dados reais.
- Antes de alunos reais: configurar autenticação e autorização no servidor, testar RLS com sessões dos papéis reais e definir tratamento LGPD (finalidade/base legal, transparência, minimização, segurança, retenção/descarte, direitos dos titulares e responsabilidades dos fornecedores; atenção especial a menores).
- Vídeo: hospedagem própria continua fora do escopo; exibir vídeos incorporados do YouTube está dentro. Usar allowlist em `src/config/video.js`, validar o ID de 11 caracteres e persistir somente `youtube_video_id`; nunca persistir nem renderizar o link colado. Player em `src/features/lessons/YouTubePlayer.jsx`, montado a partir do ID. Instrutor cadastra rascunhos/publicações; alunos e mentores leem somente aulas publicadas. Conclusão da aula é manual.
- A verificação tenta oEmbed e, quando configurada, a Edge Function `supabase/functions/verify-youtube` consulta a YouTube Data API para `status.embeddable` e `status.privacyStatus`. Sem verificação conclusiva, avisar e permitir somente rascunho. oEmbed sozinho não comprova incorporação. Playback ainda pode ser bloqueado pelo YouTube.
- Formulários e conteúdo administrativo em `src/content/admin.js` instruem a subir o vídeo no canal Altius como “Não listado”, ativar “Permitir incorporação” e não publicar conteúdo confidencial: qualquer pessoa com o link pode assistir/compartilhar.
- Aulas ao vivo suportam `meeting` (URL HTTPS externa) e `youtube_live` (ID YouTube incorporado sem chat). Horários devem exibir explicitamente `America/Sao_Paulo`; usuários autenticados e matriculados acessam links/players. Sessões canceladas continuam visíveis como canceladas. Admin ou Instrutor dono pode vincular gravação cadastrada; Instrutor marca presença apenas em sessão própria.
- Dados de exemplo já incluídos no modo demo: perfil Instrutor, três vídeo-aulas com IDs sintéticos claramente rotulados, uma sessão `meeting` e uma `youtube_live`; sem link de sala real nem conteúdo apresentado como oficial.
- Página pública `/programa`: CTA "Garanta sua vaga" (leva a /checkout); a seção de estatísticas (85%, +40%, 6 meses) foi removida a pedido do cliente. Botão Login do header é controlado por `showLogin` em `src/content/landing.js`.
- Pendências com a Altius, antes de publicar a landing: respostas de preço, formato, turma e processo seletivo para o WhatsApp.
- Em aberto: conteúdo do terminal com alunos reais, configuração de Auth/Apple, projeto e ambientes Supabase, credenciais/Edge Function do YouTube, campos completos da visão Admin, operação de presença e política de dados/consentimento LGPD.
- Paleta: direção B (violeta-grafite), ver `docs/design-plan.md`; tokens em `tailwind.config.js` (ink, night, accent, signal, snow, mute).
- Estrutura: páginas em `src/pages` (Landing, Checkout), seções da landing em `src/features/landing` (convertidas do HTML aprovado; textos ficam no JSX de cada seção), animações em `useLandingMotion.js` (GSAP, com limpeza ao sair da página), rotas em `src/App.jsx`, constantes em `src/config/site.js`. CSS do notebook 3D e dos botões em `src/styles/landing.css`; tokens de cor em `tailwind.config.js`.
- Etapa 1 concluída: landing portada, selo "Directio" removido do header, "Garanta sua vaga" leva a `/checkout` (não abre mais o WhatsApp). `/checkout` hoje só informa "Pagamento ainda não disponível".
- Etapa 2 concluída (checkout): `/checkout` (e `/checkout?plano=<id>`) tem 3 passos (dados, pagamento, revisão), PIX e cartão só como interface e confirmação bloqueada enquanto faltar valor ou provedor. Valor e planos ficam em `src/config/offer.js` (hoje sem preço e sem planos: nada é exibido como oficial). Pagamento passa por `src/features/checkout/gateway.js` (adaptador; hoje "não configurado"); o frontend envia só o id do produto, o servidor deve recalcular o valor. Campos de cartão: trocar pelos do provedor (tokenização); nunca guardar número ou CVV. Débito e boleto: incluir em `PaymentStep.jsx`. Seção de planos: `src/features/pricing/Pricing.jsx`, só aparece com planos em `offer.js`; seletor mensal/anual só se houver preços anuais confirmados.
- Pendente no checkout: valor do programa, provedor, backend que cria a cobrança e recebe a confirmação, termos e política de privacidade (LGPD), CPF e demais dados exigidos pelo provedor. Variáveis públicas em `.env.example` (`VITE_PAYMENT_PROVIDER`); chaves secretas só no backend.
- Etapa 3 (autenticação e rotas): `src/features/auth/api.js` usa Supabase Auth por REST para e-mail/senha, cadastro como Aluno, Apple OAuth, recuperação e atualização de senha. Demo Aluno/Mentor/Instrutor/Admin é separada por `VITE_DEMO_MODE`. A sidebar e rotas por papel estão em `src/pages/Platform.jsx` e `src/App.jsx`; os guards continuam apenas navegação. O header controla o link por `showLogin` em `src/content/landing.js`.
- Antes de tratar dados de alunos reais, definir base legal e finalidade, coletar apenas o necessário, informar os titulares, aplicar controles de acesso e segurança, definir retenção e descarte, viabilizar os direitos dos titulares e formalizar responsabilidades com fornecedores. Avaliar proteção específica se houver menores de idade e o melhor interesse da criança/adolescente. Esta lista é requisito de planejamento, não parecer jurídico.
- Etapas de plataforma implementadas no código: (b, c, d, e) jornada/atividades, entregas e versões, aulas YouTube, revisão/feedback, mentoria, Admin/Instrutor, notificações e aulas ao vivo. Migrações, adaptadores e teste de RLS ficam em `supabase/`; testes não executados neste checkout porque Supabase CLI/Postgres não estão instalados. Storage de arquivos permanece como adaptador não configurado, sinalizado na tela.
- Modelo de dados documentado em `docs/implementacao-plataforma.md` e implementado em `src/lib/model.js` + migration SQL. Configure `.env` conforme `.env.example`; para revisar telas sem backend, use `VITE_DEMO_MODE=true`. Antes de alunos reais, executar `supabase test db`, validar credenciais, Apple e dados/obrigações LGPD.
- Deploy: como há rotas de SPA em `/checkout` e `/app/*`, o servidor precisa devolver `index.html` para esses caminhos (já há `public/_redirects` para Netlify).
- Comandos: `npm install`, `npm run dev`, `npm run build`.

## Hero e notebook 3D
- `src/features/landing/Hero.jsx` tem título, texto, botão e `<Laptop />`. Os chips "Programa de 12 meses" e "Baseado no Future of Jobs Report do WEF" foram removidos; agora há um chip único "4 fases · 6 competências WEF". Não há mais faixa de números.
- `src/features/landing/Laptop.jsx` + `src/styles/laptop.css`: notebook em CSS 3D (sem WebGL) e 4 cartões flutuantes. Medidas nas variáveis de `.pc-scene` (`--w`, `--lh`, `--d`, `--y`); `#pc` e `.pc-tilt` são ganchos de `useLandingMotion.js` (rotação no scroll, inclinação com ponteiro). Ângulo inicial igual no CSS (`#pc`) e no `gsap.fromTo`.
- Conteúdo da tela e dos cartões só usa fatos do site (4 fases, 6 competências WEF, mentoria quinzenal, projeto real fase 3). Dados rotulados como "exemplo". Sem números inventados, avatares ou logos.
- Brilho azul-marinho atrás do notebook é exceção local à paleta (pedido do cliente); restante da página sem gradiente decorativo.
- Regras mobile dos cartões (`.fc-*`) devem vir depois das posições base.
- **Especificação do notebook (TASK 2):**
  - Proporção 16:10; tampa com borda chanfrada e brilho de aresta; moldura da tela fina e uniforme; câmera visível; dobradiça visível; base com espessura real.
  - Teclado com teclas em relevo (sem legendas ou mínimas); trackpad; grelhas de alto-falante; pés de borracha; sombra de contato no chão; reflexo suave na tela.
  - Materiais em grafite e prata neutros. EXCEÇÃO: gradiente permitido apenas como sombreamento de material dentro do notebook, sutil e neutro, nunca colorido.
  - Tela: réplica estática da interface da plataforma (sidebar, jornada 4 fases, lista de trilha/aula, linha de status). Texto legível no tamanho renderizado.
  - Movimento: tampa abre com scroll; notebook inclina de leve com ponteiro; reflexo acompanha. Easing natural, sem rebote.
  - Opcional com fallback estático: tela percorre 4 fases no scroll.
  - `prefers-reduced-motion`: pose final estática, sem rotação nem troca automática.
  - 4 cartões: manter função, refinar alinhamento/hierarquia/conteúdo concreto (só fatos). Sem ícones decorativos. Não cobrem texto do hero em nenhuma largura.
  - Impacto: notebook maior no desktop, perspectiva e sombra para profundidade, contraste forte contra #090d16.
  - Performance: sem imagens pesadas nem blur grande. Animar só `transform` e `opacity`; `will-change` só durante animação; sem layout shift (reservar altura). Não piorar LCP.
  - Acessibilidade: notebook decorativo (`aria-hidden`); nenhuma informação exclusiva só nele ou nos cartões.
  - Mobile: versão simplificada (ângulo fixo, 3D leve), sem barra horizontal. Testar 360px e 1280px.

## Benefícios e ordem das seções (v3 — NotchedCard)
- A ordem das seções em `src/pages/Landing.jsx` segue o menu do `Header.jsx`: Programa (hero), Competências, Roadmap, Benefícios; o Pricing só aparece com planos e fica depois de Benefícios. Ao adicionar uma seção, ajuste os dois lugares e o mapa do scrollspy em `useLandingMotion.js`.
- Componente: `src/features/landing/NotchedCard.jsx` (um por arquivo, usa Lucide ArrowUpRight). `Benefits.jsx` consome com array `BENEFITS` (6 itens, ordem por importância: Trilhas, Mentoria, Simulações, Dashboard, Projetos, Comunidade). Cada item tem: `cover` (visual HTML/CSS, aria-hidden, fatos reais), `badge`, `title`, `description`, `labels` (máx 2), `href` (âncora real da landing ou null → article sem link/seta/cursor).
- Estilo em `src/styles/benefits.css`: grid uniforme 1/2/3 colunas (gap 32px, 48px entre linhas desktop), fundo da seção `var(--ink)` sólido/liso, cards `var(--night)` com border 1px `var(--line)`.
- **Geometria do entalhe** (constantes no topo do NotchedCard.jsx): `DISC=64px` (disco da seta, único `rounded-full` permitido), `BLOCK=80px` (bloco do entalhe), `FILLET=48px` (border-top-left-radius = BLOCK - DISC/2), `CONCORD=28px` (quadrados de concordância com radial-gradient transparente dentro / superfície fora), `CAP_RADIUS=24px` (raio da capa — exceção registrada).
- **Exceções registradas:**
  - Raio grande (24px) SOMENTE na capa e no entalhe deste card. Badge e rótulos usam raio pequeno único do projeto (6px), nunca pílula.
  - Gradiente: único permitido é o `radial-gradient` técnico da concordância do entalhe (transparent dentro de 28px, superfície fora). Nenhum gradiente decorativo.
- **Covers (fatos reais, grafite/neutro, cor só status):**
  - Trilhas: timeline 4 fases (Explorar, Desenvolver, Aplicar, Decolar)
  - Mentoria: 6 marcas quinzenais (dots alternados)
  - Simulações: 2 barras (live coding, fit cultural) com valores "A definir"
  - Dashboard: 6 critérios WEF com barras e "A definir"
  - Projetos: 3 entregas de exemplo (rotuladas "Exemplo")
  - Comunidade: 8 blocos squads heterogêneos (sem avatares/rostos)
- **Interação:** `@media (hover: hover)` — cover escala 1.04 em 500ms (entalhe NÃO escala); disco `var(--signal)` +5% + translate(2px,-2px). Stretched link pattern (`::after` no link cobre o card). Foco visível = mesmo efeito. Cards sem `href` não têm disco, sem cursor pointer, sem hover de botão.
- **Entrada:** `ScrollTrigger.batch('.ben-card')` em `useLandingMotion.js` (fade+subida escalonados, `clearProps: 'transform,opacity'`). `prefers-reduced-motion`: sem reveal, sem escala, sem transição.
- **Acessibilidade:** seção com h2, lista semântica `role="list"`, article por card, stretched link (nome acessível = título), focus-visible anel `var(--signal)`, visuais `aria-hidden`, info também em texto, contraste AA, touch targets 44px, zoom 200% sem quebrar, sem layout shift.
- Os números 01/ a 06/ e o parallax foram removidos (não são uma sequência).

## Assistente de IA (Assistente Directio)

### Visão geral
Assistente integrado à plataforma para ajudar Alunos, Mentores, Instrutores e Admins com dúvidas de uso, e versão restrita para visitantes da landing.

### Arquivos principais
- `src/content/assistant-knowledge.md` — Base de conhecimento (fatos do programa, passos por tela, glossário, problemas comuns, contatos)
- `supabase/functions/assistant/index.ts` — Edge Function (JWT, streaming Anthropic, rate limits, contexto servidor)
- `supabase/migrations/20261023000001_create_assistant_tables.sql` — Tabelas: `assistant_usage`, `support_requests`, `assistant_feedback` (RLS em todas)
- `src/features/assistant/api.js` — Adaptador (real/demo/unconfigured), sugestões por perfil
- `src/features/assistant/` — Componentes: `AssistantButton`, `AssistantPanel`, `MessageList`, `MessageBubble`, `Composer`, `SuggestedQuestions`, `HandoffForm`, `FeedbackButtons`
- `src/styles/assistant.css` — Estilos do painel (desktop lateral 420px, mobile full-screen)

### Integração
- `PlatformLayout.jsx`: botão "Ajuda" no topbar (todos perfis logados)
- `Header.jsx` (landing): botão discreto no canto inferior direito quando `flags.ASSISTANT_PUBLIC=true`
- `config/site.js`: `flags.ASSISTANT_PUBLIC` (default false)

### Edge Function (supabase/functions/assistant)
- Verifica JWT. Sem login: 401 (exceto modo visitante). Aluno só com matrícula ativa; equipe com papel ativo.
- Lê `ANTHROPIC_API_KEY` de segredo. Modelo em `ASSISTANT_MODEL` (default `claude-sonnet-5-5`, alt `claude-haiku-5-5`). `max_tokens` 600, `temperature` 0.2.
- Streaming SSE com cancelamento. CORS restrito à origem.
- Validação: máx 1000 chars/mensagem, máx 10 turnos histórico, campos permitidos.
- Contexto do servidor (nunca do cliente): `role`, `route`, `screenTitle`. Sem nome, e-mail, entregas, notas, anotações.
- Sem ferramentas de escrita/leitura de banco. Só texto.
- Rate limits configuráveis (env): msgs/hora/dia por usuário, tokens/dia por usuário, teto global/dia. 429 com mensagem clara + opção ajuda humana. Alerta em 80% do teto global.
- Logs só metadados (usuário, hora, tokens, erro). Conteúdo NÃO salvo.

### Tabelas (RLS)
- `assistant_usage(user_id, day, request_count, input_tokens, output_tokens)` — função escreve; usuário lê próprio; admin lê agregado.
- `support_requests(id, user_id, role, route, subject, message, status, created_at, closed_at)` — usuário cria/lê próprio; admin lê todas e muda status.
- `assistant_feedback(id, user_id, rating, comment, route, created_at)` — usuário cria/lê próprio; admin lê agregado.

### Segurança
- Prompt de sistema versionado com regras de escopo, anti-injeção (dados não confiáveis), identidade IA.
- Renderização: Markdown mínimo próprio (parágrafos, listas, negrito). NUNCA `dangerouslySetInnerHTML`. Links só https + `rel="noopener noreferrer"`.
- Chave Anthropic NUNCA no frontend/bundle (grep `ANTHROPIC|sk-ant|service_role` em `src` e `dist` = zero).
- Rate limit por usuário e IP, body limit, timeout 30s, erro sem vazar detalhes.

### Interface
- Painel: lateral desktop (~420px), full-screen mobile. Header fixo com disclaimer.
- Primeira abertura: aviso privacidade curto + link `/privacidade` + botão "Entendi" (ciência em sessionStorage v1.0).
- Sugestões por perfil (3-4) de `suggestedQuestions` no `api.js`.
- Histórico só sessionStorage (try/catch); botão "Limpar conversa"; Esc fecha.
- Texto 16px, rótulos ≥13px, alvos 44px, foco visível, contraste AA, mobile first. Tokens do `tailwind.config.js` (ink, night, accent, signal, snow, mute, line). Sem gradiente, glow, emoji.
- Acessibilidade: `role="dialog" aria-modal`, foco preso + devolvido ao botão; streaming em `aria-live="polite"` anuncia mensagem COMPLETA ao terminar; estado "digitando" em texto; botão Parar; `prefers-reduced-motion` respeitado.
- Estados: carregando, erro rede, limite atingido, indisponível, sem matrícula ativa. Em erro: opção ajuda humana.

### Ajuda humana
- Botão "Falar com uma pessoa" no rodapé do painel e em respostas de recusa/incerteza.
- `HandoffForm`: assunto + mensagem (1000 chars) → `support_requests` + mostra WhatsApp +55 41 98713-2450.
- Admin: tela `/app/admin/suporte` com tabela (filtro status, busca, abrir/fechar). Notificação in-app ao Admin.

### Visitante (landing)
- Controlado por `ASSISTANT_PUBLIC` (config + função). Default desligado.
- Ligado: só fatos públicos, sem conteúdo de aula/conta, limite rígido por IP, sem histórico, CTA cadastro/WhatsApp.
- Preço/vaga: "A definir com a Altius" + contato.

### Feedback
- Polegar up/down por resposta + comentário opcional → `assistant_feedback`. Admin vê agregados. Texto da conversa NÃO salvo.

### LGPD (atualizado em legal.js)
- Seção 14 na Política de Privacidade: finalidade, base legal (interesse legítimo), processador (Anthropic), dados enviados, não retenção de conteúdo, transferência internacional [a validar], retenção metadados [a definir], o não enviar, direitos.
- Marca como minuta; sem texto jurídico final.

### Testes
- `supabase/tests/`: RLS (sem login não chama; aluno sem matrícula não usa; usuário lê só próprio; admin lê todas; limites aplicados).
- `docs/assistente/avaliacao.md`: ≥30 casos injeção (ignorar regras, pedir prompt, dados de outro, fazer atividade, preço não definido, fora escopo, sofrimento, HTML, 5000 chars) + script roda casos contra função/demo.
- Interface: abrir/fechar, foco, Esc, teclado, leitor tela, 360/1280px, reduced-motion, demo, unconfigured.
