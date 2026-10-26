# 04 :  Personas e histórias de usuário

> **Status:** hipóteses de trabalho. Não representam pessoas entrevistadas nem resultados de pesquisa. Validar, ajustar ou descartar após as entrevistas de `03-entrevistas.md`.

## 1. Personas hipotéticas

As descrições abaixo usam somente os perfis e tarefas esperadas. Não atribuem idade, localização, formação específica, comportamento observado ou resultado profissional a pessoas reais.

### Persona hipotética PH-01 :  Aluno em jornada

- **Perfil:** participante do Altius Directio.
- **Objetivo a validar:** compreender fase atual, encontrar conteúdo e concluir atividades com próximos passos claros.
- **Necessidades possíveis:** trilha/atividade acessível, critérios e prazo visíveis, histórico de versões e feedback no contexto da atividade.
- **Riscos a investigar:** fase, progresso e critérios podem ser interpretados de modo diferente pela equipe e pelo aluno.
- **Requisitos ligados:** RF-01, RF-06 a RF-16, RF-18; RNF-03 a RNF-05.

### Persona hipotética PH-02 :  Mentor

- **Perfil:** profissional que acompanha participantes do programa.
- **Objetivo a validar:** revisar entregas de alunos associados e manter continuidade do acompanhamento.
- **Necessidades possíveis:** fila de revisão, critérios, contexto da entrega, registro de mentoria e feedback consultável.
- **Riscos a investigar:** volume de revisão, atribuições, confidencialidade e expectativa de resposta ainda não foram pesquisados.
- **Requisitos ligados:** RF-11 a RF-16; RN-05 a RN-07; RNF-01 e RNF-08.

### Persona hipotética PH-03 :  Admin do programa

- **Perfil:** usuário autorizado a administrar papéis e vínculos na plataforma.
- **Objetivo a validar:** manter acessos e associações corretos e consultar uma visão geral operacional.
- **Necessidades possíveis:** ações administrativas restritas, confirmação de mudanças e registro de auditoria.
- **Riscos a investigar:** não foi definido quem recebe esse papel, quais dados podem consultar ou como são tratadas correções.
- **Requisitos ligados:** RF-04, RF-17; RN-01 e RN-05; RNF-01 e RNF-08.

### Persona hipotética PH-04 :  Instrutor

- **Perfil:** professor com papel `instructor`, autorizado a criar e manter aulas que criou e sessões ao vivo próprias.
- **Objetivo a validar:** publicar conteúdo e conduzir aulas sem acesso a dados administrativos ou pessoais desnecessários dos alunos.
- **Necessidades possíveis:** editor de aulas YouTube, agenda, chamada/presença e lista de alunos limitada a nome, fase, progresso e última atividade.
- **Limites obrigatórios:** não vê e-mail, mentor, situação de matrícula ou `audit_log`; não promove usuários, associa mentores ou altera matrícula.
- **Riscos a investigar:** fluxo de publicação, detalhes necessários à chamada e acesso a uma gravação vinculada ainda não foram pesquisados.
- **Requisitos ligados:** RF-28 a RF-37; RN-10 a RN-16; RNF-01, RNF-02, RNF-10 e RNF-11.

### Persona hipotética PH-05 :  Equipe Altius

- **Perfil:** pessoas responsáveis por conteúdo, operação e governança do programa.
- **Objetivo a validar:** manter programa e plataforma alinhados, sem presumir que todo membro da equipe terá acesso administrativo.
- **Necessidades possíveis:** definir conteúdo, critérios, regras de privacidade e indicadores apropriados.
- **Riscos a investigar:** papéis internos e responsabilidades de tratamento de dados não estão definidos nos materiais disponíveis.
- **Requisitos ligados:** RF-06 a RF-18; RNF-01 a RNF-09.

## 2. Histórias de usuário

