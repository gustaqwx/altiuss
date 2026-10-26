export const legalContent = {
  privacy: {
    title: 'Política de Privacidade',
    lastUpdated: '2026-10-23',
    sections: [
      {
        heading: '1. Quem somos',
        body: 'A Altius Inteligência em Negócios ("Altius", "nós", "nosso"), inscrita no CNPJ sob o nº 00.000.000/0001-00, com sede em Curitiba, Paraná, é a controladora dos seus dados pessoais no programa Altius Directio. Para assuntos de privacidade, entre em contato pelo e-mail: privacidade@altiusinteligencia.com.',
      },
      {
        heading: '2. Quais dados coletamos e por quê',
        body: 'Coletamos apenas o estritamente necessário para operar a plataforma e cumprir nossas obrigações legais, conforme as bases legais da LGPD (Lei nº 13.709/2018).',
        items: [
          { label: 'Dados de cadastro (base legal: execução de contrato / consentimento)', value: 'Nome completo, e-mail, senha (hash), CPF (quando exigido para emissão de nota fiscal ou certificação).' },
          { label: 'Dados de perfil do aluno (base legal: execução de contrato / interesse legítimo)', value: 'Fase atual, trilha escolhida, progresso nas competências, entregas e notas, registro de presença em sessões ao vivo, preferências de notificação.' },
          { label: 'Dados de mentoria e feedback (base legal: execução de contrato)', value: 'Agendamentos, anotações do mentor, avaliações de soft skills, relatórios de simulação de entrevista.' },
          { label: 'Dados técnicos e de uso (base legal: interesse legítimo / obrigação legal)', value: 'Endereço IP, tipo de navegador, páginas visitadas, tempo de sessão, logs de erro (anonimizados sempre que possível).' },
          { label: 'Dados de pagamento (base legal: execução de contrato / obrigação legal)', value: 'Processados exclusivamente pelo provedor de pagamentos (Stripe, Mercado Pago ou outro). Não armazenamos número de cartão, CVV nem dados bancários completos. Guardamos apenas o token de pagamento, status da transação e dados necessários para nota fiscal.' },
        ],
      },
      {
        heading: '3. Para que usamos seus dados',
        items: [
          'Viabilizar seu acesso à plataforma e ao programa de capacitação (12 meses, 4 fases).',
          'Personalizar trilhas de aprendizado com base no assessment inicial.',
          'Gerenciar mentorias, simulações de entrevista, projetos reais e dashboard de competências.',
          'Emitir certificados, comprovantes de conclusão e notas fiscais quando aplicável.',
          'Comunicar avisos de aulas ao vivo, prazos de entrega, feedback de mentor e atualizações do programa.',
          'Garantir segurança, prevenir fraude e cumprir obrigações legais e regulatórias (LGPD, Código de Defesa do Consumidor, legislação tributária).',
          'Melhorar a usabilidade e a performance da plataforma (dados agregados e anonimizados).',
        ],
      },
      {
        heading: '4. Compartilhamento de dados',
        body: 'Não vendemos seus dados. Compartilhamos apenas nas hipóteses abaixo:',
        items: [
          'Provedor de autenticação (Supabase) e provedor de pagamento — apenas o necessário para o serviço, sob contratos com cláusulas de proteção de dados (DPA).',
          'Mentores e instrutores designados — acesso restrito aos dados da sua turma/atividade (nome, fase, progresso, entregas). Não acessam e-mail, CPF, dados de pagamento ou logs de auditoria.',
          'Empresas parceiras de projeto real (Fase 3) — apenas nome e portfólio técnico autorizados por você, mediante termo de consentimento específico.',
          'Autoridades competentes — quando exigido por lei, ordem judicial ou requisição administrativa fundamentada.',
        ],
      },
      {
        heading: '5. Transferência internacional',
        body: 'Nossos provedores de nuvem (Supabase, Vercel, provedor de pagamentos) podem processar dados fora do Brasil. Exigimos cláusulas contratuais padrão (SCCs) ou adequação reconhecida pela ANPD. Ao usar a plataforma, você consente com essa transferência nos termos descritos.',
      },
      {
        heading: '6. Retenção e descarte',
        items: [
          'Dados de cadastro e contrato: mantidos enquanto a conta estiver ativa e por 5 anos após o encerramento (prazo prescricional civil e tributário).',
          'Dados de progresso, entregas e feedback: mantidos por 2 anos após a conclusão do programa para emissão de certificados e histórico acadêmico.',
          'Logs técnicos e de segurança: mantidos por 12 meses, salvo investigação de incidente.',
          'Dados de marketing (se você optar por receber): até revogação do consentimento.',
          'Após os prazos, os dados são anonimizados ou excluídos de forma segura.',
        ],
      },
      {
        heading: '7. Seus direitos (Art. 18 da LGPD)',
        body: 'Você pode, a qualquer momento, solicitar:',
        items: [
          'Confirmação de tratamento e acesso aos seus dados.',
          'Correção de dados incompletos, inexatos ou desatualizados.',
          'Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.',
          'Portabilidade dos dados a outro fornecedor (mediante requisição expressa).',
          'Eliminação dos dados tratados com consentimento, exceto nas hipóteses do Art. 16 da LGPD.',
          'Informação sobre entidades com quem compartilhamos seus dados.',
          'Informação sobre a possibilidade de não fornecer consentimento e as consequências.',
          'Revogação do consentimento (quando a base legal for consentimento), sem prejuízo do tratamento realizado antes da revogação.',
        ],
      },
      {
        heading: '8. Como exercer seus direitos',
        body: 'Envie sua solicitação para privacidade@altiusinteligencia.com com o assunto "LGPD — Direitos do Titular". Responderemos em até 15 dias, conforme Art. 19 da LGPD. Poderemos pedir comprovação de identidade para garantir a segurança dos seus dados.',
      },
      {
        heading: '9. Segurança',
        items: [
          'Autenticação com senha hashing (bcrypt) e opção de login com Apple (OAuth 2.0).',
          'HTTPS em toda a aplicação, HSTS, CSP e headers de segurança.',
          'Controle de acesso baseado em papel (RLS no banco, guards no frontend).',
          'Logs de auditoria imutáveis para ações administrativas (promoção de papel, exclusão de dados).',
          'Backups criptografados com retenção controlada e testes de restauração periódicos.',
        ],
      },
      {
        heading: '10. Menores de idade',
        body: 'O programa destina-se a maiores de 18 anos. Caso identifiquemos cadastro de menor, solicitaremos autorização do responsável legal ou procederemos à exclusão dos dados, observando o melhor interesse da criança/adolescente (Art. 14 da LGPD e ECA).',
      },
      {
        heading: '11. Cookies e tecnologias similares',
        body: 'Usamos cookies estritamente necessários (sessão, autenticação, segurança, preferências de acessibilidade). Não usamos cookies de publicidade ou rastreamento cross-site. Você pode gerenciar cookies pelo navegador; a desativação dos essenciais impedirá o funcionamento da plataforma.',
      },
      {
        heading: '12. Alterações desta política',
        body: 'Atualizaremos esta página sempre que houver mudança material no tratamento de dados. A versão vigente terá a data de "Última atualização" no topo. Mudanças significativas serão comunicadas por e-mail e/ou banner na plataforma com antecedência razoável.',
      },
      {
        heading: '13. Contato do Encarregado (DPO)',
        body: 'Encarregado de Proteção de Dados: Altius Inteligência em Negócios\nE-mail: privacidade@altiusinteligencia.com\nTelefone: +55 41 98713-2450',
      },
      {
        heading: '14. Assistente de IA (Assistente Directio)',
        body: 'A plataforma oferece um assistente de IA opcional para suporte e orientação sobre o uso do programa.',
        items: [
          'Finalidade: responder dúvidas sobre a plataforma, explicar conceitos das aulas, ajudar a destravar problemas técnicos comuns e encaminhar para atendimento humano quando necessário.',
          'Base legal: interesse legítimo (Art. 7º, IX, LGPD) para suporte ao usuário e execução do contrato.',
          'Processador: Anthropic (EUA) via API — provedor do modelo de linguagem Claude. Dados transitam pela Edge Function no Supabase (EUA/Brasil).',
          'Dados enviados: apenas o texto da mensagem do usuário, papel (perfil), rota atual e título da tela/aula. NÃO são enviados: nome, e-mail, CPF, entregas, notas, anotações de mentoria, dados de pagamento ou qualquer identificador direto.',
          'Retenção do conteúdo: o texto das conversas NÃO é armazenado no servidor. Apenas metadados de uso (contagem de requisições, tokens de entrada/saída, horário, códigos de erro) são registrados para controle de limites e monitoramento.',
          'Transferência internacional: os dados transitam para os EUA (Anthropic, Supabase). Cláusulas contratuais padrão (SCCs) aplicáveis. [A validar com o jurídico: adequação final da transferência].',
          'Retenção de metadados: [A definir com a Altius].',
          'O que NÃO enviar ao assistente: senhas, CPF, dados bancários, dados de saúde, segredos industriais, informações sensíveis de terceiros.',
          'Direitos do titular: aplicam-se os direitos do Art. 18 da LGPD. Para exercê-los, contate privacidade@altiusinteligencia.com.',
        ],
      },
    ],
  },
  terms: {
    title: 'Termos de Uso',
    lastUpdated: '2026-10-23',
    sections: [
      {
        heading: '1. Aceitação',
        body: 'Ao acessar ou usar a plataforma Altius Directio ("plataforma"), você concorda com estes Termos de Uso ("Termos"), com a Política de Privacidade e com as leis aplicáveis. Se não concordar, não use a plataforma.',
      },
      {
        heading: '2. Descrição do serviço',
        body: 'O Altius Directio é um programa de capacitação em tecnologia de 12 meses, dividido em 4 fases (Explorar, Desenvolver, Aplicar, Decolar), com currículo baseado nas 6 competências do Future of Jobs Report 2025 (WEF). A plataforma oferece: trilhas personalizadas, simulações de processos seletivos, mentoria com profissionais de mercado, dashboard de evolução de competências, projetos aplicados com empresas parceiras e comunidade exclusiva.',
      },
      {
        heading: '3. Elegibilidade e cadastro',
        items: [
          'Você deve ter 18 anos ou mais e capacidade civil plena.',
          'O cadastro cria uma conta de Aluno. Perfis de Mentor, Instrutor e Admin são atribuídos exclusivamente por Administrador via RPC auditada.',
          'Você é responsável pela veracidade dos dados informados e pela guarda da senha.',
          'Não é permitido compartilhar credenciais ou permitir uso por terceiros.',
        ],
      },
      {
        heading: '4. Pagamentos e preços',
        items: [
          'Valores, planos, formas de pagamento (PIX, cartão de crédito/débito) e eventuais bolsas são definidos em src/config/offer.js e divulgados no checkout antes da contratação.',
          'O pagamento é processado por provedor terceirizado certificado (PCI DSS). Não armazenamos dados sensíveis de cartão.',
          'Reembolsos seguem a política divulgada no checkout e o Código de Defesa do Consumidor (Lei nº 8.078/1990).',
          'Em caso de inadimplência, o acesso à plataforma pode ser suspenso até a regularização, sem prejuízo dos dados já gerados.',
        ],
      },
      {
        heading: '5. Propriedade intelectual',
        items: [
          'Conteúdo da plataforma (textos, vídeos, materiais didáticos, código, design, marcas) é de propriedade da Altius ou licenciado a ela.',
          'Vídeos incorporados do YouTube pertencem aos respectivos canais; a Altius apenas os organiza no currículo.',
          'Você recebe licença pessoal, intransferível e revogável para acessar o conteúdo durante a vigência da matrícula.',
          'É vedado: copiar, distribuir, gravar tela, engenharia reversa, remover marcas d\'água ou usar o conteúdo para fins comerciais sem autorização prévia por escrito.',
        ],
      },
      {
        heading: '6. Condutas vedadas',
        items: [
          'Usar a plataforma para fins ilícitos, ofensivos, discriminatórios ou que violem direitos de terceiros.',
          'Tentar acessar áreas restritas, burlar autenticação, explorar vulnerabilidades ou interferir na integridade do sistema.',
          'Enviar spam, phishing, malware ou qualquer código malicioso.',
          'Assediar mentores, instrutores, colegas ou equipe da Altius.',
          'Compartilhar sua conta, credenciais ou materiais de acesso restrito.',
        ],
      },
      {
        heading: '7. Suspensão e encerramento',
        items: [
          'A Altius pode suspender ou encerrar sua conta mediante aviso prévio de 7 dias em caso de violação destes Termos, ou imediatamente se houver risco à segurança ou ordem judicial.',
          'Você pode solicitar o encerramento a qualquer momento pelo e-mail privacidade@altiusinteligencia.com. Dados serão tratados conforme a seção "Retenção e descarte" da Política de Privacidade.',
          'O encerramento não isenta de obrigações financeiras pendentes.',
        ],
      },
      {
        heading: '8. Isenção de garantias e limitação de responsabilidade',
        items: [
          'A plataforma é fornecida "no estado em que se encontra" e "conforme disponibilidade". Não garantimos ausência de erros, interrupções ou compatibilidade com todo hardware/software.',
          'A Altius não se responsabiliza por: (a) decisões de carreira baseadas no programa; (b) resultado de processos seletivos externos; (c) conteúdo de terceiros (YouTube, links de parceiros); (d) danos indiretos, lucros cessantes ou perda de dados, exceto por dolo ou culpa grave.',
          'Nossa responsabilidade total, se houver, limita-se ao valor pago por você nos 12 meses anteriores ao evento.',
        ],
      },
      {
        heading: '9. Vigência e alterações',
        body: 'Estes Termos vigoram por prazo indeterminado. Podemos alterá-los a qualquer momento; a versão atualizada será publicada nesta página com nova data de "Última atualização". Alterações materiais entram em vigor após 30 dias da publicação ou na próxima renovação/ pagamento, o que ocorrer primeiro. O uso contínuo após a vigência constitui aceitação.',
      },
      {
        heading: '10. Lei aplicável e foro',
        body: 'Estes Termos são regidos pela lei brasileira. Fica eleito o foro da Comarca de Curitiba, Paraná, para dirimir controvérsias, salvo se a lei determinar foro consumerista diverso.',
      },
      {
        heading: '11. Contato',
        body: 'Dúvidas sobre estes Termos: privacidade@altiusinteligencia.com ou +55 41 98713-2450.',
      },
    ],
  },
  draft: {
    privacy: true,
    terms: true,
  },
}