import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://elasticsearch:9200/',
  auth: {
      apiKey: ''
  }
});

const elastic = {
    async connect() {
        return await client.info();
    },
    async logger() {

    }

}

export default elastic;