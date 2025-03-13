import express from 'express';
import 'dotenv/config';
import pool from "./Config/mysql.js";
import platsRoutes from "./routes/platsRoutes.js";
import commandesRoutes from "./routes/commandesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const PORT= process.env.PORT
const app= express();
app.use(express.json());
/*
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

const dishes=[
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
*/

app.use("/commandes", commandesRoutes);
app.use("/plats", platsRoutes);
app.use("/users", userRoutes);

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


app.get ('/dishes', async (req, res) => {
    try{

        const connection = await mysql.getConnection();

        const [dishes] = await connection.execute('SELECT * FROM dishes');

        const dishesWithIngredients = await Promise.all(dishes.map(async (dish) =>{
            const [ingredients] = await connection.execute(`
                SELECT i.id, i.name, di.quantity
                FROM ingredients i
                JOIN dish_ingredients di ON i.id = di.ingredient_id
                WHERE di.dish_id = ?
                `, [dish.id]);
        
                return {
                    ...dish,
                    ingredients
            };
            }));
        connection.release();
        res.json(dishesWithIngredients);
    } catch (err)  {
        res.status(500).json({ error: err.message});
    }
});

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log("réussite");
      connection.release();
    } catch (error) {
      console.error("échec :", error.message);
    }
  })();


app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`)
});