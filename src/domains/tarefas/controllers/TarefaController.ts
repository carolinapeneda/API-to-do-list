import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";

class TarefaController {
    
    create(req: Request, res: Response) {
        try {
            const { title } = req.body;
            const service = new TarefaService();
            const tarefa = service.create({title});
            return res.status(201).json(tarefa);
        } catch(error) {
            if(error instanceof Error) { //verifica se erro é uma instancia da classe global
                return res.status(400).json({erro: error.message});
            }
            return res.status(400).json({erro: "Erro inesperado"});
        }
    }

    list(req: Request, res: Response) {
        const service = new TarefaService();
        const filtroCompleted = req.query.completed as string;
        const tarefas = service.list(filtroCompleted);
        return res.status(200).json(tarefas);
    }

    list_id(req: Request, res: Response) {
        const service = new TarefaService();
        const idDaTarefa = Number(req.params.id);
        const tarefa = service.list_id(idDaTarefa);
        if(!tarefa) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(200).json(tarefa);
    }

    update(req: Request, res: Response) {
        const service = new TarefaService();
        const idTarefa = Number(req.params.id);
        const { title, completed } = req.body; 
        const tarefaAtualizada = service.update(idTarefa, title, completed);
        if(!tarefaAtualizada) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(200).json(tarefaAtualizada);
    }

    delete(req: Request, res: Response) {
        const service = new TarefaService();
        const idTarefa = Number(req.params.id);
        
        const deletou = service.delete(idTarefa);

        if(!deletou) {
            return res.status(404).json({erro: "Tarefa não encontrada!"});
        }
        return res.status(204).send();
    }
}

export { TarefaController };