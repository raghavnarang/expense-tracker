type Entry = {
    id: number,
    groupId: number,
    message: string,
    amount: number,
    createdAt: Date,
    updatedAt: Date
};

export default Entry;

export type EntryInput = {
    message: string,
    amount: number,
    groupId: number
}