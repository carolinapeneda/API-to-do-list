import { prisma } from "../../../config/prismaClient";
import type { Tarefa } from "../models/Tarefa";

const tarefas: Tarefa[] = [];

class TarefaService {
    async create(title: string) {
        const novaTarefa = prisma.task.create({ data: { title } });
        return novaTarefa;
    }

    async getAll(completedStatus?: string) {
        if(completedStatus === "true") {
            return await prisma.task.findMany({ where: { completed: true }});
        }
        if(completedStatus === "false") {
            return await prisma.task.findMany({ where: { completed: false }});            
        }
        return await prisma.task.findMany();
    }

    async getById(id: number) {
        const tarefaEncontrada = await prisma.task.findUnique({ where: { id }});
        return tarefaEncontrada;
    }

    async update(id: number, title: string, completed: boolean) {
        const tarefa = await prisma.task.findUnique({ where: { id }});
        if(!tarefa) return undefined;
        const tarefaAtualizada = await prisma.task.update({ where: { id }, data: { title, completed } });
        return tarefaAtualizada;
    }

    async delete(id: number) {
        const tarefa = await prisma.task.findUnique({ where: { id }});
        if(!tarefa) return undefined;
        await prisma.task.delete({ where: { id }});
        return true;
    }
}

export { TarefaService };