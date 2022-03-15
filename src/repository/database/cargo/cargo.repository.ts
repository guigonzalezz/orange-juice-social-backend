import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CargoV2 } from './entidades/cargo.entity';

@Injectable()
export class CargoRepository {
  constructor(
    @InjectRepository(CargoV2)
    private cargoRepository: Repository<CargoV2>,
  ) { }

  async buscaTodosCargos(): Promise<CargoV2[]>{
    return await this.cargoRepository.find()
  }

  async buscaCargoPeloNome(nome) {
    return await this.cargoRepository.findOne({nome})
  }

  async buscaCargoPeloId(id_cargo) {
    return await this.cargoRepository.findOne({id_cargo})
  }

  async cadastrarCargo(cargo) {
      return await this.cargoRepository.save(cargo)
  }

  async toggleAtivoOuInativo(cargo) {
    await getConnection()
      .createQueryBuilder()
      .update(CargoV2)
      .set({ ativo_SN: cargo.ativo_SN == 'S' ? 'N' : 'S' })
      .where("id_cargo = :id", { id: cargo.id_cargo })
      .execute();

    return true
  }

  async atualizar(id_cargo: number, data) {
    await this.cargoRepository.update(id_cargo, data);
    return await this.cargoRepository.findOne({ id_cargo })
  }

  async deletar(id_cargo: number) {
    const res = await this.cargoRepository.delete({ id_cargo });
    switch (res.raw.affectedRows) {
      case 1:
        return true 
      case 0:
        return false 
      default:
        return "Houve um erro ao realizar a deleção!"
    }
  }

}