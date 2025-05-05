import { Client } from 'es7';
import { configDotenv } from 'dotenv'

configDotenv()

const client = new Client({
  node: 'http://localhost:9200/',
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD,
  }
});

const elastic = {
    async connect_info() {
        try {
            return await client.info();
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            throw  error;
        }
    },
    async logger(level, message) {
        try {
            return await client.index({
                index: 'logs',
                body: {
                    message: message ?? 'Log de teste',
                    level: level,
                    timestamp: new Date(),
                }
            });
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            throw  error;
        }
    },
    async getLogger() {
        try {
            const result = await client.search({
                index: 'logs',
                body: {
                    query: {
                        match: { level: "error" }
                    }
                }
            })

            return result;
            
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            throw  error;
        }
          
    },

}

export default elastic;