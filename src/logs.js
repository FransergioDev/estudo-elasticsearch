import { configDotenv } from 'dotenv'
import axios from "axios";

configDotenv()

const elasticClient = axios.create({
    baseURL: process.env.ELASTIC_HOST,
    auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD,
    },
});

const logs =  {

    async logger(level, message, service = 'estudo-elastic-search') {

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
    },
    async buscarLogs() {
        try {
            const response = await elasticClient.get('/logs/_search', {
                params: {
                    pretty: true,
                    size: 10 // pegar até 10 documentos
                }
            });
            console.log('Logs encontrados:', JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar logs:', error.response?.data || error.message);
            throw  error;
        }
    },
    async buscarErros() {
        try {
            const response = await elasticClient.post('/logs/_search', {
                query: {
                  match: { level: "error" }
                }
              });

            return response.data;
        } catch (error) {
            console.error('Erro ao buscar logs:', error.response?.data || error.message);
            throw  error;
        }
    }
}

export default logs