Prioridades são uma proposta MoSCoW sujeita à validação da Altius. Cada tela indicada é especificada no arquivo [05-prototipacao.md](05-prototipacao.md). Estados e regras que dependem de decisão estão marcados como **A definir com a Altius**.

### Épico EP-01 :  Acesso e perfis

#### US-01 :  Criar conta como aluno

- **História:** Como pessoa ingressante, quero criar uma conta com e-mail para acessar a jornada Directio como Aluno.
- **Aceite:** **Dado** que o serviço de autenticação está disponível e os dados são válidos, **quando** concluo o cadastro, **então** a conta é persistida com papel Aluno e posso iniciar sessão.
- **Borda:** **Dado** que o serviço não está configurado, **quando** acesso o cadastro, **então** o sistema informa a indisponibilidade e não simula criação de conta.
- **Prioridade:** Must. **Requisito:** RF-01, RN-01. **Tela:** TELA-02. **Status no código:** Implementado no adaptador; cadastro real depende de Supabase configurado.

#### US-02 :  Entrar e recuperar acesso

- **História:** Como usuário cadastrado, quero entrar por e-mail ou Apple e iniciar recuperação de senha quando necessário, para acessar minha conta.
- **Aceite:** **Dado** um provedor configurado, **quando** envio credenciais válidas ou solicito recuperação, **então** o provedor executa a operação e a aplicação apresenta resultado sem expor segredos.
- **Borda:** **Dado** que o serviço não está configurado, **quando** tento login, Apple ou recuperação, **então** vejo a indisponibilidade e nenhuma sessão fictícia é criada.
- **Prioridade:** Must. **Requisito:** RF-02, RF-03. **Tela:** TELA-02. **Status no código:** Parcial :  telas/rotas e adapter interface existem, ações reais estão bloqueadas.

#### US-03 :  Acessar demonstração por papel

- **História:** Como pessoa avaliando o protótipo, quero escolher Aluno, Mentor ou Admin na demonstração, para inspecionar o esqueleto de cada área.
- **Aceite:** **Dado** que `VITE_DEMO_MODE=true` em ambiente não produtivo, **quando** escolho um papel e entro, **então** a sessão está identificada como exemplo e as rotas no frontend aplicam a restrição de papel configurada.
- **Borda:** **Dado** um build de produção ou demo desativada, **quando** tento entrar em modo demo, **então** o simulador não está disponível.
- **Prioridade:** Must para validação do protótipo. **Requisito:** RF-04, RF-05, RN-09. **Tela:** TELA-02, TELA-03. **Status no código:** Parcial :  quatro perfis e fluxos frontend existem; segurança real depende de aplicar/testar RLS.

#### US-04 :  Bloquear rota sem permissão

- **História:** Como usuário, quero que a navegação me leve a uma área autorizada, para não abrir telas de outro papel por engano.
- **Aceite:** **Dado** que não tenho sessão, **quando** abro uma rota `/app/*`, **então** sou encaminhado ao login; **dado** que tenho papel insuficiente, **quando** abro uma rota restrita, **então** sou encaminhado a uma área permitida.
- **Prioridade:** Must. **Requisito:** RF-04, RNF-01. **Tela:** TELA-02, TELA-03, TELA-08, TELA-12. **Status no código:** Parcial :  guards client-side existem; não autorizam acesso a dados no servidor.

### Épico EP-02 :  Jornada e estudo

#### US-05 :  Entender fase e próximos passos

- **História:** Como Aluno, quero ver as quatro fases, minha fase atual, meu progresso e o que vem a seguir, para orientar minha jornada.
- **Aceite:** **Dado** um plano e progresso definidos, **quando** abro a jornada, **então** vejo Explorar (meses 1 a 2), Desenvolver (3 a 5), Aplicar (6 a 9), Decolar (10 a 12), fase atual e próximos itens.
- **Borda:** **Dado** que fase ou progresso não foi definido, **quando** abro a jornada, **então** a interface informa “A definir com a Altius” sem inventar um estado.
- **Prioridade:** Must. **Requisito:** RF-07, RF-14. **Tela:** TELA-03. **Status no código:** Implementado :  jornada e progresso individual; competências demonstrativas são rotuladas como exemplo.

