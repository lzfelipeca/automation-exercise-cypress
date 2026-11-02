# Automation Exercise — Automação Web com Cypress

Trabalho de Conclusão da disciplina **Automação Web com Cypress** (Pós-graduação em Automação de Testes).

Projeto que automatiza, com Cypress, os casos de teste da página
[Test Cases](https://automationexercise.com/test_cases) da aplicação fictícia
[Automation Exercise](https://automationexercise.com).

**Autor:** Luiz Felipe Madera Almeida — [GitHub](https://github.com/lzfelipeca) · [LinkedIn](https://linkedin.com/in/lzfelipealmeida)

## Casos de teste implementados

| Caso | Descrição |
|------|-----------|
| 1  | Register User |
| 2  | Login User with correct email and password |
| 3  | Login User with incorrect email and password |
| 4  | Logout User |
| 5  | Register User with existing email |
| 8  | Verify All Products and product detail page |
| 9  | Search Product |
| 10 | Verify Subscription in home page |
| 15 | Place Order: Register before Checkout |
| 16 | Place Order: Login before Checkout |

## Tecnologias

- [Cypress](https://www.cypress.io/) — framework de automação
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) — relatórios HTML
- [@faker-js/faker](https://fakerjs.dev/) — geração de massa de dados dinâmica
- GitHub Actions — integração contínua

## Estrutura do projeto

```
.
├── .github/workflows/cypress.yml   # Pipeline de CI (execução + publicação do relatório)
├── cypress
│   ├── e2e
│   │   └── automation-exercise.cy.js   # Spec do trabalho final (casos 1,2,3,4,5,8,9,10,15,16)
│   ├── fixtures
│   │   └── pagamento.json              # Dados de pagamento e comentário do pedido
│   ├── modules                         # Modularização (ações e validações por área)
│   │   ├── cadastro/   carrinho/   checkout/
│   │   ├── login/      menu/       produtos/   rodape/
│   └── support
│       ├── commands.js                 # Comandos customizados (pré-condições via API)
│       ├── e2e.js                      # Registro do reporter e configurações globais
│       └── factories/usuario.js        # Fábrica de usuários com Faker
└── cypress.config.js
```

## Boas práticas aplicadas

- **Modularização:** cada área da aplicação (menu, login, cadastro, produtos, carrinho, checkout, rodapé) tem seu módulo com ações e validações; a spec apenas orquestra o fluxo de cada caso.
- **Seletores estáveis:** prioridade para atributos `data-qa` e `id` expostos pela aplicação; sem XPath.
- **Massa de dados dinâmica:** cada teste gera um usuário único com Faker, garantindo independência entre os testes e entre execuções.
- **Pré-condições via API:** nos casos que exigem um usuário já cadastrado (2, 4, 5 e 16), o usuário é criado pela API pública (`/api/createAccount`) com comandos customizados — a interface é usada só para o que está sendo testado.
- **Limpeza de dados:** todo usuário criado é excluído ao final do teste (pela interface, quando faz parte do caso, ou via API).
- **Estabilidade:** bloqueio dos domínios de anúncios (`blockHosts`) que interferem na navegação, `retries` em modo `run` e timeouts ajustados ao tempo de resposta do site.
- **Dados sensíveis ocultos no log:** senha e dados do cartão são digitados com `{ log: false }`.

## Como executar localmente

Pré-requisito: Node.js 18+.

```bash
npm install

# modo interativo
npm run cy:open

# modo headless (gera o relatório)
npm test
```

O relatório HTML é gerado em `cypress/reports/index.html`.

## Integração contínua

O workflow `.github/workflows/cypress.yml` roda a cada `push`/`pull request` na branch `main` (e manualmente, via *Run workflow*):

1. Instala as dependências e executa a spec do trabalho final no Chrome.
2. Publica o relatório Mochawesome como artefato (**relatorio-mochawesome**), disponível na aba **Actions** → execução → *Artifacts*, mesmo quando há falhas.
3. Em caso de falha, publica também as screenshots.
