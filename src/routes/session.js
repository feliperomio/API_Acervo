import express from 'express';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/sessionController.js';
import { validate } from '../middlewares/validate.js';
import { sessionSchema, sessionUpdateSchema } from '../validators/sessionValidator.js';

const router = express.Router();

router.post('/', validate(sessionSchema), createSession);
router.get('/', getSessions);
router.get('/:id', getSessionById);
router.put('/:id', validate(sessionUpdateSchema), updateSession);
router.delete('/:id', deleteSession);

export default router;
