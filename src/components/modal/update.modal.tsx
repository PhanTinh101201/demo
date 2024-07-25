"use client";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Configs from "@/configs/domain.json";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  getDataUpdateTable: any;
}

interface FormValues {
  id: number;
  title: string;
  author: string;
  content: string;
}

function ModalUpdate(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, getDataUpdateTable } = props;

  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();

  useEffect(() => {
    setValue("title", getDataUpdateTable?.title);
    setValue("author", getDataUpdateTable?.author);
    setValue("content", getDataUpdateTable?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataUpdateTable]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch(`${Configs.API_URL}blogs/${getDataUpdateTable?.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Save Success");
          setShowModalUpdate(false);
          mutate(`${Configs.API_URL}blogs`);
        }
      });
  };

  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={() => {
          setShowModalUpdate(false);
          reset();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE ITEM</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Control
              {...register("title")}
              type="text"
              placeholder="Title"
            />
            <br />
            <Form.Control
              {...register("author")}
              type="text"
              placeholder="Author"
            />
            <br />
            <Form.Control
              {...register("content")}
              type="text"
              placeholder="Content"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModalUpdate(false);
                reset();
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowModalUpdate(false);
              }}
              variant="primary"
              type="submit"
            >
              UPDATE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdate;
