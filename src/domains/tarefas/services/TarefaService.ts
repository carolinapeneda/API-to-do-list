import type { Tarefa } from "../models/Tarefa";

const tarefas: Tarefa[] = [];

class TarefaService {
    create({ title }: Omit<Tarefa, "id" | "completed">) {
        if(!title) {
            throw new Error("Nome da tarefa é obrigatório");
        }

        const novoId = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1; //criar id com numeros inteiros e sequenciais
        const novaTarefa = { id: novoId, title, completed: false};
        tarefas.push(novaTarefa);

        return novaTarefa;
    }

    list(completedStatus?: string) {
        if(completedStatus === "true") {
            return tarefas.filter(t => t.completed === true);
        }
        if(completedStatus === "false") {
            return tarefas.filter(t => t.completed === false);            
        }
        return tarefas;
    }

    list_id(id: number) {
        const tarefaEncontrada = tarefas.find(t => t.id === id);
        return tarefaEncontrada;
    }

    update(id: number, title: string, completed: boolean) {
        const tarefa = tarefas.find(t => t.id === id);
        if(!tarefa) return undefined;
        tarefa.title = title;
        tarefa.completed = completed;
        return tarefa;
    }

    delete(id: number) {
        const index = tarefas.findIndex(t => t.id === id);
        if(index === -1) {
            return false;
        }
        tarefas.splice(index, 1);
        return true;
    }
}

export { TarefaService };