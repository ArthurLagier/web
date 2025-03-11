import express from 'express';
import mysql from '../Config/mysql.js';

const router =express.Router();


router.get ('/dishes', async (req, res) => {
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











