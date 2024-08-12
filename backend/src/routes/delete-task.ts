import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";
export async function deleteTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string().uuid()
        })
      }
    },
    async (request, reply) => {
      const { taskId } = request.params;

      try {
        await prisma.task.delete({
          where: {
            id: taskId
          }
        });

        reply.status(200).send({ message: 'Task deleted' });
      } catch (error) {
        if (error.code === 'P2025') {
          reply.status(404).send({ message: 'Task not found' });
        } else {
          console.error(error);
          reply.status(500).send({ message: 'Error on deleting task' });
        }
      }
    }
  );
}
