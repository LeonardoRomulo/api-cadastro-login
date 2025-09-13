import routerUsuarios from './router/rotasUsuarios.js';
import express from 'express';
import cors from 'cors';
import routerServicos from './router/rotasServicos.js';
import routerBarbeiros from './router/rotasBarbeiros.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routerUsuarios);
app.use(routerBarbeiros);
app.use(routerServicos);

app.listen(9000, () => {
    const date = new Date();
    console.log(`Servidor iniciado em ${date}`)
});