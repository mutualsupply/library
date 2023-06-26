"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPulls } from "../services/api";

export default function Page() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getPulls"],
    queryFn: getPulls,
  });
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && (
        <div className="text-center text-red-700">
          Could not get pull requests
        </div>
      )}
      {isSuccess && (
        <div className="flex flex-col gap-3">
          {data?.map((pr) => (
            <Link key={pr.id} href={`/pulls/${pr.id}`}>
              <div className="border-[1px] border-dashed border-red-600 p-1">
                <div className="font-bold">{pr.title}</div>
                {pr?.labels?.map((label, index) => (
                  <span
                    key={`${label.id}-${index}`}
                    style={{ backgroundColor: `#${label.color}` }}
                    className="inline-block px-2 py-1 rounded-lg"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {data?.length === 0 && <div>No prs</div>}
        </div>
      )}
    </>
  );
}
