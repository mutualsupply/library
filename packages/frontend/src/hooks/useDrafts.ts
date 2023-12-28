"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getDrafts } from "../lib/api";

export const DRAFTS_QUERY_KEY = "drafts";

export default function useDrafts() {
	const { data } = useSession();
	return useQuery({
		queryKey: [DRAFTS_QUERY_KEY],
		queryFn: getDrafts,
		refetchOnWindowFocus: true,
		enabled: !!data,
	});
}
