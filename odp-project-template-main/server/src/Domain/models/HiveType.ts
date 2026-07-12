export class HiveType {
  constructor(
    public id: number = 0,
    public name: string = "",
    public description: string = "",
    public isActive: number = 1,
    public createdAt?: Date
  ) {}
}