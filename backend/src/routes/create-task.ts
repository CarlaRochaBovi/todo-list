import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { prisma } from "../lib/prisma";

export async function createTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/tasks',
    {
      schema: {
        body: z.object({
          name: z.string().max(25),
          details: z.string().max(350)
        })
      }
    },

    async (request) => {
        const { name, details } = request.body

        try {
          const task = await prisma.task.create({
            data: {
              name,
              details
            }
          })

        return { taskId: task.id }

        } catch(error) {
          return { error: 'Failed to create task' };
        }

    }
  )
}