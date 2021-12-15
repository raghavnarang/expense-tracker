import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";
import qs from 'qs';

type GroupDeleteArgs = {
    id: number,
    deleteOrMoveEntries: string,
    moveToGroupId?: number
}

const useDeleteGroup = () => useMutation((group: GroupDeleteArgs) => {
    const qString: {
        deleteOrMoveEntries: string,
        moveGroupId?: number
    } = {
        deleteOrMoveEntries: group.deleteOrMoveEntries
    }

    if (!!group.moveToGroupId) {
        qString.moveGroupId = group.moveToGroupId;
    }

    return axios.delete(getApiUrl(`group/${group.id}?${qs.stringify(qString)}`))
});

export default useDeleteGroup;