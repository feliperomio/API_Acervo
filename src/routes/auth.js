import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { userSchema, loginSchema } from '../validators/userValidator.js';

const router = express.Router();

/**
     * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuario
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Joao Silva
 *               email:
 *                 type: string
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum: [usuario, admin, aluno, mentor]
 *                 example: usuario
 *               telefone:
 *                 type: string
 *                 example: 11999999999
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Usuario registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Dados invalidos
 *       409:
 *         description: Email ja registrado
 */
router.post('/register', validate(userSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Credenciais invalidas
 */
router.post('/login', validate(loginSchema), login);

export default router;
