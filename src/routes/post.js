import express from 'express';
import {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { validate } from '../middlewares/validate.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.js';
import { postSchema, postUpdateSchema } from '../validators/postValidator.js';

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todos os posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Não autorizado
 */
router.get('/', listPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obter post por ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Dados do post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Criar novo post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dúvida sobre Cálculo
 *               content:
 *                 type: string
 *                 example: Como resolver integral dupla?
 *               subject:
 *                 type: string
 *                 example: Cálculo II
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (requer role admin)
 */
router.post('/', authorizeRoles('admin'), validate(postSchema), createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualizar post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (requer role admin)
 */
router.put('/:id', authorizeRoles('admin'), validate(postUpdateSchema), updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Deletar post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (requer role admin)
 */
router.delete('/:id', authorizeRoles('admin'), deletePost);

export default router;
