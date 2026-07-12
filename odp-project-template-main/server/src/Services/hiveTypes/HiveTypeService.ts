import { IHiveTypeRepository } from "../../Domain/repositories/hiveTypes/IHiveTypeRepository";
import { HiveType } from "../../Domain/models/HiveType";
import { HiveTypeDto } from "../../Domain/DTOs/hiveType/HiveTypeDto";
import { CreateHiveTypeDto } from "../../Domain/DTOs/hiveType/CreateHiveTypeDto";

export class HiveTypeService {
  constructor(
    private readonly hiveTypeRepository: IHiveTypeRepository
  ) {}

  async getAll(): Promise<HiveTypeDto[]> {
    return await this.hiveTypeRepository.findAll();
  }

  async getById(id: number): Promise<HiveTypeDto | null> {
    return await this.hiveTypeRepository.findById(id);
  }

  async create(dto: CreateHiveTypeDto): Promise<HiveType> {
    return await this.hiveTypeRepository.create(dto);
  }

  async update(id: number, hiveType: HiveType): Promise<boolean> {
    return await this.hiveTypeRepository.update(id, hiveType);
  }

  async delete(id: number): Promise<boolean> {
    return await this.hiveTypeRepository.delete(id);
  }
}