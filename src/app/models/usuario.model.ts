export interface Usuario {
  /** Chave gerada pelo Firebase (igual ao id de Animal). */
  id: string;
  nome: string;
  email: string;
  /**
   * Senha em texto puro, sem hash.
   * Simplificação aceitável para fins didáticos; em uma aplicação real
   * isso nunca deveria ser feito (usar Firebase Auth ou hash + salt).
   */
  senha: string;
  /**
   * Token fixo, gerado uma única vez no cadastro e gravado junto com o
   * usuário no Firebase. O login não gera um token novo: só busca o
   * usuário pelo e-mail/senha e copia esse valor para o localStorage.
   */
  token: string;
}
