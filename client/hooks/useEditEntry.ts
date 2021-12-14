import axios from "axios";
import { useMutation } from "react-query";
import { EditEntryInput } from "../types/entry";
import { getApiUrl } from "../utils";

const useEditEntry = () => useMutation((entry: EditEntryInput) => {
    return axios.put(getApiUrl(`entry/${entry.id}`), entry)
});

export default useEditEntry;