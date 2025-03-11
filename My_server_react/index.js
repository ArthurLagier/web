import express from 'express';
import 'dotenv/config';
const PORT= process.env.PORT
const app= express();
app.use(express.json());

const users=[
    {id:1,name:'amethis'},
    {id:2,name:'melia'},
]

const Prods=[
    {id:1,name:'potiron', Price:20},
    {id:2,name:'melon' ,Price:40},
    {id:3,name:'potiron', Price:50},
    {id:4,name:'citron' ,Price:70},
    {id:5,name:'tomate' ,Price:100},
    {id:6,name:'pomme' ,Price:50},
    {id:7,name:'carotte' ,Price:10},
    {id:8,name:'pomme de terre' ,Price:5},
    {id:9,name:'fruit du dragon' ,Price:100},
    {id:10,name:'mangue' ,Price:80},
    {id:11,name:'comcombre' ,Price:25},
    {id:12,name:'banane' ,Price:12},
    {id:13,name:'orange', Price:33},
    {id:14,name:'noix', Price:8},
    {id:15,name:'champignon' ,Price:5},
    {id:16,name:'main de boudha', Price:7},
    {id:17,name:'lichi' ,Price:9},
    {id:18,name:'kiwi' ,Price:17},
    {id:19,name:'pamplemousse' ,Price:41},
    {id:20,name:'citrouille' ,Price:120}
]

app.post('/Prod', (req, res) =>{
    const {name, price} =req.body;
    const newProd= {
        id:Prods.length+1,
        name,
        price
    };
    Prods.push(newProd);
    res.status(201).json(newProd);
})



app.get('/', (req, res)=> {
res.send('hello world!');
})

app.get('/Prod/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);
    const Prod = Prods.find((Prod) => Prod.id===parseInt(id));
    res.send(JSON.stringify(Prod));
})


app.get('/user/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);
    const user = users.find((user) => user.id===parseInt(id));
    res.send(JSON.stringify(user));
})

app.delete('/user/id', (req, res) =>{
    const userIndex= user =>user.id ===parseInt(req.params.id);
    users.splice(userIndex, 1)
    res.json
})



app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`)
});