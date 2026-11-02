class Produtos {
  validarPaginaTodosProdutos() {
    cy.url().should('include', '/products')
    cy.get('.features_items h2.title').should('be.visible').and('contain.text', 'All Products')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
  }

  visualizarPrimeiroProduto() {
    cy.get('.features_items .choose a[href^="/product_details/"]').first().click()
  }

  validarDetalhesDoProduto() {
    cy.url().should('include', '/product_details/')
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty')
      cy.contains('p', 'Category:').should('be.visible')
      cy.contains('span', 'Rs.').should('be.visible')
      cy.contains('p', 'Availability:').should('be.visible')
      cy.contains('p', 'Condition:').should('be.visible')
      cy.contains('p', 'Brand:').should('be.visible')
    })
  }

  pesquisarProduto(termo) {
    cy.get('#search_product').clear().type(termo)
    cy.get('#submit_search').click()
  }

  validarResultadoPesquisa(termo) {
    cy.get('.features_items h2.title').should('be.visible').and('contain.text', 'Searched Products')
    cy.get('.features_items .productinfo p')
      .should('have.length.greaterThan', 0)
      .each(($nome) => {
        expect($nome.text().toLowerCase()).to.include(termo.toLowerCase())
      })
  }

  adicionarAoCarrinho(idProduto) {
    cy.get(`.productinfo a.add-to-cart[data-product-id="${idProduto}"]`).first().click()
    cy.get('#cartModal').should('be.visible').and('contain.text', 'Your product has been added to cart.')
    cy.get('#cartModal .close-modal').click()
    cy.get('#cartModal').should('not.be.visible')
  }
}

export default new Produtos()
