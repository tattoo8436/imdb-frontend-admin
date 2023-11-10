import {
  CloseOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Modal, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IActor, IGenre } from "../../utils/type";
import { Controller, UseFormReturn } from "react-hook-form";
import ImageDefault from "../../assets/images/user-default.png";
import classNames from "classnames";
import dayjs from "dayjs";
import { actorApi } from "../../apis/actorApi";
import { toast } from "react-toastify";
import { BASE_URL_API } from "../../utils";
import { fileApi } from "../../apis/fileApi";
import { genreApi } from "../../apis/genreApi";

interface IProps {
  hookForm: UseFormReturn<IGenre, any, undefined>;
  genre: IGenre;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalEdit = (props: IProps) => {
  const { hookForm, genre, openModal, setOpenModal, setIsRefetch, account } =
    props;

  const uploadRef: any = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (genre) {
      hookForm.setValue("name", genre.name);
    }
  }, [openModal]);

  const onSubmit = async (value: IGenre) => {
    setLoading(true);
    const payload = {
      accountAdmin: {
        username: account?.username,
        password: account?.password,
      },
      id: genre?.id,
      name: value.name,
    };
    try {
      const { data } = await genreApi.editGenre(payload);
      console.log({ data });
      setIsRefetch((pre) => !pre);
      setLoading(false);
      onCancel();
      toast.success("Sửa thành công!", { autoClose: 3000 });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data, { autoClose: 3000 });
      setLoading(false);
    }
  };

  const onCancel = () => {
    setOpenModal(false);
    hookForm.reset();
    hookForm.clearErrors();
  };

  return (
    <Modal
      className="modal modal-edit"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Sửa thể loại</div>
        <div className="modal__content">
          <Row>
            <Col span={24} className="form__item">
              <div className="form__item__label">
                Tên <span>*</span>
              </div>
              <Controller
                name="name"
                control={hookForm.control}
                rules={{
                  validate: {
                    required: (v) => v.trim().length > 0 || "Tên là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập tên"
                    className="form__item__input"
                    status={fieldState.error !== undefined ? "error" : ""}
                  />
                )}
              />
              {hookForm.formState.errors.name && (
                <p className="error-msg">
                  {hookForm.formState.errors.name.message}
                </p>
              )}
            </Col>
          </Row>
        </div>

        <div className="modal__footer">
          <Button className="modal__footer__item" onClick={() => onCancel()}>
            Huỷ
          </Button>

          <Button
            loading={loading}
            className="modal__footer__item"
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
          <Button
            className="d-none"
            onClick={() => console.log(hookForm.getValues())}
          >
            Log
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEdit;
