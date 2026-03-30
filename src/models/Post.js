import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    autor: { type: String, required: true, trim: true },
    conteudo: { type: String, required: true, trim: true },
    categoria: { type: String, trim: true },
    publicadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
