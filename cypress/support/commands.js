// Comandos customizados de apoio (pré-condições e limpeza via API).
// A API pública do Automation Exercise é usada para preparar a massa de dados
// dos cenários que exigem um usuário já existente (casos 2, 4, 5 e 16),
// deixando a interface gráfica apenas para o que está sendo testado.

const parseBody = (body) => (typeof body === 'string' ? JSON.parse(body) : body)

Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: 'Mr',
      birth_date: usuario.dia,
      birth_month: usuario.mes,
      birth_year: usuario.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  }).then((resposta) => {
    const corpo = parseBody(resposta.body)
    expect(corpo.responseCode, 'usuário criado via API').to.eq(201)
  })
})

Cypress.Commands.add('excluirUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.senha },
    failOnStatusCode: false
  })
})
