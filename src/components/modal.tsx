"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";

interface IProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

interface FormValues {
  title: string;
  author: string;
  content: string;
}

function ModalAddNew(props: IProps) {
  const { showModal, setShowModal } = props;

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          reset();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD ITEM</Modal.Title>
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
                setShowModal(false);
                reset();
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAddNew;
