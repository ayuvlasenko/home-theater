import Joi from "joi";

export interface EnvValidationSchema {
    APP_PORT: number;
    FILES_DIRECTORY: string;
    MAX_VIDEO_CHUNK_BYTES: number;
    ACCESS_TOKEN_COOKIE: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN_MS: number;
    REFRESH_TOKEN_COOKIE: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN_MS: number;
    TYPEORM_CONNECTION: string;
    TYPEORM_HOST: string;
    TYPEORM_PORT: number;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_LOGGING: string;
    TYPEORM_ENTITIES: string;
    TYPEORM_MIGRATIONS: string;
    TYPEORM_MIGRATIONS_DIR: string;
    TYPEORM_CACHE: string;
}

export const envValidationSchema = Joi.object<EnvValidationSchema, true>({
    APP_PORT: Joi.number()
        .port()
        .required(),
    FILES_DIRECTORY: Joi.string()
        .required(),
    MAX_VIDEO_CHUNK_BYTES: Joi.number()
        .positive()
        .integer()
        .required(),
    ACCESS_TOKEN_COOKIE: Joi.string()
        .required(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string()
        .required(),
    JWT_ACCESS_TOKEN_EXPIRES_IN_MS: Joi.number()
        .positive()
        .integer()
        .required(),
    REFRESH_TOKEN_COOKIE: Joi.string()
        .required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string()
        .required(),
    JWT_REFRESH_TOKEN_EXPIRES_IN_MS: Joi.number()
        .positive()
        .integer()
        .required(),
    TYPEORM_CONNECTION: Joi.string()
        .required(),
    TYPEORM_HOST: Joi.string()
        .required(),
    TYPEORM_PORT: Joi.number()
        .port()
        .required(),
    TYPEORM_USERNAME: Joi.string()
        .required(),
    TYPEORM_PASSWORD: Joi.string()
        .required(),
    TYPEORM_DATABASE: Joi.string()
        .required(),
    TYPEORM_LOGGING: Joi.string()
        .required(),
    TYPEORM_ENTITIES: Joi.string()
        .required(),
    TYPEORM_MIGRATIONS: Joi.string()
        .required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string()
        .required(),
    TYPEORM_CACHE: Joi.string()
        .required(),
});
