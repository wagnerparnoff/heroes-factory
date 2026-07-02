import swaggerJsdoc from "swagger-jsdoc";

const heroSchema = {
  type: "object",
  properties: {
    id:            { type: "string", format: "uuid", example: "e314636e-1ca6-4925-a0e7-da5eb5ae2403" },
    name:          { type: "string", example: "Robert Bruce Banner" },
    nickname:      { type: "string", example: "Hulk" },
    dateOfBirth: { type: "string", format: "date-time", example: "1962-04-10T00:00:00.000Z" },
    universe:    { type: "string", example: "Marvel" },
    mainPower:   { type: "string", example: "Force" },
    avatarUrl:   { type: "string", format: "uri", example: "https://www.superherodb.com/pictures2/portraits/10/100/1004.jpg" },
    isActive:    { type: "boolean", example: true },
    createdAt:   { type: "string", format: "date-time" },
    updatedAt:   { type: "string", format: "date-time" },
  },
};

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hero Factory API",
      version: "1.0.0",
      description: "API REST para gestão de heróis",
    },
    components: {
      schemas: {
        Hero: heroSchema,
        CreateHeroInput: {
          type: "object",
          required: ["name", "nickname", "dateOfBirth", "universe", "mainPower", "avatarUrl"],
          properties: {
            name:        { type: "string" },
            nickname:    { type: "string" },
            dateOfBirth: { type: "string", format: "date" },
            universe:    { type: "string" },
            mainPower:   { type: "string" },
            avatarUrl:   { type: "string", format: "uri" },
          },
        },
        PaginatedHeroes: {
          type: "object",
          properties: {
            data:  { type: "array", items: { $ref: "#/components/schemas/Hero" } },
            total: { type: "integer" },
            page:  { type: "integer" },
            limit: { type: "integer" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/api/heroes": {
        get: {
          summary: "Listar heróis",
          tags: ["Heroes"],
          parameters: [
            { in: "query", name: "page",   schema: { type: "integer", default: 1 } },
            { in: "query", name: "limit",  schema: { type: "integer", default: 10 } },
            { in: "query", name: "search", schema: { type: "string" }, description: "Busca por name ou nickname" },
          ],
          responses: {
            200: { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/PaginatedHeroes" } } } },
          },
        },
        post: {
          summary: "Criar herói",
          tags: ["Heroes"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateHeroInput" } } },
          },
          responses: {
            201: { description: "Criado", content: { "application/json": { schema: { $ref: "#/components/schemas/Hero" } } } },
            400: { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
      "/api/heroes/{id}": {
        get: {
          summary: "Buscar herói por ID",
          tags: ["Heroes"],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Hero" } } } },
            404: { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
        put: {
          summary: "Atualizar herói",
          tags: ["Heroes"],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          requestBody: {
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateHeroInput" } } },
          },
          responses: {
            200: { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Hero" } } } },
            404: { description: "Not found" },
            409: { description: "Herói desativado não pode ser editado" },
          },
        },
      },
      "/api/heroes/{id}/activate": {
        patch: {
          summary: "Ativar herói",
          tags: ["Heroes"],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Hero" } } } },
            404: { description: "Not found" },
          },
        },
      },
      "/api/heroes/{id}/deactivate": {
        patch: {
          summary: "Desativar herói",
          tags: ["Heroes"],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Hero" } } } },
            404: { description: "Not found" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);