import express from "express";
import { tarefaRoutes } from "../routes/tarefa.routes";

const app = express();
app.use(express.json());
app.use('/tarefas', tarefaRoutes);

export { app };