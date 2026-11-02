/// <reference types="cypress" />

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import produtos from '../modules/produtos'
import carrinho from '../modules/carrinho'
import checkout from '../modules/checkout'
import rodape from '../modules/rodape'
import { gerarUsuario } from '../support/factories/usuario'

describe('Automation Exercise', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()
    menu.acessarHome()
  })

  context('Cadastro e autenticação', () => {
    it('Test Case 1: Register User', () => {
      menu.irParaLogin()
      cadastro.cadastrarUsuario(usuario)

      menu.validarUsuarioLogado(usuario.nome)
      menu.excluirConta()
    })

    it('Test Case 2: Login User with correct email and password', () => {
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      login.validarPaginaLogin()
      login.preencherLogin(usuario.email, usuario.senha)

      menu.validarUsuarioLogado(usuario.nome)
      menu.excluirConta()
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
      menu.irParaLogin()
      login.validarPaginaLogin()
      login.preencherLogin(usuario.email, usuario.senha)

      login.validarErroCredenciaisInvalidas()
    })

    it('Test Case 4: Logout User', () => {
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      login.validarPaginaLogin()
      login.preencherLogin(usuario.email, usuario.senha)
      menu.validarUsuarioLogado(usuario.nome)

      menu.fazerLogout()
      login.validarPaginaLogin()

      cy.excluirUsuarioViaApi(usuario)
    })

    it('Test Case 5: Register User with existing email', () => {
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      cadastro.validarFormularioNovoUsuario()
      cadastro.iniciarCadastro(usuario.nome, usuario.email)

      cadastro.validarErroEmailExistente()

      cy.excluirUsuarioViaApi(usuario)
    })
  })

  context('Produtos e assinatura', () => {
    it('Test Case 8: Verify All Products and product detail page', () => {
      menu.irParaProdutos()
      produtos.validarPaginaTodosProdutos()

      produtos.visualizarPrimeiroProduto()
      produtos.validarDetalhesDoProduto()
    })

    it('Test Case 9: Search Product', () => {
      const termo = 'Blue Top'

      menu.irParaProdutos()
      produtos.validarPaginaTodosProdutos()

      produtos.pesquisarProduto(termo)
      produtos.validarResultadoPesquisa(termo)
    })

    it('Test Case 10: Verify Subscription in home page', () => {
      rodape.assinarNewsletter(usuario.email)
      rodape.validarAssinaturaRealizada()
    })
  })

  context('Pedidos', () => {
    beforeEach(() => {
      cy.fixture('pagamento').as('pagamento')
    })

    it('Test Case 15: Place Order: Register before Checkout', function () {
      menu.irParaLogin()
      cadastro.cadastrarUsuario(usuario)
      menu.validarUsuarioLogado(usuario.nome)

      menu.irParaProdutos()
      produtos.adicionarAoCarrinho(1)
      produtos.adicionarAoCarrinho(2)

      menu.irParaCarrinho()
      carrinho.validarPaginaCarrinho(2)
      carrinho.prosseguirParaCheckout()

      checkout.validarDetalhesDoPedido(usuario)
      checkout.adicionarComentarioEFinalizar(this.pagamento.comentarioPedido)
      checkout.pagar(this.pagamento)
      checkout.validarPedidoConfirmado()

      menu.excluirConta()
    })

    it('Test Case 16: Place Order: Login before Checkout', function () {
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      login.preencherLogin(usuario.email, usuario.senha)
      menu.validarUsuarioLogado(usuario.nome)

      menu.irParaProdutos()
      produtos.adicionarAoCarrinho(1)
      produtos.adicionarAoCarrinho(2)

      menu.irParaCarrinho()
      carrinho.validarPaginaCarrinho(2)
      carrinho.prosseguirParaCheckout()

      checkout.validarDetalhesDoPedido(usuario)
      checkout.adicionarComentarioEFinalizar(this.pagamento.comentarioPedido)
      checkout.pagar(this.pagamento)
      checkout.validarPedidoConfirmado()

      menu.excluirConta()
    })
  })
})
