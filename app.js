import router from './router/rotas.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

app.listen(9000, () => {
    const date = new Date();
    console.log(`Servidor iniciado em ${date}`)
});