#### US-06 :  Encontrar trilha, módulo e aula

- **História:** Como Aluno, quero navegar pela trilha atribuída, seus módulos e aulas, para estudar na sequência definida para mim.
- **Aceite:** **Dado** que a trilha está publicada e associada ao meu plano, **quando** abro a trilha, **então** vejo módulos e aulas disponíveis; itens sem conteúdo mostram “A definir com a Altius”.
- **Prioridade:** Must. **Requisito:** RF-06. **Tela:** TELA-04, TELA-05. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-07 :  Registrar progresso de estudo

- **História:** Como Aluno, quero retomar uma aula e consultar meu progresso, para acompanhar o que já percorri.
- **Aceite:** **Dado** que existe uma regra aprovada de progresso, **quando** concluo ou retomo uma aula, **então** o estado salvo segue essa regra e aparece na trilha.
- **Borda:** **Dado** que o salvamento falha, **quando** saio da aula, **então** recebo indicação de erro e não vejo progresso não persistido como concluído.
- **Prioridade:** Should. **Requisito:** RF-06, RF-07. **Tela:** TELA-04, TELA-05. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

### Épico EP-03 :  Atividades e entregas

#### US-08 :  Consultar enunciado e critérios

- **História:** Como Aluno, quero consultar enunciado, critérios e prazo de uma atividade, para saber o que é esperado.
- **Aceite:** **Dado** que a atividade está cadastrada, **quando** abro seus detalhes, **então** vejo os campos disponíveis; itens sem definição são marcados “A definir com a Altius”.
- **Prioridade:** Must. **Requisito:** RF-08. **Tela:** TELA-06. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-09 :  Enviar entrega válida

- **História:** Como Aluno, quero enviar texto e/ou link como uma versão da entrega, para submeter meu trabalho à revisão.
- **Aceite:** **Dado** que a atividade permite envio e o conteúdo não está vazio, **quando** confirmo o envio, **então** uma versão imutável é registrada com data e a entrega passa ao estado definido.
- **Borda :  envio vazio:** **Dado** que texto, link e arquivo estão vazios, **quando** tento enviar, **então** o sistema informa que preciso incluir uma evidência e não cria uma versão.
- **Borda :  prazo vencido:** **Dado** que o prazo está vencido, **quando** tento enviar, **então** a plataforma aplica a política de atraso definida pela Altius ou informa “A definir com a Altius”; não inventa bloqueio, penalidade ou nota.
- **Prioridade:** Must. **Requisito:** RF-08, RF-09; RN-02 a RN-04. **Tela:** TELA-06. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-10 :  Consultar histórico e reenviar após ajustes

- **História:** Como Aluno, quero consultar minhas versões e criar uma nova após receber pedido de ajustes, para preservar o histórico do trabalho.
- **Aceite:** **Dado** que há versões anteriores, **quando** abro o histórico, **então** consigo distinguir as versões sem alterá-las; **dado** um pedido de ajustes, **quando** envio nova versão, **então** ela fica vinculada à atividade e aguarda revisão.
- **Prioridade:** Must. **Requisito:** RF-09, RF-10, RF-13; RN-02 e RN-03. **Tela:** TELA-06. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-11 :  Trabalhar em entrega de squad

- **História:** Como integrante de squad, quero saber qual atividade é coletiva e quais participantes têm acesso à entrega, para colaborar conforme as regras do programa.
- **Aceite:** **Dado** um squad e atividade configurados, **quando** consulto a atividade, **então** vejo os participantes e a regra de autoria/avaliação publicada.
- **Borda:** **Dado** que composição ou autoria não foi definida, **quando** abro a entrega, **então** vejo “A definir com a Altius” em vez de uma regra presumida.
- **Prioridade:** Should. **Requisito:** RF-11, RN-05. **Tela:** TELA-07. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

