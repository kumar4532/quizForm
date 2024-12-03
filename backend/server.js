import path from "path"
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const app = express();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })