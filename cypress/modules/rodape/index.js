class Rodape {
  assinarNewsletter(email) {
    cy.get('footer').scrollIntoView()
    cy.get('.single-widget h2').should('be.visible').and('contain.text', 'Subscription')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  validarAssinaturaRealizada() {
    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!')
  }
}

export default new Rodape()
