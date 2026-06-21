export type Porte = 'Pequeno' | 'Médio' | 'Grande';
export type StatusAdocao = 'Disponível' | 'Em processo' | 'Adotado';
export type Especie = 'Cachorro' | 'Gato' | 'Coelho';

export interface Animal {
  /**
   * Na Release 2 o id passa a ser a chave gerada pelo Firebase
   * (ex: "-NxAbc123Def"), por isso o tipo mudou de number para string.
   */
  id: string;
  nome: string;
  especie: Especie;
  idade: string;
  porte: Porte;
  statusAdocao: StatusAdocao;
  descricao: string;
  foto: string;
}
