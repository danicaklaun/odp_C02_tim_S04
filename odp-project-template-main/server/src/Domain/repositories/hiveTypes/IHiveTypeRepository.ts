import { HiveType } from "../../models/HiveType";
import { HiveTypeDto } from "../../DTOs/hiveType/HiveTypeDto";
import { CreateHiveTypeDto } from "../../DTOs/hiveType/CreateHiveTypeDto";

export interface IHiveTypeRepository {
    findAll(): Promise<HiveTypeDto[]>;
    findById(id: number): Promise<HiveTypeDto | null>;
    create(dto: CreateHiveTypeDto): Promise<HiveType>;
update(id: number, hiveType: HiveType): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}