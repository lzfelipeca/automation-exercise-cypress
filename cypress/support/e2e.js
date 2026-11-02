import 'cypress-mochawesome-reporter/register'
import './commands'

// ignora erros de script dos anúncios do site
Cypress.on('uncaught:exception', () => false)
