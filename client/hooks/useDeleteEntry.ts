import axios from "axios";
import { useMutation } from "react-query";
import { getApiUrl } from "../utils";

const useDeleteEntry = () => useMutation((id: number) => {
    return axios.delete(getApiUrl(`entry/${id}`))
});

export default useDeleteEntry;