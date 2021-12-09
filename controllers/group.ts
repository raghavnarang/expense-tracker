import prisma from "../client";

export const createGroup = (title: string) => prisma.group.create({
    data: { title }
});

export const getGroups =
    (offset: number = 0, limit: number = 0, includeEntries: boolean) =>
        prisma.group.findMany({
            skip: offset,
            take: limit,
            include: {
                entries: includeEntries
            }
        });

export const editGroup = (title: string, groupId: number) =>
    prisma.group.update({ where: { id: groupId }, data: { title } });

export enum DeleteOrMoveEntries { DELETE, MOVE };

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