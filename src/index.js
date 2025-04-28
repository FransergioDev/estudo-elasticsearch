import Fastify from 'fastify'
import logger from './logger.js'

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
    logger('audit', 'Teste 123')
    return reply.code(200).send({ message: "Log registrado no ElasticSearch" })
  } catch (error) {
    return reply.code(500).send({ message: "Falha ao registrar o log no ElasticSearch" })
  }
})


try {
  await fastify.listen({ port: 3538 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}