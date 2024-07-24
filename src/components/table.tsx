"use client";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalAddNew from "@/components/modal";

interface IProps {
  blogs: IBlog[];
}

const TableData = (props: IProps) => {
  const { blogs } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Table Blogs</h1>
        <Button onClick={() => setShowModal(true)} variant="secondary">
          ADD NEW
        </Button>
      </div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item?.id}</td>
                  <td>{item?.title}</td>
                  <td>{item?.author}</td>
                  <td>
                    <Button variant="secondary">View</Button>
                    <Button variant="success" className="mx-3">
                      Edit
                    </Button>
                    <Button variant="warning">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <ModalAddNew showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default TableData;
