const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/homestyle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const produtoDecoracaoSchema = new mongoose.Schema({
  id_produtodecoracao: { type: String, required: true },
  descricao: { type: String },
  fornecedor: { type: String },
  datafabricacao: { type: Date },
  quantidadeestoque: { type: Number },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const produtoDecoracao = mongoose.model(
  "ProdutoDecoracao",
  produtoDecoracaoSchema
);

app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  if(email == null || senha == null){
    return res.status(400).json({error : "Por favor, preencha todos os campos"});
  }

  const emailExists = await Usuario.findOne({email : email});
  if(emailExists){
    return res.status(400).json({error : "O e-mail informado já existe."})
  }


  const usuario = new Usuario({
    email: email,
    senha: senha,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroprodutodecoracao", async (req, res) => {
  const id_produtodecoracao = req.body.id_produtodecoracao;
  const descricao = req.body.descricao;
  const fornecedor = req.body.id_fornecedor;
  const datafabricacao = req.body.datafabricacao;
  const quantidadeestoque = req.body.quantidadeestoque;

  const id_produtodecoracaoExists = await produtoDecoracao.findOne({id_produtodecoracao : id_produtodecoracao});
  if(id_produtodecoracaoExists){
    return res.status(400).json({error : "O id informado já existe."})
  }

  if(quantidadeestoque > 23){
    return res.status(400).json({error : "a quantidade de estoque foi superado, por isso não é possivel fazer o cadastro."})
  }

  if(quantidadeestoque <= 0){
    return res.status(400).json({error : "Por favor digite uma quantidade positiva e menor que 23."})
  }

  const produtodecoracao = new produtoDecoracao({
    id_produtodecoracao: id_produtodecoracao,
    descricao: descricao,
    fornecedor: fornecedor,
    datafabricacao: datafabricacao,
    quantidadeestoque: quantidadeestoque,
  });

  try {
    const newProdutoDecoracao = await produtodecoracao.save();
    res.json({
      error: null,
      msg: "Cadastro ok",
      ProdutocabeloId: newProdutoDecoracao._id,
    });
  } catch (error) {}
});

app.get("/cadastrousuario", async(req,res)=>{
  res.sendFile(__dirname + "/cadastrousuario.html")
})

app.get("/cadastroprodutodecoracao", async(req,res)=>{
  res.sendFile(__dirname + "/cadastroprodutodecoracao.html")
})

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});