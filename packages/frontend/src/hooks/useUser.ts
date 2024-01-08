"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser } from "../lib/api";

export const USER_QUERY_KEY = "user";

export default function useUser() {
	const { data } = useSession();
	return useQuery({
		queryKey: [USER_QUERY_KEY],
		queryFn: getUser,
		refetchOnWindowFocus: true,
		enabled: !!data,
	});
}
