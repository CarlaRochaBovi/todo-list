import fastify from 'fastify'
import cors from '@fastify/cors'
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'
import { createTask } from './routes/create-task'
import { getAllTasks } from './routes/get-all-tasks'
import { deleteTask } from './routes/delete-task'
import { updateTask } from './routes/update-task'
import { completeTask } from './routes/complete-task'
import { getTask } from './routes/get-task'

const app = fastify()

app.get('/teste', () => {
  return "Hello world"
})

app.register(cors, {
  origin: 'http://localhost:5173'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTask)
app.register(getAllTasks)
app.register(getTask)
app.register(deleteTask)
app.register(updateTask)
app.register(completeTask)

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running!")
})

