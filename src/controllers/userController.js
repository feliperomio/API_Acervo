import User from '../models/User.js';


export async function listMentors(req, res, next) {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password'); // exclui password
    res.json(mentors);
  } catch (err) { next(err); }
}


export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) { next(err); }
}


export async function updateProfile(req, res, next) {
  try {    
const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) { next(err); }
}


export async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário deletado' });
  } catch (err) { next(err); }
}


export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { next(err); }
}
