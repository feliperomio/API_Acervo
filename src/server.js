import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import sessionRoutes from './routes/session.js';
import postRoutes from './routes/post.js';
import errorHandler from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Documentação Swagger
app.get('/api-docs.json', (req, res) => res.json(swaggerSpecs));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Monitoria Acadêmica API',
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', authenticate, sessionRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta: http://localhost:${PORT}/api-docs`));
  })

  .catch((err) => console.error('MongoDB erro de conexao:', err));
