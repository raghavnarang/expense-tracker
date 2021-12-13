import axios from "axios";
import { getApiUrl } from "../utils";
import { useQuery } from "react-query";
import Group from '../types/group';

const fetchGroups = async () => {
  const data = await axios.get<Group[]>(getApiUrl("group/list"));
  return data.data;
};

const useFetchGroups = () => useQuery(["group-list"], fetchGroups);

export default useFetchGroups;
