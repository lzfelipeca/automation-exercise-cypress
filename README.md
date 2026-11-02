# automation-exercise-cypress

Trabalho de conclusão da disciplina de Automação Web com Cypress da pós em Automação de Testes.

Automação dos casos de teste do site [Automation Exercise](https://automationexercise.com), seguindo os cenários da página [Test Cases](https://automationexercise.com/test_cases).

## Casos automatizados

- Test Case 1: Register User
- Test Case 2: Login User with correct email and password
- Test Case 3: Login User with incorrect email and password
- Test Case 4: Logout User
- Test Case 5: Register User with existing email
- Test Case 8: Verify All Products and product detail page
- Test Case 9: Search Product
- Test Case 10: Verify Subscription in home page
- Test Case 15: Place Order: Register before Checkout
- Test Case 16: Place Order: Login before Checkout

## Stack

- Cypress
- cypress-mochawesome-reporter
- Faker (massa de dados)
- GitHub Actions

## Organização

Os testes ficam em `cypress/e2e/automation-exercise.cy.js` e as ações de cada página foram separadas em módulos dentro de `cypress/modules` (menu, login, cadastro, produtos, carrinho, checkout e rodapé).

Nos cenários que precisam de um usuário já cadastrado (2, 4, 5 e 16), o usuário é criado pela API do próprio site antes do teste, usando comandos customizados em `cypress/support/commands.js`. Assim a tela é usada só no que está sendo testado.

Cada execução gera um usuário novo com o Faker, então os testes não dependem de dados fixos.

## Como rodar

```bash
npm install
npm test
```

Para abrir o Cypress no modo interativo:

```bash
npm run cy:open
```

O relatório fica em `cypress/reports/index.html`.

## Pipeline

A pipeline roda a cada push na `main`. No final da execução o relatório do Mochawesome fica disponível em Artifacts (`relatorio-mochawesome`).

---

Luiz Felipe Almeida · [LinkedIn](https://linkedin.com/in/lzfelipealmeida)
