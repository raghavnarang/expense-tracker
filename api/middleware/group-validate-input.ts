import { validateSchema } from "../../middleware/validate-schema";
import Joi from "joi";

export const createGroupValidate = validateSchema(
    Joi.object({
        title: Joi.string().required()
    })
);

export const editGroupValidate = validateSchema(
    Joi.object({
        id: Joi.number().integer().required(),
        title: Joi.string()
    })
);

export const deleteGroupValidate = validateSchema(
    Joi.object({
        id: Joi.number().integer().required(),
        deleteOrMoveEntries: Joi.string().valid('move', 'delete').required(),
        moveGroupId: Joi.number().when('deleteOrMoveEntries', { is: 'move', then: Joi.number().integer().required() })
    })
);

export const getGroupsValidate = validateSchema(
    Joi.object({
        offset: Joi.number(),
        limit: Joi.number(),
        includeEntries: Joi.boolean(),
        entryOffset: Joi.number(),
        entryLimit: Joi.number()
    })
);

export const getGroupValidate = validateSchema(
    Joi.object({
        id: Joi.number().required(),
        offset: Joi.number(),
        limit: Joi.number(),
    })
);