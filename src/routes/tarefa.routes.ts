import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController";

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.post('/', controller.create);
tarefaRoutes.get('/', controller.getAll);
tarefaRoutes.get('/:id', controller.getById);
tarefaRoutes.put('/:id', controller.update);
tarefaRoutes.delete('/:id', controller.delete);

export { tarefaRoutes };