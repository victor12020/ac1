//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/homestyle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const produtoDecoracaoSchema = new mongoose.Schema({
    id_produtodecoracao : {type : String, required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    datafabricacao : {type : Date},
    quantidadeestoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const produtoDecoracao = mongoose.model("ProdutoDecoracao",produtoDecoracaoSchema)

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});


//rota de cadastro especifico
app.post("/cadastroprodutodecoracao", async (req, res) => {
    
    
    const id_produtodecoracao = req.body.id_produtodecoracao;
    const descricao = req.body.descricao;
    const fornecedor = req.body.id_fornecedor;
    const datafabricacao = req.body.datafabricacao;
    const quantidadeestoque = req.body.quantidadeestoque;
     
    const produtodecoracao = new produtoDecoracao({
      id_produtodecoracao: id_produtodecoracao,
      descricao: descricao,
      fornecedor: fornecedor,
      datafabricacao: datafabricacao,
      quantidadeestoque: quantidadeestoque
    });
  
    try {
      const newProdutoDecoracao = await produtodecoracao.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutocabeloId: newProdutoDecoracao._id });
    } catch (error) {}
  
  });

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});