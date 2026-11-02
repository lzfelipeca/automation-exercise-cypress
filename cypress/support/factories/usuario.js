import { faker } from '@faker-js/faker'

// Gera um usuário único a cada execução, evitando conflito de e-mail entre testes.
export function gerarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `qa.${Date.now()}.${faker.string.alphanumeric(5).toLowerCase()}@teste.com`,
    senha: faker.internet.password({ length: 10 }),
    dia: '25',
    mes: '8',
    nomeMes: 'August',
    ano: '1990',
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    complemento: faker.location.secondaryAddress(),
    pais: 'Canada',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(11)
  }
}
