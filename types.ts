export { Entry, Group } from "@prisma/client";
export type PaginationFn<T> = (offset: number, limit: number) => Promise<Array<T>>;