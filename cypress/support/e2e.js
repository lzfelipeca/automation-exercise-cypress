import 'cypress-mochawesome-reporter/register'
import './commands'

// O site de testes dispara erros de scripts de terceiros (anúncios);
// eles não fazem parte do escopo dos testes e não devem quebrar a execução.
Cypress.on('uncaught:exception', () => false)
