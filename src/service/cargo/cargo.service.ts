import { Injectable } from '@nestjs/common';
import { CargoRepository } from 'src/repository/database/cargo/cargo.repository';
import { BaseServiceGeneric, BasicResponseInterface } from '../service.generic';

@Injectable()
export class CargoService extends BaseServiceGeneric{
  constructor(
    private cargoRepository: CargoRepository,
  ) { super() }

  async carregarTodos(): Promise<BasicResponseInterface>  {
    let cargos: any = await this.cargoRepository.buscaTodosCargos();
    if (!cargos) return this.createReturn(204, "Não foi encontrado registros!")
    return this.createReturn(200, cargos)
  }

  async criarCargo(cargo): Promise<BasicResponseInterface> {
    const existCargo = await this.cargoRepository.buscaCargoPeloNome(cargo.nome)
    if (existCargo) return this.createReturn(409, "Cargo já foi cadastrado")

    return this.createReturn(201, await this.cargoRepository.cadastrarCargo(cargo))
  }

  async findByNome(nome: string): Promise<BasicResponseInterface> {
    const cargo = await this.cargoRepository.buscaCargoPeloNome(nome)
    if (!cargo) return this.createReturn(404,"Cargo não encontrado!")
    return this.createReturn(200, cargo)
  }

  async findById(id_cargo: number): Promise<BasicResponseInterface> {
    const cargo = await this.cargoRepository.buscaCargoPeloId(id_cargo)
    if (!cargo) return this.createReturn(404,"Cargo não encontrado!")
    return this.createReturn(200, cargo)
  }

  async atualizar(id_cargo: number, data): Promise<BasicResponseInterface> {
    const cargo = await this.cargoRepository.buscaCargoPeloId(id_cargo)
    if (!cargo) return this.createReturn(404,"Cargo não encontrado!")
    return this.createReturn(200, await this.cargoRepository.atualizar(id_cargo, data))
  }

  async deletar(id_cargo: number): Promise<BasicResponseInterface> {
    if (!id_cargo) return this.createReturn(422,"Passe o parametro corretamente!")
    const cargo = await this.cargoRepository.buscaCargoPeloId(id_cargo)
    if (!cargo) return this.createReturn(404,"Cargo não encontrado!")
    return this.createReturn(200, await this.cargoRepository.deletar(id_cargo))
  }

}