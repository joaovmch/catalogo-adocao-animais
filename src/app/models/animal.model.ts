export type Porte = 'Pequeno' | 'Médio' | 'Grande';
export type StatusAdocao = 'Disponível' | 'Em processo' | 'Adotado';
export type Especie = 'Cachorro' | 'Gato' | 'Coelho';

export interface Animal {
  id: number;
  nome: string;
  especie: Especie;
  idade: string;
  porte: Porte;
  statusAdocao: StatusAdocao;
  descricao: string;
  foto: string;
}
