import express from "express";
import cors from "cors";
import pool from "./db.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/fetch',async(req,resp)=>{
    try{
        const result = await pool.query('select * from inventory');
        resp.json(result.rows);
        console.log('response sent');
    } catch(err){
        console.error(err.message);
        resp.status(500).send('Server Error');
    }
});

app.get('/search',async(req,res)=>{
    const {query} = req.query;
    if(!query){
        return res.status(400).json({ error: 'Query parameter is missing' });
    }
    try{
        const result = pool.query(
            'SELECT name FROM inventory WHERE name ILIKE $1 LIMIT 10',[`%${query}%`]
        );
        res.status(200).json(result.rows);
    }catch (error) {
    console.error('Error querying inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory data' });
  }
});

app.post('/form',async(req,res)=>{
    const {item,quantity,ID} = req.body;

    try{
        const result = await pool.query('insert into inventory VALUES($1,$2,$3)',[ID,item,quantity]);
        console.log('Inserted data:', result.rows[0]);

    // Send a success response
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, message: 'Failed to store form data' });
  }
});
app.post('/remove',async(req,res)=>{
    const {ID} = req.body;

    try{
        const result = await pool.query('delete from inventory where ID=$1',[ID]);
        console.log('Removed data');
        res.status(200).json({ success: true});
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, message: 'Failed to store form data' });
  }
});

app.listen(PORT,()=>{
    console.log('server running ');
});

