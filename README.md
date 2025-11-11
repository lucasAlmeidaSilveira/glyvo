# Glyvo

<p align="center">
  <img src="./public/logoFullPrimary.svg" alt="Logo Glyvo" width="360" />
</p>

Aplicativo web e PWA para registro e acompanhamento de glicemias, pensado para pessoas com diabetes que precisam registrar medições diárias, organizar refeições e gerar relatórios rápidos para o time de saúde.

> 🚧 **Status**: aplicativo em construção ativa. As funcionalidades podem mudar rapidamente enquanto coletamos feedback clínico e refinamos a experiência.

## Visão Geral

- **Objetivo**: Centralizar o histórico de glicemias em uma interface simples, com sincronização em nuvem e suporte a instalação como aplicativo.
- **Público-alvo**: Usuários que monitoram glicemia regularmente e precisam compartilhar evoluções com profissionais.
- **Arquitetura**: Next.js (App Router) + Firebase Authentication, consumo de API REST própria e componentes UI baseados em Radix/Shadcn.

## Por Que Existe

- Facilitar a vida de pessoas que registram glicemia diversas vezes ao dia.
- Reduzir a fricção de compartilhar dados com nutricionistas e endocrinologistas.
- Criar uma experiência consistente em desktop e mobile, com suporte a PWA.

## Destaques do Produto

- Registro guiado de medições com verificação instantânea de consistência.
- Associação automática das medições ao período da refeição.
- Histórico completo com filtros, edição e exclusão de leituras.
- Exportação de dados em planilhas para consultas médicas.
- Banner inteligente que incentiva a instalação como aplicativo em qualquer dispositivo.

## Experiência do Usuário

- Interface minimalista baseada em cartões e fluxos lineares.
- Feedback imediato com toasts contextuais para cada ação crítica.
- Skeletons e estados vazios garantem continuidade mesmo durante carregamentos.
- Abordagem mobile-first para facilitar o uso durante o dia a dia do paciente.

## Arquitetura em Alto Nível

- **Frontend**: Next.js 15 (App Router) com React 19.
- **Design System**: Tailwind CSS, Radix UI e componentes shadcn adaptados à identidade Glyvo.
- **Camada de Dados**: Firebase Authentication + Firestore para identidade, com API REST dedicada para leituras e refeições.
- **Observabilidade**: Vercel Analytics para métricas básicas de uso.

```text
Fluxo principal:
Usuário → AuthContext (Firebase) → API REST (glicemias / refeições) → Interface reativa (hooks + shadcn)
```

## Fluxos Essenciais

- **Registrar glicemia**: formulário validado com React Hook Form + Zod, atribui refeição automaticamente e confirma via toast.
- **Gerenciar histórico**: listagem paginada com opções de editar, remover e gerar planilhas por intervalo.
- **Acesso protegido**: `ProtectedRoute` garante que apenas usuários autenticados naveguem pelas telas principais.
- **Experiência PWA**: hook `usePWA` registra service worker, aciona banners contextuais e monitora instalação.

## Roadmap Público

- Relatórios gráficos de tendência e variação por período.
- Insights personalizados para alertar sobre padrões críticos.
- Modo offline com sincronização posterior das leituras.
- Internacionalização (pt-BR/inglês) e acessibilidade ampliada.

## Status Atual

- MVP funcional em produção.
- Integrações com API externas e Firebase validadas.
- Uso principal direcionado a testes internos e coleta de feedback clínico.
- Desenvolvimento ativo: novas funcionalidades e ajustes de UX estão em construção contínua.

---

Se encontrar algum problema ou tiver sugestões, abra uma issue ou PR. 💙


