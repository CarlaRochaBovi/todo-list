import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getAllTasks(app: FastifyInstance) {
  const TaskSchema = z.object({
    id: z.string(),
    name: z.string(),
    details: z.string(),
    is_completed: z.boolean(),
    created_at: z.coerce.date(),
  });

  app.withTypeProvider<ZodTypeProvider>().get(
    '/tasks',
    {
      schema: {
        response: {
          200: z.array(TaskSchema),
        },
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const tasks = await prisma.task.findMany();
        return tasks;
      } catch (error) {
        reply.status(500).send({ error: 'Failed to retrieve tasks' });
      }
    }
  );
}