### Épico EP-04 :  Revisão, feedback e competências

#### US-12 :  Revisar fila de entregas

- **História:** Como Mentor, quero ver entregas pendentes apenas de alunos associados a mim, para organizar minhas revisões.
- **Aceite:** **Dado** que tenho papel Mentor e vínculos válidos, **quando** abro a fila, **então** vejo somente entregas autorizadas com estado e data de envio.
- **Borda :  sem permissão:** **Dado** que não tenho vínculo com o aluno, **quando** tento abrir a entrega, **então** o servidor nega a leitura e a interface informa que não tenho acesso.
- **Prioridade:** Must. **Requisito:** RF-04, RF-12; RN-05, RNF-01. **Tela:** TELA-08. **Status no código:** Implementado :  fila e revisão disponíveis no frontend e demo; backend remoto pendente.

#### US-13 :  Avaliar critérios e devolver feedback

- **História:** Como Mentor, quero avaliar critérios e escrever comentários, para orientar o próximo passo do aluno.
- **Aceite:** **Dado** uma entrega autorizada e critérios publicados, **quando** concluo a revisão, **então** salvo avaliações e comentários ligados à versão avaliada e escolho aprovar ou pedir ajustes.
- **Borda:** **Dado** que faltam critérios ou a escala não foi definida, **quando** abro a revisão, **então** a plataforma informa “A definir com a Altius” e não calcula nota inventada.
- **Prioridade:** Must. **Requisito:** RF-12 e RF-13; RN-06. **Tela:** TELA-09. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-14 :  Consultar feedback

- **História:** Como Aluno, quero ler feedback e avaliações na atividade correspondente, para entender o resultado e agir sobre ajustes.
- **Aceite:** **Dado** feedback publicado na minha entrega, **quando** abro a atividade, **então** vejo comentários e critérios vinculados à versão; se há ajustes pedidos, posso criar nova versão.
- **Prioridade:** Must. **Requisito:** RF-13; RN-02, RN-06. **Tela:** TELA-06. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-15 :  Acompanhar competências

- **História:** Como Aluno, quero consultar o progresso nas seis competências do programa, para entender quais evidências já foram registradas.
- **Aceite:** **Dado** que há avaliações válidas, **quando** abro o painel, **então** vejo as seis competências com dados e método de leitura definidos; competências sem avaliação aparecem sem progresso fabricado.
- **Prioridade:** Should. **Requisito:** RF-14. **Tela:** TELA-03. **Status no código:** Parcial :  competências têm progresso demonstrativo; método real A definir com a Altius.

### Épico EP-05 :  Mentoria e simulação

#### US-16 :  Registrar mentoria quinzenal

- **História:** Como Mentor, quero registrar a data e anotações da mentoria, para manter continuidade do acompanhamento.
- **Aceite:** **Dado** um aluno associado, **quando** salvo data e anotações, **então** o registro fica vinculado ao aluno/mentor e visível apenas conforme permissão definida.
- **Borda:** **Dado** que não tenho permissão para o aluno, **quando** tento registrar ou consultar, **então** o servidor nega a operação.
- **Prioridade:** Must. **Requisito:** RF-15; RN-05, RN-07. **Tela:** TELA-10. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-17 :  Registrar feedback da simulação de entrevista

- **História:** Como avaliador autorizado, quero registrar feedback estruturado de uma simulação com live coding e fit cultural, para que o aluno consulte a devolutiva.
- **Aceite:** **Dado** que o formato e critérios foram definidos pela Altius, **quando** salvo feedback, **então** os critérios e comentários ficam vinculados à simulação e acessíveis ao aluno autorizado.
- **Borda:** **Dado** que critérios ou formato não foram definidos, **quando** tento registrar avaliação, **então** campos indefinidos aparecem como “A definir com a Altius”.
- **Prioridade:** Should. **Requisito:** RF-16, RF-18. **Tela:** TELA-11. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

