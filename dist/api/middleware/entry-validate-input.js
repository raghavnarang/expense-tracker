"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteEntryValidate = exports.editEntryValidate = exports.getEntriesValidate = exports.moveToGroupValidate = exports.unadjustEntryValidate = exports.adjustEntryValidate = exports.createEntryValidate = void 0;
var validate_schema_1 = require("../../middleware/validate-schema");
var joi_1 = __importDefault(require("joi"));
exports.createEntryValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    message: joi_1["default"].string().required(),
    amount: joi_1["default"].number().required(),
    groupId: joi_1["default"].number().required(),
    groupName: joi_1["default"].string(),
    date: joi_1["default"].date()
}));
exports.adjustEntryValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required(),
    parentId: joi_1["default"].number().required()
}));
exports.unadjustEntryValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required()
}));
exports.moveToGroupValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required(),
    groupId: joi_1["default"].number().required()
}));
exports.getEntriesValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    offset: joi_1["default"].number(),
    limit: joi_1["default"].number(),
    groupId: joi_1["default"].number()
}));
exports.editEntryValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required(),
    message: joi_1["default"].string(),
    amount: joi_1["default"].number(),
    date: joi_1["default"].date()
}));
exports.deleteEntryValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required()
}));
//# sourceMappingURL=entry-validate-input.js.map