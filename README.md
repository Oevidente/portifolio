# André Luiz Alves — Portfólio & Creative Showcase

[![CI Pipeline](https://github.com/andreluiz1902/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/andreluiz1902/portfolio/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)

Portfólio moderno, dinâmico e de alta performance desenvolvido com design contemporâneo (Liquid Glass Dock, micro-interações fluidas e tipografia refinada) para exibição de projetos de UI/UX Design, Identidade Visual, Social Media e Peças Gráficas.

---

## 🚀 Tecnologias

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React.
- **Backend / Proxy:** Node.js, Express, Vite Server Middleware.
- **Banco de Dados & Autenticação:** Firebase Firestore & Firebase Auth.
- **Mídia & Armazenamento:** Google Drive API & CDN direto para imagens em alta resolução.
- **Build & Bundle:** Vite 6, esbuild.
- **CI/CD:** GitHub Actions (Workflows automatizados para Lint, Build e Deploy).

---

## 🛠️ Como Executar Localmente

### 1. Pré-requisitos
- **Node.js**: Versão 20.x ou 22.x LTS instalada
- **npm** (incluso com o Node.js) ou gerenciador de pacotes equivalente

### 2. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Configurar variáveis de ambiente (Opcional)
Copie o arquivo de exemplo para `.env`:
```bash
cp .env.example .env
```

### 5. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor estará rodando em: `http://localhost:3000`

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor full-stack de desenvolvimento na porta `3000`. |
| `npm run lint` | Executa a verificação estrita de tipos com o TypeScript (`tsc --noEmit`). |
| `npm test` | Executa os testes e validações de código do pipeline CI. |
| `npm run build` | Compila os ativos do frontend com Vite e empacota o backend Node.js em `dist/`. |
| `npm start` | Inicia o servidor em modo de produção utilizando o pacote gerado (`dist/server.cjs`). |
| `npm run clean` | Limpa a pasta `dist/` e artefatos de compilação anteriores. |

---

## ⚙️ GitHub Actions (CI/CD)

O repositório já está configurado com fluxos automatizados do GitHub Actions na pasta `.github/workflows/`:

1. **`ci.yml` (Continuous Integration):**
   - Disparado automaticamente em qualquer `push` ou `pull_request` para as branches `main` e `master`.
   - Executa testes em matriz Node.js (20.x e 22.x).
   - Realiza validação estática de tipagem (`npm run lint`).
   - Constrói o projeto (`npm run build`) e valida a integridade dos artefatos (`dist/index.html` e `dist/server.cjs`).

2. **`deploy-pages.yml` (GitHub Pages):**
   - Permite publicar a versão estática do portfólio diretamente no **GitHub Pages** de forma gratuita.
   - Pode ser acionado automaticamente em commits na branch principal ou manualmente pela aba **Actions** (`workflow_dispatch`).
   - Inclui tratamento automático de rotas SPA com cópia para `404.html`.

### Como ativar o GitHub Pages no seu repositório:
1. No seu repositório no GitHub, acesse **Settings** > **Pages**.
2. Na seção **Build and deployment** > **Source**, selecione **GitHub Actions**.
3. O workflow `deploy-pages.yml` cuidará da publicação a cada push na branch principal.

---

## 📁 Estrutura de Arquivos

```text
├── .github/
│   └── workflows/
│       ├── ci.yml            # Pipeline de integração contínua (test & build)
│       └── deploy-pages.yml  # Pipeline para deploy estático no GitHub Pages
├── src/
│   ├── components/
│   │   ├── About.tsx         # Seção sobre o profissional e competências
│   │   ├── AdminPanel.tsx    # Painel administrativo para gestão de trabalhos
│   │   ├── Footer.tsx        # Rodapé e indicador de versão
│   │   ├── Header.tsx        # Navegação com efeito vidro
│   │   ├── Hero.tsx          # Apresentação de destaque
│   │   ├── LiquidGlassDock.tsx # Barra flutuante de navegação rápida
│   │   ├── Projects.tsx      # Galeria de projetos com filtros e lightbox
│   │   └── Services.tsx      # Especialidades e serviços oferecidos
│   ├── lib/
│   │   └── googleDrive.ts    # Utilitário para conexão e carregamento de imagens
│   ├── App.tsx               # Componente raiz da aplicação
│   ├── data.ts               # Acervo base e dados estruturados de projetos
│   ├── firebase.ts           # Inicialização e tratamento de exceções Firestore
│   ├── index.css             # Estilos globais e Tailwind CSS v4
│   ├── main.tsx              # Ponto de entrada React
│   └── types.ts              # Definições de tipos e interfaces TypeScript
├── firestore.rules           # Regras de segurança do Firestore
├── package.json              # Metadados e scripts do projeto
├── server.ts                 # Servidor Express com proxy de imagens
├── tsconfig.json             # Configuração do TypeScript
└── vite.config.ts            # Configuração do Vite e plugins
```

---

## 🔒 Boas Práticas & Segurança

- **Controle de Cotas do Firestore:** Leituras otimizadas para manter o consumo dentro do limite do plano gratuito, sem loops de requisição.
- **Proteção de Credenciais:** Nenhuma chave secreta comitada no histórico; variáveis sensíveis isoladas em variáveis de ambiente.
- **Zero Mockups Inconsistentes:** Dados estruturados e acervo real com suporte multilíngue e tipagem estrita.

---

## 📄 Licença

Distribuído sob licença livre para uso pessoal e profissional de André Luiz Alves.
