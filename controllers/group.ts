import prisma from "../client";
import { Prisma } from '@prisma/client';
import { slugify } from "../utils";

/** Create Group */
export const createGroup = async (title: string, userId: string) => {
    const slug = await getUniqueSlug(title);
    return await prisma.group.create({
        data: { title, groupSlug: slug, userId }
    });
}

/** Get Groups (Optional: Include Entries) */
export const getGroups = (
    offset: number = 0,
    limit: number = 10,
    includeEntries: boolean = false,
    entryOffset: number = 0,
    entryLimit: number = 10,
    userId: string
) => {
    const include: Prisma.GroupInclude = {
        entries: false
    }

    if (includeEntries) {
        include.entries = { skip: entryOffset, take: entryLimit }
    }

    return prisma.group.findMany({ skip: offset, take: limit, include, where: { userId } });
}

/** Get Group (with Entries w/ Pagination) */
export const getGroup = (
    id: number,
    offset: number = 0,
    limit: number = 10,
) =>
    prisma.group.findUnique({
        where: { id },
        include: {
            entries: {
                skip: offset,
                take: limit
            }
        }
    });


/** Edit Group */
export const editGroup = (title: string, groupId: number) =>
    prisma.group.update({ where: { id: groupId }, data: { title } });

export enum DeleteOrMoveEntries { DELETE = 'delete', MOVE = 'move' };

/** Delete Group */
export const deleteGroup = async (groupId: number, deleteOrMove: DeleteOrMoveEntries, moveToGroupId?: number) => {
    const deleteQuery = prisma.group.delete({ where: { id: groupId } });

    if (deleteOrMove === DeleteOrMoveEntries.DELETE) {
        const query = prisma.entry.deleteMany({ where: { groupId } });
        return await prisma.$transaction([query, deleteQuery]);
    }

    // deleteOrMove === DeleteOrMoveEntries.MOVE
    if (!moveToGroupId) {
        throw new Error('Move Group ID not found');
    }

    const query = prisma.entry.updateMany({ data: { groupId: moveToGroupId }, where: { groupId } });
    return await prisma.$transaction([query, deleteQuery]);
}

/** Get Unique Slug */
export const getUniqueSlug = async (groupName: string) => {
    const slug = slugify(groupName);

    const result = await prisma.group.findMany({
        where: { groupSlug: { startsWith: slug } },
        select: { groupSlug: true }
    });

    if (!result.length) {
        return slug;
    }

    let slugId = 0;
    const slugs = result.map(group => group.groupSlug);
    while (slugs.includes(`${slug}-${++slugId}`));

    return `${slug}-${slugId}`;
}