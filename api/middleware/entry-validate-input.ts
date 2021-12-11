import { validateSchema } from "../../middleware/validate-schema";
import Joi from "joi";

export const createEntryValidate = validateSchema(
    Joi.object({
        message: Joi.string().required(),
        amount: Joi.number().required(),
        groupId: Joi.number().required(),
        groupName: Joi.string(),
        date: Joi.date()
    })
);

export const adjustEntryValidate = validateSchema(
    Joi.object({
        id: Joi.number().required(),
        parentId: Joi.number().required()
    })
);

export const unadjustEntryValidate = validateSchema(
    Joi.object({
        id: Joi.number().required()
    })
);

export const moveToGroupValidate = validateSchema(
    Joi.object({
        id: Joi.number().required(),
        groupId: Joi.number().required()
    })
);

export const getEntriesValidate = validateSchema(
    Joi.object({
        offset: Joi.number(),
        limit: Joi.number(),
        groupId: Joi.number()
    })
);

export const editEntryValidate = validateSchema(
    Joi.object({
        id: Joi.number().required(),
        message: Joi.string(),
        amount: Joi.number(),
        date: Joi.date()
    })
);

export const deleteEntryValidate = validateSchema(
    Joi.object({
        id: Joi.number().required()
    })
);