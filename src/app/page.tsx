"use client";
import TableData from "@/components/table";
import React from "react";
import useSWR from "swr";

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div>
      <TableData blogs={data} />
    </div>
  );
};

export default Home;
