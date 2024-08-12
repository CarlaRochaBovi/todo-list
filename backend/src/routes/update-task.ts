import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";
export async function updateTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string().uuid()
        }),
        body: z.object({
          name: z.string().max(20),
          details: z.string().max(350)
        })
      }
    },
    async (request, reply) => {
      const { taskId } = request.params;
      const { name, details } = request.body

      try {
        const task = await prisma.task.update({
          where: { id: taskId },
          data: { name, details }
        });

        return { task }
      } catch (error) {
        if (error.code === 'P2025') {
          reply.status(404).send({ message: 'Task not found' });
        } else {
          console.error(error);
          reply.status(500).send({ message: 'Error on updating task' });
        }
      }
    }
  );
}
