"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveDraft } from "../lib/api";
import { USER_QUERY_KEY } from "./useUser";

interface UseSaveDraftProps {
	onSuccess?: () => void;
}

export default function useSaveDraft({ onSuccess }: UseSaveDraftProps = {}) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: saveDraft,
		onSuccess(): void {
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
		},
	});
}
