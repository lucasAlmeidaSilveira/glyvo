# Glyvo

<p align="center">
  <img src="./public/logoFullPrimary.svg" alt="Logo Glyvo" width="360" />
</p>

App web e PWA para anotar e acompanhar glicemias, pensado para quem vive com diabetes, registra medições várias vezes por dia, quer organizar refeições e precisa compartilhar relatórios rápidos com a equipe de saúde.

## Status do projeto
> 🚧 Em construção...
- MVP já está rodando em produção.
- Integrações com APIs externas e Firebase validadas.
- Foco atual nos testes internos e na coleta de feedback clínico.
- Desenvolvimento segue ativo: novas features e ajustes de UX aparecem toda semana.

## Objetivo

- Tornar o registro de glicemia mais ágil, digital e integrado ao fluxo de monitoramento.
- Facilidade na geração de relatórios de glicemias, prontos para análise de acompanhamento médico.

## Tecnologias

- **Frontend | Next.js 15 + React 19**: App Router, server components e deploy em Vercel garantindo SSR e experiência PWA.
- **UI & UX | Tailwind CSS + Radix UI + shadcn**: design system componetizado, com temas próprios e acessibilidade pronta para produção.
- **Backend | Node.js + TypeScript**: API REST desacoplada (mantida em repositório próprio), validação com Zod, testes automatizados e upload das planilhas via Firebase Storage.
- **Autenticação & Sessões | Firebase Authentication**: login seguro com providers sociais e refresh transparente.
- **Dados | PostgreSQL**: modelo relacional que concentra leituras, refeições e relatórios, preparado para replicação e BI.
- **Observabilidade & Ops | Vercel Analytics**: monitoramento de uso, métricas de performance e alertas rápidos para o time.

## Destaques do Produto

- Registro guiado das medições com validação instantânea.
- Associação automática das leituras ao período da refeição.
- Histórico das medições.
- Exportação para planilhas.
- Mobile-first para encaixar no ritmo do dia a dia.
- Interface minimalista com foco em fluxos lineares.

## Fluxos Essenciais

- **Registrar glicemia**: formulário com React Hook Form + Zod, associa refeição automaticamente e confirma com toast.
- **Gerenciar histórico**: listagem paginada com edição, remoção e geração de planilhas por intervalo.
- **Acesso protegido**: `ProtectedRoute` barra quem não está autenticado.
- **Experiência PWA**: hook `usePWA` registra service worker, mostra banners e acompanha a instalação.

## Roadmap Público

- Relatórios gráficos mostrando tendências e variações por período.
- Insights personalizados para chamar atenção para padrões críticos.
- Modo offline com sync automático das leituras depois.
- Internacionalização (pt-BR/inglês) e acessibilidade aprimorada.

---

Achou algo estranho ou tem uma ideia bacana? Abre uma issue ou PR e bora conversar. 💙