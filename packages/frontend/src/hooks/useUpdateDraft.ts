"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDraft } from "../lib/api";
import { DRAFTS_QUERY_KEY } from "./useDrafts";

interface UseUpdateDraftProps {
	onSuccess?: () => void;
}

export default function useUpdateDraft({
	onSuccess,
}: UseUpdateDraftProps = {}) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateDraft,
		onSuccess(): void {
			onSuccess?.();
			queryClient.invalidateQueries({ queryKey: [DRAFTS_QUERY_KEY] });
		},
	});
}
