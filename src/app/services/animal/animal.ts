import { Injectable, signal } from '@angular/core';
import { Animal } from '../../models/animal.model';

/**
 * Dados iniciais em memória (mock).
 * Na Release 2 esses dados passam a vir do Firebase Realtime Database;
 * por enquanto a "persistência" vive só durante a sessão do navegador.
 */
const ANIMAIS_INICIAIS: Animal[] = [
  { id: 1, nome: 'Rex', especie: 'Cachorro', idade: '2 anos', porte: 'Grande', statusAdocao: 'Disponível', descricao: 'Brincalhão e adora correr no quintal. Já é vacinado.', foto: 'assets/animais/animal1.png' },
  { id: 2, nome: 'Mimi', especie: 'Gato', idade: '1 ano', porte: 'Pequeno', statusAdocao: 'Disponível', descricao: 'Gata carinhosa, gosta de colo e de janelas ensolaradas.', foto: 'assets/animais/animal2.png' },
  { id: 3, nome: 'Bolt', especie: 'Cachorro', idade: '4 anos', porte: 'Médio', statusAdocao: 'Em processo', descricao: 'Já está em processo de adoção com uma família.', foto: 'assets/animais/animal3.png' },
  { id: 4, nome: 'Luna', especie: 'Gato', idade: '3 anos', porte: 'Pequeno', statusAdocao: 'Disponível', descricao: 'Calma e independente, ideal para apartamento.', foto: 'assets/animais/animal4.png' },
  { id: 5, nome: 'Thor', especie: 'Cachorro', idade: '6 anos', porte: 'Grande', statusAdocao: 'Disponível', descricao: 'Cão de guarda gentil, ótimo com crianças.', foto: 'assets/animais/animal5.png' },
  { id: 6, nome: 'Nina', especie: 'Coelho', idade: '8 meses', porte: 'Pequeno', statusAdocao: 'Disponível', descricao: 'Filhote curiosa, precisa de espaço para pular.', foto: 'assets/animais/animal6.png' },
  { id: 7, nome: 'Max', especie: 'Cachorro', idade: '1 ano', porte: 'Médio', statusAdocao: 'Em processo', descricao: 'Animado e cheio de energia, ideal para quem gosta de caminhar.', foto: 'assets/animais/animal7.png' },
  { id: 8, nome: 'Bibi', especie: 'Gato', idade: '5 anos', porte: 'Pequeno', statusAdocao: 'Adotado', descricao: 'Já encontrou uma família e está muito feliz.', foto: 'assets/animais/animal8.png' },
  { id: 9, nome: 'Duda', especie: 'Cachorro', idade: '3 anos', porte: 'Médio', statusAdocao: 'Disponível', descricao: 'Dócil e companheira, adora um cafuné.', foto: 'assets/animais/animal9.png' },
  { id: 10, nome: 'Apollo', especie: 'Gato', idade: '2 anos', porte: 'Médio', statusAdocao: 'Disponível', descricao: 'Esperto e brincalhão, gosta de arranhadores.', foto: 'assets/animais/animal10.png' },
];

/**
 * Service responsável pelo CRUD da entidade principal (Animal).
 *
 * Release 1 (v1.0): tudo em memória, usando signal() como estado reativo.
 * Release 2 (v2.0): os métodos abaixo passam a conversar com o Firebase
 * Realtime Database, mas a interface pública (listar/adicionar/atualizar/remover)
 * deve continuar a mesma para não quebrar quem consome o service.
 */
@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private animais = signal<Animal[]>(ANIMAIS_INICIAIS);

  /** Retorna o signal com a lista completa de animais. */
  listar() {
    return this.animais;
  }

  /** Busca um animal específico pelo id. */
  obterPorId(id: number): Animal | undefined {
    return this.animais().find((animal) => animal.id === id);
  }

  /** Cadastra um novo animal, gerando o próximo id disponível. */
  adicionar(dados: Omit<Animal, 'id'>): Animal {
    const novoAnimal: Animal = { id: this.proximoId(), ...dados };
    this.animais.update((lista) => [...lista, novoAnimal]);
    return novoAnimal;
  }

  /** Atualiza um animal já existente (substitui pelo id). */
  atualizar(animalAtualizado: Animal): void {
    this.animais.update((lista) =>
      lista.map((animal) => (animal.id === animalAtualizado.id ? animalAtualizado : animal)),
    );
  }

  /** Remove um animal do catálogo pelo id. */
  remover(id: number): void {
    this.animais.update((lista) => lista.filter((animal) => animal.id !== id));
  }

  private proximoId(): number {
    const ids = this.animais().map((animal) => animal.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
