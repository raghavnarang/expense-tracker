import express from 'express';
import { createEntry, adjustEntry, unadjustEntry, moveToGroup, getEntries, editEntry, deleteEntry } from '../controllers/entry';
import { asyncHandler } from '../utils';

/** Data Validators for API Endpoint's input */
import { createEntryValidate, adjustEntryValidate, unadjustEntryValidate, moveToGroupValidate, getEntriesValidate, editEntryValidate, deleteEntryValidate } from './middleware/entry-validate-input';

const router = express.Router();

/** Create Entry */
router.post('/', createEntryValidate, asyncHandler(async (req, res) => {
    const { message, amount, groupId, groupName, date } = res.locals.data;
    const { userId } = res.locals.user;

    const result = await createEntry(message, amount, groupId, groupName, userId, date);
    return res.status(200).json(result);
}));

/** Adjust Entry */
router.post('/:id/adjust', adjustEntryValidate, asyncHandler(async (req, res) => {
    const { id, parentId } = res.locals.data;

    const result = await adjustEntry(id, parentId);
    return res.status(200).json(result);
}));

/** Unadjust Entry */
router.post('/:id/unadjust', unadjustEntryValidate, asyncHandler(async (req, res) => {
    const { id } = res.locals.data;

    const result = await unadjustEntry(id);
    return res.status(200).json(result);
}));

/** Move to Group Entry */
router.post('/:id/move', moveToGroupValidate, asyncHandler(async (req, res) => {
    const { id, groupId } = res.locals.data;

    const result = await moveToGroup(id, groupId);
    return res.status(200).json(result);
}));

/** List Entries */
router.get('/list', getEntriesValidate, asyncHandler(async (req, res) => {
    const { offset, limit, groupId } = res.locals.data;
    const { userId } = res.locals.user;

    const result = await getEntries(offset, limit, groupId, userId);
    return res.status(200).json(result);
}));

/** Edit Entry */
router.put('/:id', editEntryValidate, asyncHandler(async (req, res) => {
    const { id, message, amount, date } = res.locals.data;

    const result = await editEntry(id, message, amount, date);
    return res.status(200).json(result);
}));

/** Delete Entry */
router.delete('/:id', deleteEntryValidate, asyncHandler(async (req, res) => {
    const { id } = res.locals.data;

    const result = await deleteEntry(id);
    return res.status(200).json(result);
}));

export default router;