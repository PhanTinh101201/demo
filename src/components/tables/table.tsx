"use client";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalAddNew from "@/components/modal/create.modal";
import ModalUpdate from "@/components/modal/update.modal";
import Configs from "@/configs/domain.json";
import { toast } from "react-toastify";
import Link from "next/link";
import { mutate } from "swr";


interface IProps {
  blogs: IBlog[];
}

interface FormValuesUpdate {
  id: number;
  title: string;
  author: string;
  content: string;
}

const TableData = (props: IProps) => {
  const { blogs } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [getDataUpdateTable, setDataUpdateTable] = useState<FormValuesUpdate>();

  const handelDeleteRowsTable = (id: number) => {
    fetch(`${Configs.API_URL}blogs/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
          toast.warning("Save Success");
          mutate(`${Configs.API_URL}blogs`);
        }
      );
  };

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
                    <Link
                      href={`/blogs/${item.id}`}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                    <Button
                      variant="success"
                      className="mx-3"
                      onClick={() => {
                        setDataUpdateTable(item);
                        setShowModalUpdate(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handelDeleteRowsTable(item.id);
                      }}
                      variant="warning"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <ModalAddNew showModal={showModal} setShowModal={setShowModal} />
      <ModalUpdate
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        getDataUpdateTable={getDataUpdateTable}
      />
    </div>
  );
};

export default TableData;
