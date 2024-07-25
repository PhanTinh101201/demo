
import React from "react";
import CardView from "@/components/cards/view.card";

interface IParams {
  id: string;
}

const ViewPage = ({ params }: { params: IParams }) => {
  return (
    <div>
      <CardView params={params} />
    </div>
  );
};

export default ViewPage;
