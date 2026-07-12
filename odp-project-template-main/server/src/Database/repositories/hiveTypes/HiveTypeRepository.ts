import { RowDataPacket, ResultSetHeader } from "mysql2";
import { IHiveTypeRepository } from "../../../Domain/repositories/hiveTypes/IHiveTypeRepository";
import { HiveType } from "../../../Domain/models/HiveType";
import { HiveTypeDto } from "../../../Domain/DTOs/hiveType/HiveTypeDto";
import { CreateHiveTypeDto } from "../../../Domain/DTOs/hiveType/CreateHiveTypeDto";
import { DbManager } from "../../connection/DbConnectionPool";
import { ILoggerService } from "../../../Domain/services/logger/ILoggerService";

export class HiveTypeRepository implements IHiveTypeRepository {
  public constructor(
    private readonly db: DbManager,
    private readonly logger: ILoggerService,
  ) {}

  private map(r: RowDataPacket): HiveTypeDto {
    return new HiveTypeDto(
      r.id,
      r.name,
      r.description,
      r.is_active
    );
  }

  async findAll(): Promise<HiveTypeDto[]> {
    const res = await this.db.getReadConnection();
    if (!res) return [];

    try {
      const [rows] = await res.conn.execute<RowDataPacket[]>(
        `SELECT * FROM hive_types
         WHERE is_active = 1
         ORDER BY name`
      );

      return rows.map(r => this.map(r));
    } catch (err) {
      this.logger.error("HiveTypeRepository", "findAll failed", err);
      return [];
    } finally {
      res.conn.release();
    }
  }

  async findById(id: number): Promise<HiveTypeDto | null> {
    const res = await this.db.getReadConnection();
    if (!res) return null;

    try {
      const [rows] = await res.conn.execute<RowDataPacket[]>(
        `SELECT * FROM hive_types WHERE id = ?`,
        [id]
      );

      return rows.length ? this.map(rows[0]) : null;
    } catch (err) {
      this.logger.error("HiveTypeRepository", "findById failed", err);
      return null;
    } finally {
      res.conn.release();
    }
  }

  async create(dto: CreateHiveTypeDto): Promise<HiveType> {
    const res = await this.db.getWriteConnection();
    if (!res) return new HiveType();

    try {
      const [result] = await res.conn.execute<ResultSetHeader>(
        `INSERT INTO hive_types(name, description)
         VALUES(?, ?)`,
        [dto.name, dto.description]
      );

      return new HiveType(
        result.insertId,
        dto.name,
        dto.description
      );
    } catch (err) {
      this.logger.error("HiveTypeRepository", "create failed", err);
      return new HiveType();
    } finally {
      res.conn.release();
    }
  }

async update(id: number, hiveType: HiveType): Promise<boolean> {

const res = await this.db.getWriteConnection();
  if (!res) return false;

  try {
    const [result] = await res.conn.execute<ResultSetHeader>(
      'UPDATE hive_types SET name = ?, description = ?, is_active = ? WHERE id = ?',
      [
        hiveType.name,
        hiveType.description,
        hiveType.isActive,
        id,
      ]
    );

    return result.affectedRows > 0;
  } catch (err) {
    this.logger.error("HiveTypeRepository", "update failed", err);
    return false;
  } finally {
    res.conn.release();
  }
}

  async delete(id: number): Promise<boolean> {
    const res = await this.db.getWriteConnection();
    if (!res) return false;

    try {
      const [result] = await res.conn.execute<ResultSetHeader>(
        `UPDATE hive_types
         SET is_active = 0
         WHERE id = ?`,
        [id]
      );

      return result.affectedRows > 0;
    } catch (err) {
      this.logger.error("HiveTypeRepository", "delete failed", err);
      return false;
    } finally {
      res.conn.release();
    }
  }
}