### Épico EP-06 :  Administração e notificações

#### US-18 :  Promover usuário a Mentor ou Instrutor

- **História:** Como Admin, quero promover um usuário a Mentor ou Instrutor por operação segura, para habilitar apenas as permissões do novo papel.
- **Aceite:** **Dado** que estou autenticado como Admin, **quando** invoco a RPC autorizada para `mentor` ou `instructor`, **então** o servidor valida meu papel, aplica a mudança e registra a ação em `audit_log`.
- **Borda :  sem permissão:** **Dado** que sou Aluno ou Mentor, **quando** tento promover um usuário, **então** o servidor nega a operação.
- **Prioridade:** Must. **Requisito:** RF-04, RF-17; RN-01, RNF-01, RNF-08. **Tela:** TELA-12. **Status no código:** Implementado em UI e RPC; backend remoto depende de migration aplicada.

#### US-19 :  Associar Mentor a Aluno

- **História:** Como Admin, quero associar um Mentor a um Aluno, para definir quem pode acompanhar e revisar suas entregas.
- **Aceite:** **Dado** que ambos existem e o Mentor está ativo, **quando** salvo a associação, **então** a regra fica persistida, registrada e aplicada pelo servidor às consultas.
- **Prioridade:** Must. **Requisito:** RF-17; RN-05, RNF-01, RNF-08. **Tela:** TELA-12. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-20 :  Consultar visão geral administrativa

- **História:** Como Admin, quero consultar uma visão geral do programa, para acompanhar associações e pendências conforme as permissões aprovadas.
- **Aceite:** **Dado** que possuo papel Admin, **quando** abro a visão geral, **então** vejo somente os dados definidos para essa função, com estados vazios e erros identificáveis.
- **Prioridade:** Must. **Requisito:** RF-17. **Tela:** TELA-12. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-21 :  Receber aviso de feedback

- **História:** Como Aluno, quero receber uma notificação in-app quando chega feedback, para abrir a entrega relacionada.
- **Aceite:** **Dado** que feedback foi publicado, **quando** consulto notificações, **então** vejo um aviso ligado à atividade e posso abri-la; o estado de leitura segue a regra aprovada.
- **Prioridade:** Should. **Requisito:** RF-18. **Tela:** TELA-13. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-22 :  Consultar terminal de demonstração

- **História:** Como pessoa avaliando a demonstração, quero abrir o terminal retrátil com logs de exemplo, para entender as ações simuladas sem confundi-las com eventos reais.
- **Aceite:** **Dado** modo demo ativo, **quando** abro o terminal, **então** vejo logs claramente rotulados como exemplo; sem demo, ele não se apresenta como registro real de produção.
- **Prioridade:** Could. **Requisito:** RF-05 e RF-19; RN-09. **Tela:** TELA-14. **Status no código:** Parcial :  `<details>` e logs estáticos estão em `src/pages/AppHome.jsx`.

### Épico EP-07 :  Continuidade do projeto público

#### US-23 :  Manter checkout acessível

- **História:** Como visitante da landing, quero acessar `/checkout`, para continuar o fluxo público que já existe no projeto.
- **Aceite:** **Dado** que estou na landing, **quando** aciono a chamada de checkout ou abro `/checkout`, **então** a rota continua disponível e informa claramente quando pagamento ainda não está configurado.
- **Prioridade:** Must para preservar o site. **Requisito:** RF-20. **Tela:** TELA-01, TELA-15. **Status no código:** Parcial :  rota/interface existem; pagamento não está disponível sem configuração.

### Épico EP-08 :  Conteúdo instrucional e vídeo-aulas

#### US-24 :  Criar e manter vídeo-aula própria

