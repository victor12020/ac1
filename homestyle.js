const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express;

app.use(bodyParser.json());
const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/homestyle",{  
  useNewUrlParser: true,  
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({  
  email: { type: String, required: true },  
  senha: { type: String}
});

const produtoDecoracaoSchema = new mongoose.Schema({  
  id_produtodecoracao : {type: mongoose.ObjetcId, required: true},
  descricao: {type: String},
  fornecedor: {type: String},
  dataFabricacao: {type: Date},
  quantidadeEstoque: {type: Number}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produto = mongoose.model("Produto", produtoDecoracaoSchema);

app.post("/cadastroUsuario", async (req, res) =>{
   const email = req.body.email;
   const senha = req.body.senha;
   const usuario = new Usuario({ 
     email: email,
     senha: senha
   })
try {
  const newUsuario = await usuario.save();    
  res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });  
} catch (error) {}})

app.post("/cadastroProdutoDecoracao", async (req, res) =>{
   const id_produtodecoracao = req.body.id_produtodecoracao;
   const descricao = req.body.descricao;
   const fornecedor = req.body.fornecedor;
   const dataFabricacao = req.body.dataFabricacao;
   const quantidadeEstoque = req.body.quantidadeEstoque;
   const produto = new Produto({ 
     id_produtodecoracao: id_produtodecoracao,
     descricao: descricao,
     fornecedor: fornecedor,
     dataFabricacao: dataFabricacao,
     quantidadeEstoque: quantidadeEstoque,
   })
try {
  const newProduto = await produto.save();    
  res.json({ error: null, msg: "Cadastro ok", ProdutoId: newProduto._id });  
} catch (error) {}})

app.get("/", async()=>{
res.sendFile(__dirname + "/index.html")
});

app.listen(port, ()=>{    
  console.log(`Servidor rodanda na porta ${port}`)
});
