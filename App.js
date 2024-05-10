const express = require('express');
const app = express();
const fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, resp) => {
    fs.readFile('pessoas.json', 'utf8', (error, data) => {
        if (error){
            console.log('Erro ao ler o arquivo', error)
            resp.status(500).send('Erro ao ler o arquivo')
            return
        }

        const pessoas = JSON.parse(data).pessoas
        resp.render('index', {pessoas})
    });
});

app.post('/adicionar', (req, res) => {
//console.log(req.body)
const novaPessoa = { nome: req.body.nome, idade: parseInt(req.body.idade)};
fs.readFile('pessoas.json', 'utf8', (error,data) => {
    if(error) {
        console.log('Erro ao escrever o arquivo:', error)
        req.status(500).send('Erro ao ler o arquivo')
        return
    }

    const json = JSON.parse(data)
    json.pessoas.push(novaPessoa)

    fs.writeFile('pessoas.json', JSON.stringify(json, null, 2), 'utf8', (error)=>{
        if(error) {
            console.log('Erro ao escrever o arquivo:', error)
            req.status(500).send('Erro ao escrever o arquivo')
            return
        }
        res.redirect('/')
    })
})
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/* Para rodar: node App.js
   Para encerrar: Ctrl + C
   Para inicializar o projeto: npm init -y
   Para instalar dependências: npm install <nome-dependencia>
*/