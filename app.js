const express = require('express')
const expressSession = require('express-session')
const db = require('./dbConnection')

const app = express()

// Configurações do Express
// ---------------------------------------------
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(expressSession({
  secret: 'key-session',
  resave: false,
  saveUninitialized: false
}))

// Rotas
// ---------------------------------------------

//rota home
app.get("/", async (req, res) => {
  //mostra os três primeiros posts
  var result = await db.query("SELECT * FROM postagens ORDER BY id_postagem DESC LIMIT 3")
  res.render("home/index", { post: result.rows, titulo: "Home" })
})
//rota posts
app.get("/posts", async (req, res) => {
  //mostra todos os posts
  var result = await db.query("SELECT * FROM postagens ORDER BY id_postagem")
  res.render("posts/posts", { posts: result.rows, titulo: "Postagens" })
})
//rota post
app.get("/post", async (req, res) => {
  //recuperar o id da noticia
  var id = req.query.id
  var result = await db.query(`SELECT * FROM postagens WHERE id_postagem = ${id}`)
  res.render("posts/post", { post: result.rows[0], titulo: "Postagem" })
})
//rota formulario
app.get("/admin", (req, res) => {
  if (req.session.autorizado) {
    res.render("admin/formAddPost", { titulo: "Novo Post", autorizado: req.session.autorizado })
  } else {
    res.render("admin/login", { titulo: "Login" })
  }
})
//rota salvar nova noticia
app.post("/admin/salvarForm", async (req, res) => {
  let { titulo, conteudo } = req.body
  await db.query("INSERT INTO postagens(titulo, conteudo) VALUES ($1, $2)", [titulo, conteudo], (err, result) => {
    res.redirect("/posts")
  })
})
//rota responsálvel por autenticar o usuário
app.post("/admin/autenticar", (req, res) => {
  const { usuario, senha } = req.body
  if (usuario == "root" && senha == "falc1234") {
    req.session.autorizado = true
  }
  res.redirect("/admin")
})
//rota responsavel pela saida do usuário
app.get("/admin/sair", (req, res) => {
  req.session.destroy((err) => { })
  res.redirect("/admin")
})

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando com express')
  console.log('Pressione CTRL+C para encerrar')
});