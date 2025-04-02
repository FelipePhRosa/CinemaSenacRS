  import express from 'express' 
  import knexdb from './knexfile.js'
  import cors from 'cors'
  const app = express();     // Cria instancia do aplicativo Express
  app.use(express.json());  // Middleware para permitir que o servidor entenda JSON
  app.use(cors());          // Middleware para habilitar CORS e permitir que o frontend acesse o backend
  app.get("/", (req,res) =>{  //Rota principal ('/') que retorna uma mensagem
    res.send('Servidor Rodando!');
  });
  app.listen(3000, () => {   // Inicia o servidor na porta 3000
    console.log(`Server is running port:3000`);
  });

  // Working
  app.post("/diretores", async (req,res) =>{  //Rota que insere um diretor
    const {nameDiretor, ageDiretor, nationality} = req.body;
    const novoDiretor = await knexdb('diretor').insert({nameDiretor, ageDiretor, nationality});	

    res.send(`Diretor: ${nameDiretor} insert sucessfully!`);
  });

  app.post("/filmes", async (req, res) => {
    const {title, genre, release_year, id_diretor, id_ator} = req.body;
    const newFilm = await knexdb('filmes').insert({title, genre, release_year, id_diretor, id_ator});

    res.send(`Film: ${title} insert sucessfully!`)
  });

  // Working

  app.get("/diretores", async (req,res) =>{  //Rota que retorna todos os diretores
    const diretores = await knexdb('diretor').select('*');
    res.json(diretores);
  }); 

  app.get('/diretoresbyid', async (req, res) => {
    const { id_diretor } = req.query;
    const diretor = await knexdb('diretor').select('*').where({ id_diretor });
    if(diretor.length === 0){
      res.status(404).send('Director not found.');
    } else{
      res.json(diretor[0]);
    }
  });

  app.get("/filmes", async (req, res) => {
    const filmes = await knexdb('filmes').select('*')
    res.json(filmes)
  });

  app.get('/filmesbyid', async (req, res) => {
    const { id_filme } = req.body;
    const filme = await knexdb('filmes').select('*').where({id_filme})
    if(filme.lenght === 0){
      res.status(404).send('Film not found.')
    } else{
      console.log("// Information found's: ")
      console.log(filme[0]);
      res.json(filme[0])
    }
  });

  // Working
app.delete('/deldiretores', async (req, res) => {
  const { id_diretor } = req.body;
  if (!id_diretor) {
    return res.status(400).send('id_diretor is required.');
  }

  const diretor = await knexdb('diretor').where({ id_diretor }).delete();
  if (diretor === 0) {
    return res.status(404).send('Director not found.');
  } else {
    res.status(200).send('Director deleted successfully.');
  }
});
