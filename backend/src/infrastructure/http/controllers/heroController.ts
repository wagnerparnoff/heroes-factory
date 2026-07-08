import type { Request, Response, NextFunction } from "express";
import type { HeroService } from "../../../application/services/HeroService.js";
import {
  createHeroSchema,
  updateHeroSchema,
  listHeroQuerySchema,
} from "../../../application/dtos/heroSchema.ts";
import { toHeroResponse } from "../../../application/dtos/heroPresenter.ts";
import type { UpdateHeroInput } from "../../../domain/repositories/IHeroRepository.ts";

export class HeroController {
  constructor(private heroService: HeroService) {
    // bind para manter o contexto de `this` quando Express invocar os métodos assim nao perde o contexto do objeto
    this.create     = this.create.bind(this);
    this.list       = this.list.bind(this);
    this.getById    = this.getById.bind(this);
    this.update     = this.update.bind(this);
    this.activate   = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.delete     = this.delete.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createHeroSchema.parse(req.body);
      const hero = await this.heroService.create(data);
      return res.status(201).json(toHeroResponse(hero));
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, search } = listHeroQuerySchema.parse(req.query);
      const result = await this.heroService.list(page, limit, search);
      return res.json({
        data: result.data.map(toHeroResponse),
        total: result.total,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const hero = await this.heroService.findById(req.params.id as string);
      return res.json(toHeroResponse(hero));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = updateHeroSchema.parse(req.body);
      const hero = await this.heroService.update(req.params.id as string, data as Partial<UpdateHeroInput>);
      return res.json(toHeroResponse(hero));
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const hero = await this.heroService.setActive(req.params.id as string, true);
      return res.json(toHeroResponse(hero));
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const hero = await this.heroService.setActive(req.params.id as string, false);
      return res.json(toHeroResponse(hero));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.heroService.delete(req.params.id as string);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}