const { ApolloServer, gql } = require("apollo-server");

//Em typeDefs, o uso do ! é para dizer que o campo
//é obrigatório no retorno, caso contrário, dará erro.

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Pontos de entrada da minha API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
  }
`;

const resolvers = {
  Query: {
    ola() {
      return "bom dia!";
    },
    horaAtual() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Luan Freire",
        email: "luancfreire@gmail.com",
        idade: 22,
        salario: 200000000.43,
        vip: true,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});