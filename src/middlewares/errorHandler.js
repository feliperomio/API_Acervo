export default function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.name}: ${err.message}`);


  // Erro de ID do MongoDB (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ error: 'Recurso não encontrado: ID Inválido.' });
  }


  // Erro de Duplicação de Chave (ex: e-mail já cadastrado)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `Este ${field} já está em uso.` });
  }


  // Erros de Validação do Mongoose (Campos obrigatórios, enums, etc.)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
   return res.status(400).json({ error: `Dados inválidos: ${messages.join(', ')}` });
  }


  // Erros de Token JWT (Expirado ou Inválido)
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token de acesso inválido ou malformado.' });
  }


  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Sua sessão expirou. Faça login novamente.' });
  }


  // Erro de Limite de Tamanho de Arquivo (Multer)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'O arquivo enviado excede o limite permitido.' });
  }


  // Erro de Sintaxe JSON no Body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON malformado no corpo da requisição.' });
  }


  // Erro de Acesso Negado (Customizado ou Role)
  if (err.status === 403) {
    return res.status(403).json({ error: 'Você não tem permissão para acessar este recurso.' });
  }


  // Resposta padrão para erros não mapeados
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'Erro interno do servidor.' : err.message;


  res.status(statusCode).json({
    error: message,
    // Stack trace apenas em desenvolvimento para segurança
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