- **História:** Como Instrutor, quero criar rascunho, editar e ordenar vídeo-aulas que criei, para disponibilizar conteúdo autorizado aos alunos.
- **Aceite:** **Dado** que sou Instrutor autenticado, **quando** crio/edito uma aula, **então** o servidor salva `created_by` como meu usuário e permite apenas operações nas minhas aulas; Admin pode administrar qualquer aula.
- **Borda:** **Dado** que tento editar aula de outro Instrutor, **quando** salvo, **então** RLS nega a operação. Exclusão requer confirmação e é registrada conforme regra de auditoria.
- **Prioridade:** Must. **Requisito:** RF-28, RN-11. **Tela:** TELA-16. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-25 :  Validar link YouTube e salvar rascunho

- **História:** Como Instrutor, quero colar link YouTube aceito, para pré-preencher dados da aula e revisar o vídeo antes de publicar.
- **Aceite:** **Dado** um host allowlist e formato aceito, **quando** colo `watch?v=`, `youtu.be/`, `shorts/` ou `embed/`, **então** o parser valida ID de 11 caracteres, busca título/miniatura e só persiste o ID. A URL digitada não é exibida nem guardada.
- **Borda:** **Dado** que o oEmbed/consulta não responde ou não é conclusivo, **quando** salvo, **então** vejo “não foi possível verificar” e só posso salvar como rascunho. O backend tenta Edge Function quando disponível.
- **Prioridade:** Must para validação e rascunho. **Requisito:** RF-29, RF-30; RN-13, RN-17. **Tela:** TELA-16. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-26 :  Assistir aula publicada

- **História:** Como Aluno matriculado, quero assistir a vídeo-aula publicada na página da aula, para estudar o conteúdo associado à minha trilha.
- **Aceite:** **Dado** que a aula está publicada e autorizada, **quando** a abro, **então** o player é montado a partir do ID validado; se não carregar, vejo aviso e link “Assistir no YouTube”.
- **Borda:** **Dado** rascunho ou ausência de matrícula/acesso, **quando** tento abrir, **então** o servidor nega a leitura. Ao término do vídeo, o sistema apenas destaca “Marcar como concluída”; não conclui sozinho.
- **Prioridade:** Must. **Requisito:** RF-26, RF-31, RF-38; RN-12, RN-13, RN-16. **Tela:** TELA-05. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

### Épico EP-09 :  Aulas ao vivo

#### US-27 :  Agendar e gerenciar aula ao vivo

- **História:** Como Instrutor, quero criar e editar aula ao vivo que criei, para informar modalidade, horário e estado aos alunos matriculados.
- **Aceite:** **Dado** que crio `meeting`, **quando** informo URL HTTPS e horário, **então** `meeting_url` é preenchido e ID YouTube fica nulo; **dado** `youtube_live`, **então** ID é preenchido e URL de meeting fica nula.
- **Borda:** **Dado** Admin, **quando** edito qualquer sessão, **então** a operação é permitida; **dado** Instrutor, **quando** edito sessão alheia, **então** RLS nega. Cancelada permanece listada como cancelada.
- **Prioridade:** Must. **Requisito:** RF-32, RF-33; RN-11, RN-14, RN-18. **Tela:** TELA-18. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-28 :  Participar da aula ao vivo

- **História:** Como Aluno matriculado, quero entrar em sessão agendada ou assistir transmissão autorizada, para participar da aula ao vivo.
- **Aceite:** **Dado** que estou autenticado e matriculado, **quando** abro uma sessão `meeting`, **então** vejo “Entrar na aula”; para `youtube_live`, vejo o player sem chat incorporado e, antes do horário, “A transmissão começa em dd/mm às hh:mm”. Horários são apresentados em `America/Sao_Paulo`.
- **Borda:** **Dado** sessão cancelada, **quando** consulto a lista, **então** ela permanece visível como cancelada e não oferece entrada como se estivesse ativa. Sem matrícula, o servidor nega acesso ao link/player.
- **Prioridade:** Must. **Requisito:** RF-33; RN-14, RN-16, RN-18. **Tela:** TELA-19. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-29 :  Marcar presença e vincular gravação

