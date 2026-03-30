import Session from '../models/Session.js';

export async function createSession(req, res, next) {
  try {
    const session = await Session.create({
      aluno: req.user.id,
      mentor: req.body.mentor,
      assunto: req.body.assunto,
      descricao: req.body.descricao,
      data: req.body.data,
      status: req.body.status || 'pendente'
    });

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
}

export async function getSessions(req, res, next) {
  try {
    const filterMaps = {
      aluno: { aluno: req.user.id },
      mentor: { mentor: req.user.id },
      admin: {},
      usuario: {}
    };

    const filter = filterMaps[req.user.role];

    if (filter === undefined) {
      return res
        .status(403)
        .json({ error: 'Perfil de usuario invalido para esta consulta.' });
    }

    const sessions = await Session.find(filter)
      .populate('aluno mentor', 'name email role photo')
      .sort({ data: -1 });

    res.json(sessions);
  } catch (err) {
    next(err);
  }
}

export async function getSessionById(req, res, next) {
  try {
    const session = await Session.findById(req.params.id).populate(
      'aluno mentor',
      'name email role photo'
    );

    if (!session) {
      return res.status(404).json({ error: 'Sessao nao encontrada' });
    }

    res.json(session);
  } catch (err) {
    next(err);
  }
}

export async function updateSession(req, res, next) {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!session) {
      return res.status(404).json({ error: 'Sessao nao encontrada' });
    }

    res.json(session);
  } catch (err) {
    next(err);
  }
}

export async function deleteSession(req, res, next) {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Sessao nao encontrada' });
    }

    res.json({ message: 'Sessao deletada' });
  } catch (err) {
    next(err);
  }
}
