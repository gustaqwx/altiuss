# Altius Directio: documento do produto

**Fonte:** altiusinteligencia.com/altius-directio/ (consultada em 19/10/2026)
**Empresa:** Altius Inteligência em Negócios

---

## 1. Resumo

O Altius Directio é um programa de capacitação em tecnologia que combina hard skills, soft skills, mentoria e projetos reais. O público são estudantes e novos talentos de TI que querem chegar ao primeiro emprego (ou ao próximo nível) com preparo dirigido. O currículo se apoia nas competências mapeadas pelo Future of Jobs Report 2025, do Fórum Econômico Mundial.

## 2. Contexto: a Altius

A Altius Inteligência em Negócios atua com transformação digital sustentável. Em seu manifesto, defende que tecnologia é meio e não fim, e que a inovação de verdade parte de inteligência estratégica. A visão declarada é ser referência em processos metodológicos que habilitem a transformação digital dos negócios por meio das pessoas.

O Directio aparece no menu "Soluções" do site, ao lado de:
- Altius for Business
- Altius for Education
- InteliTax
- SignalMed

## 3. Problema que o programa ataca

O site apresenta três dados para ilustrar a dificuldade de entrada na carreira tech:

| Dado | Significado |
|---|---|
| 85% | das vagas exigem soft skills como critério eliminatório |
| +40% | dos universitários em tech nunca passaram por entrevista técnica |
| 6 meses | tempo médio de busca do primeiro emprego sem preparo dirigido |

> Observação: o site não cita a fonte desses três números. Se forem usados em material oficial, vale confirmar a origem com a equipe da Altius.

## 4. Público-alvo

- Estudantes de tecnologia
- Novos talentos buscando o primeiro emprego ou o próximo nível na carreira tech

No ecossistema do projeto, também participam **mentores** (profissionais de mercado que acompanham os alunos).

## 5. Proposta de valor

Uma experiência de capacitação que une tecnologia, comunidade e acompanhamento humano, com trajetória estruturada em 12 meses, do diagnóstico ao primeiro emprego.

## 6. Currículo: seis competências

Alinhadas ao mapa de habilidades do Fórum Econômico Mundial:

| Competência | Foco |
|---|---|
| Pensamento Analítico | Resolver problemas complexos com dados, lógica e hipóteses |
| IA & Big Data | Uso prático de IA, automação e análise de dados |
| Programação & Sistemas | Lógica de programação, versionamento, arquitetura básica, ambientes cloud |
| Flexibilidade & Resiliência | Adaptação rápida a mudanças, ferramentas e contextos profissionais |
| Colaboração & Empatia | Trabalho em squads multidisciplinares, comunicação, inteligência emocional |
| Liderança & Networking | Protagonismo, tomada de decisão e gestão de expectativas em equipe |

## 7. O que o programa oferece

1. **Trilhas personalizadas**: currículo adaptado ao perfil diagnóstico, com conteúdo técnico e comportamental em módulos progressivos.
2. **Simulações de processos seletivos**: entrevistas técnicas e comportamentais simuladas, com feedback estruturado. O objetivo declarado é reduzir a ansiedade e aumentar a taxa de aprovação.
3. **Mentoria com profissionais de mercado**: sessões individuais e em grupo, para orientação de carreira e técnica.
4. **Dashboard de evolução de competências**: visualização em tempo real do desenvolvimento em cada habilidade do mapa WEF, com metas e marcos.
5. **Projetos aplicados com empresas parceiras**: desafios reais propostos por organizações parceiras, que geram portfólio e networking antes do primeiro emprego.
6. **Comunidade e eventos exclusivos**: rede de ex-alunos, hackathons, workshops e encontros com recrutadores.

## 8. Roadmap do programa (12 meses)

### Fase 1: Explorar (meses 1–2), "Diagnose & base"
- Assessment de perfil
- Fundamentos de TI
- Autoconhecimento
- Plano individual

### Fase 2: Desenvolver (meses 3–5), "Capacitação intensiva"
- Trilhas de hard skills
- Workshops de soft skills
- Projetos em grupo
- Mentoria quinzenal

### Fase 3: Aplicar (meses 6–9), "Imersão & prática"
- Projeto real em empresa
- Hackathon interno
- Simulação de entrevista
- Portfólio técnico

### Fase 4: Decolar (meses 10–12), "Empregabilidade"
- LinkedIn & branding
- Conexão com parceiros
- Processo seletivo real
- Onboarding de carreira

## 9. Jornada do aluno (visão resumida)

1. Faz o assessment e recebe um plano individual.
2. Segue trilhas técnicas e comportamentais, com mentoria a cada duas semanas.
3. Aplica o aprendizado em projeto real e hackathon, montando portfólio.
4. Treina entrevistas, ajusta o perfil profissional e entra em processo seletivo.
5. Acompanha a evolução de cada competência no dashboard durante todo o percurso.

## 10. Contato e canais

- WhatsApp comercial: +55 41 98713-2450
- LinkedIn: linkedin.com/company/altius-inteligência
- Chamadas à ação do site: "Ver Roadmap do Programa", "Garanta sua vaga" e "Fale com nossa equipe" (todas levam ao WhatsApp ou à âncora do roadmap)

## 11. Escopo da plataforma (MVP implementado no código; deployment pendente)

Este item vem das decisões do projeto, não do site.

- Jornada do aluno
- Avaliações e feedback de mentores
- Controle de acesso por perfil: Aluno (`student`), Mentor (`mentor`), Instrutor (`instructor`) e Admin (`admin`); cadastro entra como Aluno e promoções são exclusivas do Admin.
- Tela de login/registro (e-mail e Apple), recuperação de senha, jornada do aluno, atividades/entregas, feedback, mentoria, notificações, aulas YouTube incorporadas e aulas ao vivo.
- Terminal retrátil com logs de exemplo na área logada; demo só via `VITE_DEMO_MODE`, nunca em produção.
- Instrutor gerencia aulas/sessões que criou e consulta lista limitada de alunos; Admin tem gestão completa e promoção por RPC auditada. A implementação está no código; serviço Supabase precisa ser configurado e receber a migration.
- Vídeos são hospedados no YouTube; hospedar vídeos próprios fica fora do escopo. Player incorpora YouTube. “Não listado” não é controle de acesso.
- Fora do MVP: envio de desafios de empresas pela plataforma (v2), quadro de vagas e contato com empresas.

## 12. Lacunas: o que o site não informa

Para completar este documento, faltam dados que a página não traz:

- Preço, formas de pagamento e bolsas
- Carga horária semanal e formato (presencial, online ou híbrido)
- Requisitos de entrada e processo seletivo do próprio programa
- Número de vagas e datas de turma
- Lista de empresas parceiras e mentores
- Certificação ao final
- Fonte dos três números da seção 3
