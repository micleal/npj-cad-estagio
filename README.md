# NPJ - Sistema de Agendamento de Estágio

## Sobre o Projeto

Este é um aplicativo web desenvolvido como atividade de estágio para alunos de Ciência da Computação da FMU (Faculdades Metropolitanas Unidas). O sistema tem como objetivo facilitar e otimizar o processo de agendamentos para alunos do curso de Direito no NPJ (Núcleo de Prática Jurídica) da FMU.

## Funcionalidades Principais

- Agendamento de horários para estágio
- Gerenciamento de vagas disponíveis
- Acompanhamento do status do estágio
- Interface intuitiva para alunos e coordenadores
- Sistema de notificações para confirmações e lembretes
- Armazenamento local dos dados

## Tecnologias Utilizadas

- [T3 Stack](https://create.t3.gg/) (Framework full-stack type-safe)
- Next.js 15.3.2
- React.js
- TypeScript
- TailwindCSS
- Drizzle ORM
- PostgreSQL (Banco de dados local)
- Biomejs (Linter e Formatter)

## Requisitos do Sistema

- Node.js (versão 18.17.0 ou superior)
- Bun (gerenciador de pacotes)
- PostgreSQL 15 ou superior

## Instalação e Configuração

1. Clone o repositório:

```bash
git clone https://github.com/micleal/npj-cad-estagio
cd npj-cad-estagio
```

2. Instale as dependências:

```bash
bun install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis necessárias

4. Inicie o banco de dados PostgreSQL:

```bash
./start-database.sh
```

5. Inicie o aplicativo em modo de desenvolvimento:

```bash
bun dev
```

## Scripts Disponíveis

- `bun run dev`: Inicia o aplicativo em modo de desenvolvimento
- `bun run build`: Cria a build de produção
- `bun run start`: Inicia o aplicativo em modo de produção
- `bun run lint`: Executa a verificação de código
- `bun run format`: Formata o código usando Biome
- `bun run db:generate`: Gera os tipos do Drizzle ORM
- `bun run db:push`: Atualiza o schema do banco de dados

## Estrutura do Projeto

```
npj-cad-estagio/
├── src/                  # Código fonte
│   ├── app/              # Rotas e páginas (Next.js App Router)
│   ├── components/       # Componentes React reutilizáveis
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilitários e configurações
│   ├── server/           # Lógica do servidor
│   │   ├── api/          # Rotas da API
│   │   └── db/           # Configuração do banco de dados
│   ├── styles/           # Estilos globais e configurações do Tailwind
│   ├── trpc/             # Configuração do tRPC
│   └── env.ts            # Configuração de variáveis de ambiente
├── public/               # Arquivos estáticos
├── .next/                # Build do Next.js
├── drizzle.config.ts     # Configuração do Drizzle ORM
├── next.config.ts        # Configuração do Next.js
└── tsconfig.json         # Configuração do TypeScript
```

## Contribuição

Este projeto é mantido pelos estagiários de Ciência da Computação da FMU. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
