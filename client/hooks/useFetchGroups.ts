import axios from "axios";
import { getApiUrl } from "../utils";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import Group from '../types/group';

const fetchGroups = async () => {
  const data = await axios.get<Group[]>(getApiUrl("group/list"));
  return data.data;
};

const useFetchGroups = () => {
  const query = useQuery(["group-list"], fetchGroups, { refetchOnMount: false });
  const groups = query.data;

  const router = useRouter();
  const routerSlug = Array.isArray(router.query.slug) && router.query.slug.length > 0 ? router.query.slug[0] : undefined;

  let currentGroup: Group | undefined;
  if (!!groups && groups.length > 0) {
    currentGroup = groups.find(group => group.groupSlug === routerSlug);

    if (!currentGroup) {
      currentGroup = groups[0];
    }
  }

  return { ...query, currentGroupId: currentGroup?.id, currentGroupSlug: currentGroup?.groupSlug };
};

export default useFetchGroups;
