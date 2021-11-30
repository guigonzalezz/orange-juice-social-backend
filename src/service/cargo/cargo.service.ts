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

  async carregarTodos() {
    const cargos = await this.cargoRepository.find();
    if (!cargos) return { code: 204, error: "Não foi encontrado registros!" }
    return {
      code: 200,
      data: cargos
    }
  }

  async criarCargo(cargo: DeepPartial<CargoDto>) {
    const existCargo = await this.cargoRepository.findOne({ nome: cargo.nome })
    if (existCargo) return { code: 409, error: "Cargo já foi cadastrado" }

    return {
      code: 201,
      data: await this.cargoRepository.save(cargo)
    };
  }

  async findByNome(nome: string) {
    const cargo = await this.cargoRepository.findOne({
      where: {
        nome: nome,
      },
    })
    if (!cargo) return { code: 404, error: "Cargo não encontrado!" }
    return { code: 200, data: cargo };
  }

  async findById(id_cargo: number) {
    const cargo = await this.cargoRepository.findOne(id_cargo)
    if (!cargo) return { code: 404, error: "Cargo não encontrado!" }
    return { code: 200, data: cargo };
  }

  async atualizar(id_cargo: number, data: QueryDeepPartialEntity<CargoDto>) {
    if (!await this.cargoRepository.findOne(id_cargo)) return { code: 404, error: 'Cargo não encontrado!' };
    await this.cargoRepository.update(id_cargo, data);
    return {
      code: 200,
      data: await this.cargoRepository.findOne({ id_cargo })
    }
  }

  async deletar(id_cargo: number) {
    if (!id_cargo) return { code: 422, error: "Passe o parametro corretamente!" };

    let res;
    if (await this.cargoRepository.findOne({ id_cargo })) {
      res = await this.cargoRepository.delete({ id_cargo });
      switch (res.raw.affectedRows) {
        case 1:
          return { code: 200, data: true }
        case 0:
          return { code: 204, error: false }
        default:
          return { code: 500, error: "Houve um erro ao realizar a deleção!" }

      }
    }
    else {
      return { code: 404, error: "Cargo não foi encontrado!" }
    }
  }

}