"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Configs from "@/configs/domain.json";
import useSWR, { Fetcher } from "swr";

const CardView = ({ params }: any) => {
  const { id } = params;
  console.log("id", id);

  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((r) => r.json());

  const { data, isLoading } = useSWR(`${Configs.API_URL}blogs/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div>
      <Link className="btn btn-primary mb-3" href={"/blogs"}>
        Go somewhere
      </Link>
      <Card>
        <Card.Header as="h5">{data?.id}</Card.Header>
        <Card.Body>
          <Card.Title>{data?.title}</Card.Title>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardView;
