import { Injectable, Inject } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CargoDto } from './dto/cargo.dto';

@Injectable()
export class CargoService {
  constructor(
    @Inject('CARGO_REPOSITORY')
    private cargoRepository: Repository<any>,
  ) { }

  async carregarTodos(): Promise<CargoDto[]> {
    return this.cargoRepository.find();
  }

  async criarCargo(cargo: DeepPartial<CargoDto>): Promise<CargoDto> {
    return await this.cargoRepository.save(cargo);
  }

  async findByNome(nome: string): Promise<CargoDto> {
    return await this.cargoRepository.findOne({
      where: {
        nome: nome,
      },
    });
  }

  async findById(id_cargo: number) {
    return await this.cargoRepository.findOne({ where: { id_cargo: id_cargo } });
  }

  async atualizar(id_cargo: number, data: QueryDeepPartialEntity<CargoDto>): Promise<CargoDto> {
    const element = await this.cargoRepository.findOneOrFail(id_cargo);
    if (!element.id_cargo) {
      console.error('Element não existe!');
    }
    await this.cargoRepository.update(id_cargo, data);
    return await this.cargoRepository.findOne({ id_cargo });
  }

  async deletar(id_cargo: number) {
    await this.cargoRepository.delete({ id_cargo });
    return { deleted: true };
  }

}