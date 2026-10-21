# Plano de Unificação Visual: Minimal Glass & Minimalismo Híbrido

O objetivo desta evolução de design é eliminar a fragmentação estética entre os blocos 100% sólidos/escuros e os elementos isolados de "liquid glass" pesado, consolidando uma **linguagem visual híbrida e coesa (Minimal Glass)** aplicada de ponta a ponta: do Header e Dock flutuante aos Cards, Modais, Galerias e Formulários.

---

### Decisões Confirmadas com o Usuário

- **Estilo Base**: *Minimal Glass* — vidro fosco neutro com desfoque moderado (`backdrop-blur-xl` / 20–24px), transparência equilibrada (`rgba(14, 15, 20, 0.72)`) e bordas ultrafinas (`border-white/10`).
- **Geometria & Raios**: Arredondamento progressivo padronizado — contêineres e modais com raio de `24px` a `28px` (`rounded-3xl`), cards e painéis internos com `16px` a `20px` (`rounded-2xl`) e botões/chips interativos com `10px` a `14px` (`rounded-xl` ou `rounded-full` para controles de transporte).
- **Tratamento de Luz e Profundidade**: Bisel superior sutil de luz (`inset 0 1px 0 rgba(255, 255, 255, 0.12)` a `0.15`), removendo o brilho colorido saturado ou discrepâncias de plástico/3D pesado em favor de uma profundidade óptica refinada e monocromática.

---

## 1. Visão Geral e Conceito do Novo Estilo

### A. O Paradigma "Minimal Glass"
Em vez de alternar elementos planos e opacos (ex: `#111319` rígido) com elementos super reflexivos ou pílulas isoladas, cada superfície estrutural passa a obedecer a um padrão harmônico de 3 camadas:
1. **Superfície Base (Canvas)**: Fundo escuro absoluto profundo (`#08080a`), com gradientes de ambientação neutros e imperceptíveis.
2. **Camada de Vidro Estrutural (Minimal Glass Surface)**: Desfoque sutil (`backdrop-blur-xl`), fundo translúcido escuro e borda de 1px com degradê sutil (destaque na crista superior e suave na base).
3. **Iluminação de Bisel (Specular Rim Highlight)**: Sombra interna superior que simula refração de luz no topo da borda de vidro (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12)`).

```
┌────────────────────────────────────────────────────────┐  ◄── Crista Iluminada (inset 0 1px 0 rgba(255,255,255,0.14))
│  [ Minimal Glass Surface: rgba(14, 15, 20, 0.72) ]     │  ◄── Backdrop Blur (20px) + Hairline Border
│                                                        │
│  ┌───────────────────────────┐                         │
│  │ Inner Element / Action    │ ◄── Progressive Radius Math: R_inner = R_outer - padding
│  └───────────────────────────┘                         │
└────────────────────────────────────────────────────────┘
```

---

## 2. Arquitetura do Sistema de Design (Tokens & Classes Globais)

No arquivo `src/index.css`, criaremos as classes utilitárias e variáveis semânticas que alimentarão todos os componentes:

- `.minimal-glass`: Superfície principal translúcida para cards, modais e barras flutuantes (`bg-[rgba(13,14,19,0.72)]`, `backdrop-blur-xl`, `border border-white/10`, `shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`).
- `.minimal-glass-hover`: Transição suave para interação em cards e botões (`hover:bg-[rgba(22,24,32,0.85)]`, `hover:border-white/20`, `hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_32px_rgba(0,0,0,0.5)]`).
- `.minimal-glass-active`: Estado ativo/selecionado em abas, categorias e botões ativos (`bg-white/10`, `border-white/25`, `shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`).
- `.minimal-glass-overlay`: Fundo de modais e lightboxes com desfoque profundo e escurecimento cinematográfico (`bg-black/75`, `backdrop-blur-md`).

---

## 3. Roteiro de Aplicação Etapa por Etapa

### Etapa 1: Base Global & Tipografia (`index.css`)
- Atualizar tokens no `src/index.css` com as classes utilitárias `.minimal-glass`, `.minimal-glass-hover`, `.minimal-glass-active`.
- Padronizar sombras de bisel e refração superior.
- Garantir contraste estrito WCAG AA para textos secundários e metadados.

### Etapa 2: Menus de Navegação & Dock Flutuante
- **Header (`Header.tsx`)**:
  - Hibridizar a barra superior: substituir o estilo plano/pill genérico pelo contêiner `.minimal-glass` com curvatura `rounded-2xl` / `rounded-full` equilibrada.
  - O botão de ação "Entrar em contato" passa a ter acabamento híbrido de alto contraste (branco fosco com bisel fino de luz em vez de pílula sólida crua).
  - Menu mobile retrátil: converter o dropdown para o mesmo contêiner `minimal-glass` com curvatura consistente (`rounded-2xl`).
- **Liquid Glass Dock (`LiquidGlassDock.tsx`)**:
  - Ajustar o dock flutuante inferior para a mesma paleta e desfoque do Minimal Glass, mantendo a responsividade e o tracking de rolagem, mas unificando suas bordas, sombra e curvatura aos demais menus.

### Etapa 3: Hero Section & Chamadas de Ação (`Hero.tsx`)
- Status "Disponível para projetos": substituir a caixa plana com borda simples por um badge minimal glass sutil sem efeito pill agressivo (metadado tipográfico refinado com bisel de luz discreto).
- Botão "Ver Trabalhos": aplicar o estilo híbrido premium com bisel de luz superior e transição refinada no hover.
- Linha divisória: harmonizar com o gradiente suave de luz do novo sistema.

### Etapa 4: Grid de Especialidades / Serviços (`Services.tsx`)
- Bento Cards de Especialidades:
  - Substituir o fundo rígido `#111319` com borda simples por `.minimal-glass`.
  - Atualizar os ícones e títulos para seguir a mesma curvatura interna (`rounded-xl`).
  - Remover gradientes artificiais desalinhados (ex: gradiente roxo isolado no card 1) em favor de uma iluminação de superfície uniforme e neutra.

