# Especificação da Plataforma Directio

Esta pasta reúne a especificação inicial de produto e interação da plataforma Altius Directio. O conteúdo separa fatos dos documentos do programa, requisitos solicitados, hipóteses a validar e comportamento realmente encontrado no código.

## Ordem de leitura

1. [00: Rastreabilidade, perguntas abertas e glossário](00-rastreabilidade.md): visão geral dos IDs, matriz, nomes lógicos de dados, perguntas consolidadas e inconsistências.
2. [01: Levantamento de requisitos](01-levantamento-requisitos.md): contexto, perfis, requisitos, prioridades, regras, restrições e dependências.
3. [02: Mapeamento de processos](02-mapeamento-processos.md): AS-IS limitado às evidências e proposta TO-BE.
4. [03: Entrevistas](03-entrevistas.md): plano, roteiros abertos, modelos em branco e texto de consentimento a validar.
5. [04: Personas e histórias](04-personas-e-historias.md): personas hipotéticas, histórias e critérios de aceite.
6. [05: Prototipação](05-prototipacao.md): mapa de telas, estados, navegação, wireframes e acesso ao demo existente.

## Convenções

- IDs `RF-xx`, `RNF-xx`, `RN-xx`, `US-xx` e `TELA-xx` são referências estáveis desta versão. Ao alterar o escopo, manter os IDs existentes e reservar novos IDs sem reaproveitar os removidos.
- **Implementado**, **Parcial**, **Planejado** e **Fora do escopo** descrevem a situação encontrada no checkout atual; não são promessas nem prioridades.
- **Hipótese a validar** identifica proposta ou interpretação sem pesquisa/decisão confirmada.
- **A definir com a Altius** identifica decisão, conteúdo ou política que depende da equipe do programa.
- O pedido atual especifica Supabase/Postgres, Auth, RLS e RPCs como arquitetura. Isso não significa que o backend já esteja implantado: o repositório contém migration, políticas, testes e funções RPC; ainda não há projeto Supabase da Altius configurado nem deployment confirmado.
- Propostas de tela/rota podem não existir no frontend. Consulte a coluna de status em `05-prototipacao.md`.

## Base consultada

- `CLAUDE.md` na raiz do projeto.
- `docs/directio-produto.md` e demais documentos em `docs/`.
- Código atual em `src/`, inclusive rotas, autenticação demo, landing e checkout.
- Instruções de plataforma recebidas pelo usuário nesta conversa.

O documento do programa é a fonte para fases, períodos, itens curriculares e competências. Detalhes de operação não descritos foram deixados como perguntas. As especificações de Instrutor, YouTube, aulas ao vivo e RLS refletem o ajuste mais recente do usuário e foram implementadas no frontend/migration; deployment e teste no Supabase permanecem pendentes.

## O que esta especificação não confirma

- Que o processo AS-IS foi pesquisado ou validado com alunos, mentores ou equipe.
- Que as funcionalidades listadas como Planejadas estão implementadas.
- Que o backend já foi implantado na conta da Altius. Auth real, RLS e RPCs só ficam ativos após configuração e aplicação da migration.
- Que critérios/pesos, prazos, indicadores, formato de mentoria ou regras de squads foram validados.
- Que os protótipos futuros representam uma decisão final de design.

Leia `00-rastreabilidade.md` para a lista consolidada de perguntas em aberto e os pontos de diferença entre o código, os documentos existentes e as informações do programa.

### Suposições e lacunas deste índice

- A sequência proposta começa pela rastreabilidade para dar contexto dos IDs; a equipe pode ler `01` primeiro se precisar de uma narrativa de requisitos.
- Os documentos refletem o projeto e os materiais disponíveis no momento da escrita; alterações posteriores devem ser reconciliadas com a matriz e as referências de status.
- `instructor` é um papel distinto e restrito; a lista de alunos deve ser servida por RPC com apenas nome, fase, progresso e última atividade.
- RF-26 foi atualizado: hospedar vídeos continua fora do escopo, enquanto incorporar vídeos do YouTube está dentro do escopo.
