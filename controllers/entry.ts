import prisma from '../client';
import { Entry } from '../types';

import { Prisma } from '@prisma/client';

export const createEntry = (
  message: string,
  amount: number,
  groupId: number,
  groupName: string = ''
): Promise<Entry> => prisma.entry.create({
  data: {
    message, amount, group: {
      connectOrCreate: {
        where: {
          id: groupId
        },
        create: {
          title: groupName
        }
      }
    }
  }
});

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

export const getEntries = (offset: number = 0, limit: number = 10, groupId: number = 0) => {
  const findArgs: Prisma.EntryFindManyArgs = {
    skip: offset,
    take: limit,
  }

  if (!!groupId) {
    findArgs.where = { groupId }
  }

  return prisma.entry.findMany(findArgs);
}

export const editEntry = (entryId: number, message?: string, amount?: number) => {
  if (!message || !amount) {
    return false;
  }

  const updateData: Prisma.EntryUpdateInput = {};
  if (!!message) {
    updateData.message = message;
  }

  if (!!amount) {
    updateData.amount = amount;
  }

  prisma.entry.update({
    where: { id: entryId },
    data: { message, amount }
  })
};

export const deleteEntry = (entryId: number) =>
  prisma.entry.delete({ where: { id: entryId } });