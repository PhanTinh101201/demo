"use client";
import React from "react";
import useSWR from "swr";
import Configs from "@/configs/domain.json";
import TableData from "@/components/tables/table";

const BlogsPage = () => {

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, isLoading } = useSWR(
    `${Configs.API_URL}blogs`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <TableData blogs={data} />
      )}
    </div>
  );
};

export default BlogsPage;
