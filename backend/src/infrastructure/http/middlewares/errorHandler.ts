import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../../../shared/errors/AppError.ts";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof ZodError) {
        return res.status(400).json({ message: "Erro de validação", issues: err.issues });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
}