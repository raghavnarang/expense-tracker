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
  const query = useQuery(["group-list"], fetchGroups, { staleTime: 1000 });

  const router = useRouter();
  let groupSlug = Array.isArray(router.query.slug) && router.query.slug.length > 0 ? router.query.slug[0] : undefined;

  const groups = query.data;

  let groupId: number | undefined;
  if (!!groups && groups.length > 0) {
    /** Get Group ID */
    groupId = !!groupSlug ? groups.find(group => group.groupSlug === groupSlug)?.id : groups[0].id;
    groupId = !!groupId ? groupId : groups[0].id;

    /** Get Group Slug */
    if (!groupSlug && !!groupId) {
      groupSlug = groups.find(group => group.id === groupId)?.groupSlug;
    }
  }

  return { ...query, currentGroupId: groupId, currentGroupSlug: groupSlug };
};

export default useFetchGroups;
