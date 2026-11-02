class Login {
  validarPaginaLogin() {
    cy.url().should('include', '/login')
    cy.get('.login-form h2').should('be.visible').and('contain.text', 'Login to your account')
  }

  preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').clear().type(email)
    cy.get('[data-qa="login-password"]').clear().type(senha, { log: false })
    cy.get('[data-qa="login-button"]').click()
  }

  validarErroCredenciaisInvalidas() {
    cy.get('form[action="/login"] p')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!')
  }
}

export default new Login()
