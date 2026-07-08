import { Router } from "express";
import { HeroController } from "../controllers/heroController.ts";
import { HeroService } from "../../../application/services/HeroService.ts";
import { HeroRepository } from "../../prisma/HeroRepository.ts";

const router = Router();

// composição manual das dependências (poor man's DI) ===
const heroRepository = new HeroRepository();
const heroService    = new HeroService(heroRepository);
const heroController = new HeroController(heroService);

router.post("/heroes", heroController.create);
router.get("/heroes",  heroController.list);
router.get("/heroes/:id", heroController.getById);
router.put("/heroes/:id", heroController.update);
router.patch("/heroes/:id/activate", heroController.activate);
router.patch("/heroes/:id/deactivate",heroController.deactivate);
router.delete("/heroes/:id", heroController.delete);

export default router;