class Menu {
  acessarHome() {
    cy.visit('/')
    cy.get('#slider').should('be.visible')
    cy.title().should('include', 'Automation Exercise')
  }

  irParaLogin() {
    cy.get('header a[href="/login"]').click()
  }

  irParaProdutos() {
    cy.get('header a[href="/products"]').click()
  }

  irParaCarrinho() {
    cy.get('header a[href="/view_cart"]').click()
  }

  fazerLogout() {
    cy.get('header a[href="/logout"]').click()
  }

  excluirConta() {
    cy.get('header a[href="/delete_account"]').click()
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
  }

  validarUsuarioLogado(nome) {
    cy.contains('header a', 'Logged in as').should('be.visible').and('contain.text', nome)
  }
}

export default new Menu()