- **História:** Como Instrutor dono da aula, quero marcar presença e depois associar uma aula gravada, para registrar acompanhamento da sessão.
- **Aceite:** **Dado** uma sessão criada por mim, **quando** marco presença, **então** somente alunos autorizados da sessão são atualizados; depois, posso vincular uma vídeo-aula já cadastrada.
- **Borda:** **Dado** outra sessão, **quando** tento registrar presença ou alterar a gravação, **então** RLS nega; Admin pode executar operações autorizadas em qualquer sessão.
- **Prioridade:** Should. **Requisito:** RF-32, RF-34; RN-11, RN-14. **Tela:** TELA-18, TELA-19. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

### Épico EP-10 :  Lista instrucional e navegação por papel

#### US-30 :  Consultar lista limitada de alunos

- **História:** Como Instrutor, quero consultar alunos com nome, fase, progresso e última atividade, para acompanhar minhas aulas sem acessar dados administrativos.
- **Aceite:** **Dado** que estou autenticado como Instrutor, **quando** uso a RPC de lista, **então** recebo somente os quatro campos permitidos; leitura direta de `profiles`, e-mail, Mentor, matrícula e `audit_log` é negada.
- **Prioridade:** Must. **Requisito:** RF-35; RN-15, RN-16. **Tela:** TELA-17. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

#### US-31 :  Navegar apenas pelas áreas do papel

- **História:** Como usuário, quero ver somente rotas disponíveis ao meu papel, para localizar ferramentas permitidas.
- **Aceite:** **Dado** que sou Instrutor, **quando** consulto a sidebar, **então** vejo aulas, ao vivo e alunos e não vejo visão geral completa, mentores ou equipe; Admin vê áreas administrativas autorizadas.
- **Borda:** **Dado** que digito rota não autorizada, **quando** navego diretamente, **então** o frontend encaminha a rota e o servidor/RLS ainda nega dados/operação.
- **Prioridade:** Must. **Requisito:** RF-36; RNF-01, RNF-10. **Tela:** todas as áreas autenticadas. **Status no código:** Implementado no frontend; RLS remota pendente de aplicação/testes.

#### US-32 :  Apresentar dados de demonstração do Instrutor

- **História:** Como pessoa que valida o protótipo, quero acessar um Instrutor e exemplos claramente rotulados de vídeo-aulas e sessões ao vivo, para entender os fluxos sem confundir dados fictícios com dados do programa.
- **Aceite:** **Dado** modo demo ativo fora de produção, **quando** acesso dados de exemplo, **então** vejo um Instrutor, três IDs YouTube sintéticos, uma sessão `meeting` e uma `youtube_live`, todos identificados como exemplo e sem links de sala reais.
- **Borda:** **Dado** modo demo desligado/produção, **quando** abro a plataforma, **então** fixtures demo não são carregadas.
- **Prioridade:** Should. **Requisito:** RF-37; RN-09. **Tela:** TELA-02, TELA-16 a TELA-19. **Status no código:** Implementado no frontend/demo; Supabase remoto pendente.

## 3. Suposições e lacunas

- Todas as personas são hipóteses de tarefa e precisam ser validadas com pessoas dos perfis correspondentes.
- Histórias que dependem de prazos, escalas, critérios, composição de squads, papéis internos, fluxo de aprovação ou visibilidade devem permanecer bloqueadas para especificação final até decisão da Altius.
- Histórias planeadas não significam que a tela ou a API exista. O status foi conferido em `src/` e nos documentos disponíveis.
- Não há requisitos para chat, videochamada, hospedagem de vídeo, editor de código, quadro de vagas ou contato com empresas na plataforma.
