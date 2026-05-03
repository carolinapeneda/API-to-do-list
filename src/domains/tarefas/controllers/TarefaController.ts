import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";

const service = new TarefaService();
class TarefaController {
    
    async create(req: Request, res: Response) {
        try {
            const { title } = req.body;
            const task = await service.create(title);
            return res.status(201).json(task);
        } catch(error) {
            if(error instanceof Error) { //verifica se erro é uma instancia da classe global
                return res.status(400).json({erro: error.message});
            }
            return res.status(400).json({erro: "Erro inesperado"});
        }
    }

    async getAll(req: Request, res: Response) {
        const service = new TarefaService();
        const filtroCompleted = req.query.completed as string;
        const tarefas = await service.getAll(filtroCompleted);
        return res.status(200).json(tarefas);
    }

    async getById(req: Request, res: Response) {
        const service = new TarefaService();
        const idDaTarefa = Number(req.params.id);
        const tarefa = await service.getById(idDaTarefa);
        if(!tarefa) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(200).json(tarefa);
    }

    async update(req: Request, res: Response) {
        const service = new TarefaService();
        const idTarefa = Number(req.params.id);
        const { title, completed } = req.body; 
        const tarefaAtualizada = await service.update(idTarefa, title, completed);
        if(!tarefaAtualizada) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(200).json(tarefaAtualizada);
    }

    async delete(req: Request, res: Response) {
        const service = new TarefaService();
        const idTarefa = Number(req.params.id);
        
        const deletou = await service.delete(idTarefa);

        if(!deletou) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(204).send();
    }
}

export { TarefaController };