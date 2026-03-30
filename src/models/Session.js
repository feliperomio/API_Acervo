import mongoose from 'mongoose';


const sessionSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assunto: { type: String, required: true },
  descricao: { type: String },
  data: { type: Date, required: true }, // data do agendamento
  status: { type: String, enum: ['pendente', 'aprovada', 'concluida', 'cancelada'], default: 'pendente' },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Session', sessionSchema);