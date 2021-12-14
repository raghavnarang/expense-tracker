import { QueryFunction, QueryFunctionContext, QueryKey, useQuery } from "react-query";
import axios from 'axios';

import { getApiUrl } from "../utils";
import Entry from "../types/entry";

const fetchEntries: QueryFunction<Entry[]> = async ({ queryKey }) => {
    const [_key, groupId, offset = 0, limit = 10] = queryKey;
    if (!groupId) {
        throw new Error('Invalid Group ID');
    }

    const url = getApiUrl(`entry/list?groupId=${groupId}&offset=${offset}&limit=${limit}`);
    const data = await axios.get<Entry[]>(url);
    return data.data;
}

const useFetchEntries = (groupId?: number, offset: number = 0, limit: number = 10) => {
    return useQuery<Entry[]>(['group-entries', groupId, offset, limit], fetchEntries, { enabled: !!groupId });
};

export default useFetchEntries;