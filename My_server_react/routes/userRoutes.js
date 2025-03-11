import express from 'express';
import mysql from '../Config/mysql';


const router =express.Router();

router.get('/users', async(req, res)=>{

    try{
        const connection = await mysql.getConnection();
        const [row] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json(rows);}
        catch (err) {

            res.status(500).json({error: err.message});
        }
});

router.post('/user',async(req, res) =>{
    const {name, email, age} =req.body;
    try {
        const connection= await mysql.getConnection();
        const [result] = await connection.execute ('INSERT INTO users (name, email, age) VALUES (?,?,?)', [name, email, age]);
        connection.release();
        res.status(201).json({ id: result.insertId, name, email, age});
    }
catch(err){
    res.status(500).json({ error: err.message})
}
})

router.delete('/user/id', async(req, res) => {
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM users WHERE id =?', [id]);
        connection.release();
        res.json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;