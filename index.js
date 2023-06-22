const { ApolloServer, gql } = require("apollo-server");

const usuarios = [
  {
    id: 1,
    nome: "teste 1",
    email: "teste1@gmail.com",
    idade: 21,
  },
  {
    id: 2,
    nome: "teste 2",
    email: "teste2@gmail.com",
    idade: 22,
  },
  {
    id: 3,
    nome: "teste 3",
    email: "teste3@gmail.com",
    idade: 23,
  },
];

//Em typeDefs, o uso do ! é para dizer que o campo
//é obrigatório no retorno, caso contrário, dará erro.

const typeDefs = gql`
  scalar Date

  type Mutation {
    novoUsuario(nome: String,
      email: String,
      idade: Int): Usuario!
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

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
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]! #Retorna obrigatoriamente um array e seus elementos obrigatoriamente devem ser inteiros
    usuarios: [Usuario]!
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(valor) {
      return valor.preco - valor.preco * valor.desconto;
    },
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
  },
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
        salario_real: 200000000.43,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Notebook",
        preco: 4890.8,
        desconto: 0.15,
      };
    },
    numerosMegaSena() {
      return [4, 8, 13, 27, 33, 54];
    },
    usuarios() {
      return usuarios;
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