### Etapa 5: Filtro de Categorias & Cards de Projetos (`Projects.tsx`)
- **Filtro de Categorias**:
  - Unificar a barra de segmentação com o design Minimal Glass, ajustando o indicador deslizante (`activeCategoryPill`) para a nova classe `.minimal-glass-active`.
  - Manter o botão tátil de filtro com resposta rápida e transição fluida.
- **Cards de Projetos (Bento Grid)**:
  - Migrar os cards de projeto de `#111319` plano para `.minimal-glass` com efeito hover fluido.
  - Overlay de imagem com scrim de legibilidade aprimorado.
  - Selos/metadados do card: aplicar regra *Zero-Pill Discipline* da diretriz de frontend (texto limpo com separadores sutis `·` em vez de pílulas coloridas artificiais).

### Etapa 6: Seção Sobre Mim & Bento de Trajetória (`About.tsx`)
- Harmonizar o banner de Filosofia & Visão, cards de Marcas & Clientes, Jornada Acadêmica e Experiência & Entregas com o padrão `.minimal-glass`.
- Substituir badges e tags em formato de pílulas coloridas por metadados limpos com tipografia equilibrada e separadores elegantes.

### Etapa 7: Modais, Galeria e Lightbox (`Projects.tsx`)
- **Modal de Estudo de Caso (Case Study Modal)**:
  - Contêiner principal com `minimal-glass`, `rounded-3xl` (24px a 28px) e borda com bisel de luz superior.
  - Botões de fechar (`✕`), expandir e setas de navegação (`‹` `›`): botões circulares em vidro fosco neutro com feedback tátil ao clique e hover.
  - Tira de miniaturas (Thumbnails Strip): refinada com bordas translúcidas e destaque na miniatura ativa sem saturações estridentes.
- **Visualizador em Tela Cheia (Lightbox Viewer)**:
  - Fundo imersivo com desfoque refinado e barra de controle flutuante com acabamento em Minimal Glass.

### Etapa 8: Painel Administrativo (`AdminPanel.tsx`)
- Modal de login e painel de gerenciamento de projetos com a mesma assinatura visual (vidro fosco neutro, campos de formulário translúcidos com borda de foco iluminada e botões de ação consistentes).
- Tratamento de alertas e modais de confirmação de exclusão dentro da mesma coerência.

### Etapa 9: Rodapé e Microinterações Finais (`Footer.tsx` e `App.tsx`)
- Rodapé refinado com links em tipografia minimalista e separadores limpos.
- Verificação geral de espaçamentos, raio progressivo e validação pelo compilador (`compile_applet`).

---

## 4. Arquitetura de Componentes e Fluxo de Estilização

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Design Tokens: index.css                        │
│   .minimal-glass  │  .minimal-glass-hover  │  .minimal-glass-active    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  Navegação & Docks   │ │  Conteúdo & Bento    │ │   Modais & Galeria   │
│  - Header.tsx        │ │  - Hero.tsx          │ │  - CaseStudyModal    │
│  - Mobile Dropdown   │ │  - Services.tsx      │ │  - GalleryStrip      │
│  - LiquidGlassDock   │ │  - Projects.tsx Grid │ │  - Full Lightbox     │
│  - Category Filter   │ │  - About.tsx Bento   │ │  - AdminPanel.tsx    │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

## 5. Garantias e Diretrizes Cumpridas
- **Zero Custos & Sem IA**: Zero integração de LLM ou APIs com custos.
- **Otimização de Leituras Firestore**: Nenhuma alteração nas consultas ou na lógica de cache do banco de dados, protegendo o limite diário de leituras.
- **Zero Mocks**: Todas as interfaces utilizam dados reais já existentes no projeto.
