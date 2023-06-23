const config = require('config');
const username = config.get('usernameElastic')
const password = config.get('passwordElastic')
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: username,
      password: password
    }
})

async function searchByName(query) {
    const resp = await client.search({
      index: 'app',
      body: {
        query: {
          match: {
            name: query
          }
        },
        size:5
      }
    });
    
    return resp.hits.hits;
  }
  
  module.exports = searchByName ;