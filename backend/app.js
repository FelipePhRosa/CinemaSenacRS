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
  console.log('Servidor rodando na porta 3000');
});

app.get("/diretores", async (req,res) =>{  //Rota que retorna todos os diretores
  const diretores = await knexdb('diretor').select('*');
  res.json(diretores);
});

app.post("/diretores", async (req,res) =>{  //Rota que insere um diretor
  const {nameDiretor, ageDiretor, nationality} = req.body;
  const novoDiretor = await knexdb('diretor').insert({nameDiretor, ageDiretor, nationality});	

  res.send(`Diretor ${nameDiretor} inserido com sucesso!`);
});

app.get('/diretores/:id', async (req, res) => {
  const { id_diretor } = req.params;
  const diretor = await knexdb('diretor').select('*');
  if(diretor.lenght === 0){
    res.status(404).send('Diretor não encontrado.');
  } else{
    res.json(diretor[0]);
  }
}); 

app.delete('/diretores/:id', async(req, res) => {
  const {id_diretor} = req.params;
  const diretor = await knexdb('diretor').where({id_diretor}).delete();
  if(diretor === 0){
    res.status(404).send('Diretor não encontrado.');
  } else {
    res.status(200).send('Diretor excluído com sucesso.');
  }
})