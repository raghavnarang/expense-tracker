"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getGroupValidate = exports.getGroupsValidate = exports.deleteGroupValidate = exports.editGroupValidate = exports.createGroupValidate = void 0;
var validate_schema_1 = require("../../middleware/validate-schema");
var joi_1 = __importDefault(require("joi"));
exports.createGroupValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    title: joi_1["default"].string().required()
}));
exports.editGroupValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().integer().required(),
    title: joi_1["default"].string()
}));
exports.deleteGroupValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().integer().required(),
    deleteOrMoveEntries: joi_1["default"].string().valid('move', 'delete').required(),
    moveGroupId: joi_1["default"].number().when('deleteOrMoveEntries', { is: 'move', then: joi_1["default"].number().integer().required() })
}));
exports.getGroupsValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    offset: joi_1["default"].number(),
    limit: joi_1["default"].number(),
    includeEntries: joi_1["default"].boolean(),
    entryOffset: joi_1["default"].number(),
    entryLimit: joi_1["default"].number()
}));
exports.getGroupValidate = (0, validate_schema_1.validateSchema)(joi_1["default"].object({
    id: joi_1["default"].number().required(),
    offset: joi_1["default"].number(),
    limit: joi_1["default"].number()
}));
//# sourceMappingURL=group-validate-input.js.map