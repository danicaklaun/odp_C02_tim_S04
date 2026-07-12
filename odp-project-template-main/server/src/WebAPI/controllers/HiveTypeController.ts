import { Router, Request, Response } from "express";
import { HiveTypeService } from "../../Services/hiveTypes/HiveTypeService";

export class HiveTypeController {
  private readonly router = Router();

  constructor(
    private readonly hiveTypeService: HiveTypeService
) {
    console.log("HiveTypeController loaded");
    this.initializeRoutes();
}

  private initializeRoutes(): void {

    this.router.get("/hive-types", async (_req: Request, res: Response) => {
      const data = await this.hiveTypeService.getAll();
      res.json(data);
    });

    this.router.get("/hive-types/:id", async (req: Request, res: Response) => {
      const data = await this.hiveTypeService.getById(Number(req.params.id));

      if (!data) {
        res.status(404).json({ message: "Hive type not found" });
        return;
      }

      res.json(data);
    });

    this.router.post("/hive-types", async (req: Request, res: Response) => {
      const data = await this.hiveTypeService.create(req.body);
      res.status(201).json(data);
    });

    this.router.put("/hive-types/:id", async (req: Request, res: Response) => {
      const ok = await this.hiveTypeService.update(
        Number(req.params.id),
        req.body
      );

      res.json({ success: ok });
    });

    this.router.delete("/hive-types/:id", async (req: Request, res: Response) => {
      const ok = await this.hiveTypeService.delete(Number(req.params.id));

      res.json({ success: ok });
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}