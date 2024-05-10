const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user:'rapha',
    password: 'senai123',
    database: 'mercado'
})

db.connect ((error)=>{
    if(error){
        console.log("Erro ao conectar com o banco de dados")
    }else {
        console.log("Conectado ao MySql");
    }
});
db.query('SELECT * FROM funcionario', (error, results)=> {
    if(error){
        console.log("Erro ao retornar a lista de funcionários")
    }else {
        console.log(results);
    }
});
db.query ('SELECT nome FROM cliente', (error, results)=> {
        if (error) {
            console.log("Erro ao lista o nome dos clientes")
        }else {
            console.log(results)
        }
});
db.query('SELECT nome as "nome do cliente" from cliente', (error, results)=> {
    if(error){
        console.log("Erro ao retormar a lista dos clientes")
    }else {
        console.log(results)
    }
});
db.query('SELECT nome as cliente from cliente LIMIT 3', (error, results)=> {
    console.log(results);
    console.log(results[1].cliente);
});
