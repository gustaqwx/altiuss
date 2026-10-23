# Implementação da plataforma Altius Directio

## O que está implementado

- Landing preservada em `/` e checkout em `/checkout`.
- Rotas autenticadas `/app/*` com navegação por papel: Aluno, Mentor, Instrutor e Admin.
- Login, cadastro de Aluno, Apple OAuth e recuperação de senha via adaptador Supabase Auth. Sem configuração, login e cadastro ficam bloqueados.
- Demo local, persistida no navegador, ativada apenas por `VITE_DEMO_MODE=true` em desenvolvimento. Inclui os quatro perfis, atividades, entregas, feedback, aulas e sessões de exemplo rotuladas. Não é autenticação real e não é habilitada em produção.
- Jornada com as fases e itens descritos em `docs/directio-produto.md`; enunciados, critérios e prazos não documentados mostram “A definir com a Altius”.
- Envio de texto/link, histórico de versões, revisão, pedido de ajustes, feedback na atividade, notificações, registro de mentoria, telas de administração e presença.
- Cadastro e player YouTube com allowlist de hosts e parser de ID. O banco recebe apenas `youtube_video_id`; o formulário consulta a Edge Function `verify-youtube` para verificar `status.embeddable` e `status.privacyStatus`. Sem verificação conclusiva, só salva rascunho.
- Aulas ao vivo `meeting` e `youtube_live`, hora exibida em `America/Sao_Paulo`, estado cancelado e vínculo posterior de gravação.
- Migration inicial em `supabase/migrations/202610210001_platform.sql` e testes de políticas em `supabase/tests/rls_roles.test.sql`.

## Rodar o protótipo local

1. Instale dependências com `npm install`.
2. Copie `.env.example` para `.env` e defina `VITE_DEMO_MODE=true`.
3. Rode `npm run dev` e abra `/login`. A faixa “Modo demonstração, dados de exemplo” identifica os registros de demonstração.
4. Os dados locais ficam no `localStorage`; use o botão “Sair” e escolha outro papel na tela de login para validar os fluxos. Limpar os dados do site restaura os dados iniciais de exemplo.

Os IDs `DEMOEXEMP01` a `DEMOEXEMP04` são sintéticos e não correspondem a vídeos reais. A sala da reunião demo usa `example.com`, sem reunião real.

## Conectar Supabase

O código não inclui URL, chave pública ou projeto Supabase da Altius. Para habilitar dados reais:

1. Instale/use Supabase CLI, configure seu projeto e aplique migrations com `supabase db push` (ou `supabase db reset` num ambiente local descartável).
2. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no `.env` da aplicação. A chave `anon` é pública; não coloque `service_role` ou chaves privadas em variáveis `VITE_*`.
3. Configure os redirects do Supabase Auth para `/auth/callback`. Para Apple, configure o provedor Apple no painel Supabase e suas credenciais/callbacks do lado servidor.
4. Cadastre a primeira conta de equipe e atribua o primeiro papel Admin uma única vez por operação privilegiada no Supabase, registrando o bootstrap conforme o processo de auditoria da Altius. Depois disso, promoções usam `rpc/promote_user`, que valida Admin e grava em `audit_log`.
5. Para verificar incorporação de vídeo, configure `YOUTUBE_DATA_API_KEY` como segredo de Edge Function e publique `supabase/functions/verify-youtube`. Sem essa chave a função obtém título/miniatura quando possível, mas não marca o vídeo como verificável; salve como rascunho.
6. Rode `supabase test db` num projeto local descartável para executar os testes RLS com papéis autenticados.

A migration liga RLS e usa RPCs `SECURITY DEFINER` com `search_path` fixo para promover usuários, servir as listas de alunos, registrar presença, enviar atividades, revisar entregas e gravar mentoria. A RPC de Instrutor retorna só nome, fase, progresso e última atividade. O instrutor não tem leitura direta de perfis de outras pessoas.

## Antes de alunos reais

Não use dados reais até configurar e validar Supabase Auth, enrollment, policies, RPCs e os testes RLS com usuários por papel. Guards React e a sidebar são navegação, não barreira de segurança. Não há upload de arquivo configurado; a tela informa que storage está “A definir com a Altius”.

A Altius precisa definir finalidade e base legal, aviso de privacidade/transparência, dados mínimos, prazos de retenção e descarte, atendimento aos direitos dos titulares, responsáveis/controladores e contratos com fornecedores. Também precisa definir proteção de menores quando aplicável, processo de backup/recuperação, quem administra credenciais e como tratar incidentes. Esta é uma lista operacional, não parecer jurídico.

## Limitações conhecidas

- O banco/migration e função Edge estão versionados, mas não foram aplicados num projeto da Altius; Auth real, Apple e dados reais dependem de credenciais e configuração externa.
- `supabase` CLI e `psql` não estão instalados neste checkout, então os testes de RLS foram criados mas não executados aqui.
- O modo demo simula persistência e permissões para revisão de interface; somente RLS real protege dados.
- A verificação do YouTube não garante que o próprio YouTube vá reproduzir o vídeo: restrições de conta, direitos autorais e disponibilidade podem bloquear o player posteriormente.
