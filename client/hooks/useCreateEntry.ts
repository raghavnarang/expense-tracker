import axios from "axios";
import { useMutation } from "react-query";
import { EntryInput } from "../types/entry";
import { getApiUrl } from "../utils";

const useCreateEntry = () => useMutation((entry: EntryInput) => {
    return axios.post(getApiUrl(`entry`), entry)
});

export default useCreateEntry;