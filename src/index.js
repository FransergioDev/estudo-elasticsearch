import { configDotenv } from 'dotenv'
import Fastify from 'fastify'
import logs from './logs.js'

configDotenv()

const fastify = Fastify({
  logger: true
})


fastify.get('/', async function handler (request, reply) {
  reply.code(200).send({ message: "Bem vindo! Projeto de estudo do ElasticSearch" })
})

fastify.post('/test', async function handler (request, reply) {
  const body = request.body

  console.log('test', body)

  try {
    await logs.logger('audit', 'Teste 123')
    return reply.code(200).send({ message: "Log registrado no ElasticSearch" })
  } catch (error) {
    return reply.code(500).send({ message: "Falha ao registrar o log no ElasticSearch" })
  }
})

fastify.get('/test-list', async function handler (request, reply) {
  try {
    const data = await logs.buscarLogs('audit', 'Teste 123')
    return reply.code(200).send({ data: data })
  } catch (error) {
    return reply.code(500).send({ message: "Falha ao buscar logs no ElasticSearch" })
  }
})


try {
  await fastify.listen({ port: 3538 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}