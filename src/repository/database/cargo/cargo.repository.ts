import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entidades/cargo.entity';

@Injectable()
export class CargoRepository {
  constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
  ) { }

  async buscaTodosCargos(): Promise<Cargo[]>{
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