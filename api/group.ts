import express from 'express';
import { createGroup, editGroup, deleteGroup, getGroups, getGroup } from '../controllers/group';
import { asyncHandler } from '../utils';

/** Data Validators for API Endpoint's input */
import { createGroupValidate, editGroupValidate, deleteGroupValidate, getGroupsValidate, getGroupValidate } from './middleware/group-validate-input';

const router = express.Router();

/** Get Groups */
router.get('/list', getGroupsValidate, asyncHandler(async (req, res) => {
    const { offset, limit, includeEntries, entryOffset, entryLimit } = res.locals.data;

    const result = await getGroups(offset, limit, includeEntries, entryOffset, entryLimit);
    return res.status(200).json(result);
}));

/** Create Group */
router.post('/', createGroupValidate, asyncHandler(async (req, res) => {
    const { title } = res.locals.data;

    const result = await createGroup(title);
    return res.status(200).json(result);
}));

/** Edit Group */
router.put('/:id', editGroupValidate, asyncHandler(async (req, res) => {
    const { id, title } = res.locals.data;

    const result = await editGroup(title, id);
    return res.status(200).json(result);
}));

/** Delete Group */
router.delete('/:id', deleteGroupValidate, asyncHandler(async (req, res) => {
    const { id, deleteOrMoveEntries, moveGroupId } = res.locals.data;

    const result = await deleteGroup(id, deleteOrMoveEntries, moveGroupId);
    return res.status(200).json(result);
}));

/** Get Group (w/ Entries) */
router.get('/:id', getGroupValidate, asyncHandler(async (req, res) => {
    const { offset, limit, id } = res.locals.data;

    const result = await getGroup(id, offset, limit);
    return res.status(200).json(result);
}));

export default router;