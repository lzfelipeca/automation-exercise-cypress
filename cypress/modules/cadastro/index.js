class Cadastro {
  validarFormularioNovoUsuario() {
    cy.get('.signup-form h2').should('be.visible').and('contain.text', 'New User Signup!')
  }

  iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').clear().type(nome)
    cy.get('[data-qa="signup-email"]').clear().type(email)
    cy.get('[data-qa="signup-button"]').click()
  }

  validarErroEmailExistente() {
    cy.get('form[action="/signup"] p')
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!')
  }

  preencherInformacoesDaConta(usuario) {
    cy.contains('b', 'Enter Account Information').should('be.visible')

    cy.get('#id_gender1').check()
    cy.get('[data-qa="name"]').should('have.value', usuario.nome)
    cy.get('[data-qa="email"]').should('have.value', usuario.email)
    cy.get('[data-qa="password"]').type(usuario.senha, { log: false })
    cy.get('[data-qa="days"]').select(usuario.dia)
    cy.get('[data-qa="months"]').select(usuario.nomeMes)
    cy.get('[data-qa="years"]').select(usuario.ano)

    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  preencherEndereco(usuario) {
    cy.get('[data-qa="first_name"]').type(usuario.primeiroNome)
    cy.get('[data-qa="last_name"]').type(usuario.sobrenome)
    cy.get('[data-qa="company"]').type(usuario.empresa)
    cy.get('[data-qa="address"]').type(usuario.endereco)
    cy.get('[data-qa="address2"]').type(usuario.complemento)
    cy.get('[data-qa="country"]').select(usuario.pais)
    cy.get('[data-qa="state"]').type(usuario.estado)
    cy.get('[data-qa="city"]').type(usuario.cidade)
    cy.get('[data-qa="zipcode"]').type(usuario.cep)
    cy.get('[data-qa="mobile_number"]').type(usuario.celular)
  }

  criarConta() {
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
  }

  cadastrarUsuario(usuario) {
    this.validarFormularioNovoUsuario()
    this.iniciarCadastro(usuario.nome, usuario.email)
    this.preencherInformacoesDaConta(usuario)
    this.preencherEndereco(usuario)
    this.criarConta()
  }
}

export default new Cadastro()
