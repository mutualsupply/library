"use client";

import { useMutation } from "@tanstack/react-query";
import { submitCaseStudy } from "../lib/api";

interface UseCreateCaseStudyProps {
	onSuccess?: () => void;
}

export default function useCreateCaseStudy({
	onSuccess,
}: UseCreateCaseStudyProps = {}) {
	return useMutation({
		mutationFn: submitCaseStudy,
		onSuccess(): void {
			onSuccess?.();
		},
	});
}
