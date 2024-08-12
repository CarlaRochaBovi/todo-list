import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string().uuid(),
        }),
      }
    },
    async (request, reply) => {
      const { taskId } = request.params
      try {
        const task = await prisma.task.findUnique({
          where: {
            id: taskId
          }
        });
        return task;
      } catch (error) {
        reply.status(500).send({ error: 'Failed to retrieve tasks' });
      }
    }
  );
}
