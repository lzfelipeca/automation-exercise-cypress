class Checkout {
  validarDetalhesDoPedido(usuario) {
    cy.url().should('include', '/checkout')
    cy.contains('h2', 'Address Details').should('be.visible')
    cy.get('#address_delivery')
      .should('contain.text', usuario.primeiroNome)
      .and('contain.text', usuario.sobrenome)
      .and('contain.text', usuario.endereco)
    cy.contains('h2', 'Review Your Order').should('be.visible')
    cy.get('#cart_info').should('be.visible')
  }

  adicionarComentarioEFinalizar(comentario) {
    cy.get('textarea[name="message"]').type(comentario)
    cy.contains('a[href="/payment"]', 'Place Order').click()
  }

  pagar(pagamento) {
    cy.url().should('include', '/payment')
    cy.get('[data-qa="name-on-card"]').type(pagamento.nomeNoCartao)
    cy.get('[data-qa="card-number"]').type(pagamento.numeroCartao, { log: false })
    cy.get('[data-qa="cvc"]').type(pagamento.cvc, { log: false })
    cy.get('[data-qa="expiry-month"]').type(pagamento.mesValidade)
    cy.get('[data-qa="expiry-year"]').type(pagamento.anoValidade)
    cy.get('[data-qa="pay-button"]').click()
  }

  validarPedidoConfirmado() {
    cy.url().should('include', '/payment_done')
    cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
  }
}

export default new Checkout()
