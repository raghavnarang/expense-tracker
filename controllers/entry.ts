import prisma from '../client';
import { Entry } from '../types';

import { Prisma } from '@prisma/client';
import { getUniqueSlug } from './group';

export const createEntry = async (
  message: string,
  amount: number,
  groupId: number,
  groupName: string = '',
  userId: string,
  date?: Date
): Promise<Entry> => {
  const createData: Prisma.EntryCreateArgs = {
    data: {
      userId, message, amount, group: {
        connectOrCreate: {
          where: {
            id: groupId
          },
          create: {
            title: groupName,
            groupSlug: await getUniqueSlug(groupName),
            userId
          }
        }
      }
    }
  };

  if (!!date) {
    createData.data.createdAt = date;
  }

  return await prisma.entry.create(createData);
}

export const adjustEntry = (entryId: number, parentEntryId: number) => prisma.entry.update({
  data: {
    parent: {
      connect: { id: parentEntryId }
    }
  }, where: { id: entryId }
});

export const unadjustEntry = (entryId: number) => prisma.entry.update({
  data: {
    parent: {
      disconnect: true
    }
  },
  where: {
    id: entryId
  }
});

export const moveToGroup = (entryId: number, groupId: number) => prisma.entry.update({
  where: { id: entryId },
  data: {
    group: {
      connect: { id: groupId }
    }
  }
});

export const getEntries = (offset: number = 0, limit: number = 10, groupId: number = 0, userId: string) => {
  const findArgs: Prisma.EntryFindManyArgs = {
    skip: offset,
    take: limit,
  }

  findArgs.where = { userId };

  if (!!groupId) {
    findArgs.where.groupId = groupId;
  }

  return prisma.entry.findMany(findArgs);
}

export const editEntry = (entryId: number, message?: string, amount?: number, date?: Date) => {
  if (!message && !amount && !date) {
    throw new Error('Invalid data for updating entry');
  }

  const updateData: Prisma.EntryUpdateInput = {};
  if (!!message) {
    updateData.message = message;
  }

  if (!!amount) {
    updateData.amount = amount;
  }

  if (!!date) {
    updateData.createdAt = date;
  }

  return prisma.entry.update({
    where: { id: entryId },
    data: updateData
  })
};

export const deleteEntry = (entryId: number) =>
  prisma.entry.delete({ where: { id: entryId } });