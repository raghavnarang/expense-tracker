import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
declare global {
    var prisma: PrismaClient
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma;