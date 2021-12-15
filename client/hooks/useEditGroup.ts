import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";

type GroupEditArgs = {
    id: number,
    title: string
}

const useEditGroup = () => useMutation((group: GroupEditArgs) => {
    return axios.put(getApiUrl(`group/${group.id}`), { title: group.title })
});

export default useEditGroup;