import mysql from '../Config/mysql';


export const getAllUsers = async (req, res, next) => {
    try{
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json({
            status: 'success',
            data: rows

        });






    }   
    catch (error) {
        next(error);
    }


};