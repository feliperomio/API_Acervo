import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Monitoria Acadêmica API',
      version: '1.0.0',
      description: 'API para gerenciamento de monitorias acadêmicas',
      contact: {
        name: 'Suporte',
        email: 'suporte@monitoria.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desenvolvimento',
      },
      {
        url: 'https://api.monitoria.com',
        description: 'Servidor de produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              example: 'joao@example.com',
            },
            role: {
              type: 'string',
              enum: ['student', 'admin'],
              example: 'student',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              example: 'Dúvida sobre Cálculo',
            },
            content: {
              type: 'string',
              example: 'Como resolver integral dupla?',
            },
            subject: {
              type: 'string',
              example: 'Cálculo II',
            },
            author: {
              $ref: '#/components/schemas/User',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Erro ao processar requisição',
            },
            status: {
              type: 'integer',
              example: 400,
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Usa caminho absoluto para o Swagger encontrar as anotações
  // independentemente do diretório em que o processo foi iniciado.
  apis: [path.resolve(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

export default specs;
