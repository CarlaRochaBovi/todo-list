import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";
export async function completeTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string().uuid()
        }),
        body: z.object({
          is_completed: z.boolean()
        })
      }
    },
    async (request, reply) => {
      const { taskId } = request.params;
      const { is_completed } = request.body

      try {
        const task = await prisma.task.update({
          where: { id: taskId },
          data: { is_completed }
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
