import Post from '../models/Post.js';

export async function createPost(req, res, next) {
  try {
    const post = await Post.create({
      ...req.body,
      publicadoPor: req.user.id
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function listPosts(req, res, next) {
  try {
    const posts = await Post.find()
      .populate('publicadoPor', 'name email role')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate(
      'publicadoPor',
      'name email role'
    );

    if (!post) {
      return res.status(404).json({ error: 'Postagem nao encontrada' });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ error: 'Postagem nao encontrada' });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Postagem nao encontrada' });
    }

    res.json({ message: 'Postagem removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
