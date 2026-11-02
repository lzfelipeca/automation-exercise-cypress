class Carrinho {
  validarPaginaCarrinho(quantidadeItens) {
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
    cy.get('#cart_info_table tbody tr[id^="product-"]').should('have.length', quantidadeItens)
  }

  prosseguirParaCheckout() {
    cy.contains('.check_out', 'Proceed To Checkout').click()
  }
}

export default new Carrinho()
