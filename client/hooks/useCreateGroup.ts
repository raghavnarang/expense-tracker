import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";

const useCreateGroup = () => useMutation((name: string) => {
    return axios.post(getApiUrl(`group`), {title: name});
});

export default useCreateGroup;