# Sistema de Tradução Bilíngue Global (PT-BR / EN)

Implementação de um sistema de internacionalização nativo, de alta precisão e custo zero para o portfólio global de André Luiz, permitindo alternar instantaneamente entre Português e Inglês com persistência local e detecção automática do navegador.

### Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> As seguintes escolhas de arquitetura e interface foram definidas com base nas respostas do usuário:

- **Localização do Seletor de Idioma**: Posicionado de forma limpa e minimalista exclusivamente no cabeçalho superior fixo (`Header.tsx`), mantendo a elegância visual do topo e sem poluir o dock flutuante inferior.
- **Detecção Inicial & Persistência**: Detecção inteligente via `navigator.language` no primeiro acesso (visitantes que não falam português recebem a versão em inglês automaticamente), com persistência no `localStorage` para manter a escolha do visitante.
- **Estratégia de Tradução de Conteúdo**: Dicionário bilíngue nativo e tipado em TypeScript, cobrindo com precisão editorial 100% dos dados dos 16 projetos (títulos, subtítulos, categorias, descrições detalhadas, destaques/highlights, tags e notas de UX), serviços, seções institucionais e estudos de caso, sem alterar o fluxo do painel administrativo e sem custo algum de API.

---

## 1. Visão Geral & Escopo

### O Que a Solução Oferece
- **Zero Custo de API ou Banco de Dados**: A internacionalização opera 100% no cliente com um `LanguageContext` reativo e dicionários estruturados. Nenhuma requisição desnecessária ao Firestore é realizada, preservando a cota diária do banco de dados.
- **Tradução Integral & Fluida**: Tradução instantânea sem recarregamento da página, abrangendo:
  - Navegação do cabeçalho e rodapé.
  - Seção Hero (status, chamada principal, bio resumida e botões).
  - Seção Especialidades (títulos e descrições dos serviços).
  - Filtros interativos de categoria ('Todos' / 'All', 'UI/UX Design', 'Identidade Visual' / 'Brand Identity', 'Social Media', 'Peças Gráficas' / 'Print & Graphic Design').
  - Todos os 16 projetos com badges, títulos, subtítulos, resumos, estudos de caso completos, listas de destaques técnicos, tags e notas de UX.
  - Modal de visualização detalhada de estudo de caso e galeria.
  - Seção Sobre Mim (entregáveis, clientes de referência, segmentos e trajetórias).
  - Feedbacks de interação, botões de ação e créditos.

---

## 2. Experiência do Usuário & Design Visual

### Fluxo de Interação
1. **Primeiro Acesso**: O sistema avalia a linguagem do navegador do visitante. Se for em inglês ou qualquer idioma estrangeiro, o site é apresentado em inglês. Se for em português, é apresentado em português.
2. **Alternância Manual**: No canto direito do cabeçalho de vidro líquido (`minimal-glass`), um seletor sutil `PT | EN` permite alternar com um clique. A mudança atualiza todos os componentes reativamente em menos de 10ms.
3. **Persistência**: A preferência é memorizada na chave `portfolio_lang` do navegador para futuras sessões.

### Estilo e Harmonia Visual
- O botão seletor de idioma adotará a mesma linguagem minimalista de vidro líquido (`minimal-glass`) já presente no site, respeitando a paleta escura sofisticada (`#050505` e brancos translúcidos).
- Respeito integral ao contrato de 3 zonas da barra superior (Wordmark à esquerda, Links de navegação ao centro, Ações à direita).

---

## 3. Arquitetura Técnica & Estrutura de Dados

```
┌────────────────────────────────────────────────────────┐
│              LanguageContext (React Context)           │
│  - currentLang: 'pt' | 'en'                            │
│  - setLang: (lang) => void                             │
│  - t: (key) => string                                  │
│  - getProjectData: (projId, lang) => ProjectData       │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   UI Dictionaries        │    │ Project & Content Catalog│
│   (locales/translations) │    │ - 16 Full Case Studies   │
│   - Header, Hero         │    │ - 5 Services             │
│   - Filters, Categories  │    │ - Clients & Trajectory   │
│   - Modal controls       │    │ - Highlights & UX Notes  │
└──────────────────────────┘    └──────────────────────────┘
```

### Arquivos Principais Envolvidos:
1. `src/i18n/LanguageContext.tsx`: Contexto React para disponibilizar o idioma ativo, função de alternância e hook `useLanguage()`.
2. `src/i18n/translations.ts`: Dicionário completo de termos de interface (UI), categorias, filtros, seções e mensagens.
3. `src/i18n/projectsTranslations.ts`: Tradução editorial precisa para os 16 projetos do acervo (títulos, subtítulos, descrições completas, destaques, tags e notas de UX).
4. `src/components/Header.tsx`: Inclusão do toggle `PT | EN` minimalista e tradução dos links de navegação.
5. `src/components/Hero.tsx`, `Services.tsx`, `Projects.tsx`, `About.tsx`, `Footer.tsx`: Conexão com o hook de tradução para renderização dinâmica conforme o idioma selecionado.

---

## 4. Plano de Validação & Testes

- **Verificação de Build**: Execução de `compile_applet` para garantir ausência de erros de tipagem TypeScript.
- **Teste de Alternância**: Validação de troca de idioma em tempo real sem renderizações supérfluas.
- **Verificação de Cota**: Garantir que a alternância não faça chamadas adicionais ao Firestore.
- **Inspeção de Layout**: Certificar que textos em inglês não quebrem o grid ou elementos de navegação em desktop e dispositivos móveis.
