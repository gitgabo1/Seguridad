import express from 'express';
import mongoose from 'mongoose';
import authJwt from './helpers/jwt';
import {error_handler} from './helpers/error_handler';

import productsRouter from './routes/product';
import usersRouter from './routes/user';
import cors from 'cors';


const app=express();
const api="/api/v1";

app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(authJwt);
app.use(error_handler);

app.use(`${api}/product`,productsRouter)
app.use(`${api}/user`,usersRouter)

mongoose.connect('mongodb://root:example@localhost:27017/',{
    dbName: 'MERN_SHOP',
})
.then(()=>{
    console.log("Database connection is ready...")
})
.catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log(`The server was running in port ${3000}`)
})