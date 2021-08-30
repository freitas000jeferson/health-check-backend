const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_out.json';
const doc = {
  info: {
    title: 'Health-check-backend',
    version: 'v1.0.0-beta',
    description: 'A API built on top of expressJS',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    }, // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development Environment - v1',
    },
  ],
  externalDocs: {
    url: '',
    description: 'Postman',
  },
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'User',
    },
  ],
};
// const endpointsFiles = ['src/config/express'];
const endpointsFiles = require('../../routes');

swaggerAutogen(outputFile, endpointsFiles, doc);
