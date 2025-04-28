import axios from "axios";

async function logger(level, message, service = 'estudo-elastic-search') {
    const elasticClient = axios.create({
        baseURL: process.env.ELASTIC_HOST,
        auth: {
          username: process.env.ELASTIC_USER,
          password: process.env.ELASTIC_PASSWORD,
        },
      });

    try {
        const response = await elasticClient.post('/logs/_doc', {
            timestamp: new Date().toISOString(),
            level,
            message,
            service
        });

        console.log('Log enviado:', response.data);
    } catch (error) {
        console.error('Erro ao enviar log:', error.response?.data || error.message);
        throw  error;
    }
}

export default logger