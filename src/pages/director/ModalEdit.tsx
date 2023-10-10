import {
  CloseOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Modal, Row, Tooltip } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { directorApi } from "../../apis/directorApi";
import { fileApi } from "../../apis/fileApi";
import ImageDefault from "../../assets/images/user-default.png";
import { BASE_URL_API } from "../../utils";
import { IDirector } from "../../utils/type";

interface IProps {
  hookForm: UseFormReturn<IDirector, any, undefined>;
  director: IDirector;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalEdit = (props: IProps) => {
  const { hookForm, director, openModal, setOpenModal, setIsRefetch, account } =
    props;

  const uploadRef: any = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (director) {
      hookForm.setValue("name", director.name);
      hookForm.setValue("description", director.description);
      hookForm.setValue("image", director.image);
      hookForm.setValue(
        "dob",
        director.dob ? dayjs(director.dob, "YYYY-MM-DD") : null
      );
    }
  }, [openModal]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.item(0);
    if (file) {
      hookForm.setValue("image", file);
    }
  };

  const onSubmit = async (value: IDirector) => {
    setLoading(true);
    let dataImage = { data: value.image };
    try {
      if (value.image && typeof value.image !== "string") {
        const formData = new FormData();
        formData.append("username", account?.username);
        formData.append("password", account?.password);
        formData.append("image", value.image);
        dataImage = await fileApi.uploadImage(formData);
        console.log({ dataImage });
      }

      const payload = {
        username: account?.username,
        password: account?.password,
        id: director?.id,
        name: value.name,
        description: value.description,
        image: dataImage?.data ?? null,
        dob: value.dob ? dayjs(value.dob).format("YYYY-MM-DD") : null,
      };
      const { data } = await directorApi.editDirector(payload);
      console.log({ data });
      setIsRefetch((pre) => !pre);
      setLoading(false);
      onCancel();
      toast.success("Sửa thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
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
      className="modal modal-add"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={900}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Sửa đạo diễn</div>
        <div className="modal__content">
          <Row>
            <Col span={12} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <div className="item-image__input">
                <img
                  src={
                    hookForm.watch("image")
                      ? typeof hookForm.watch("image") === "string"
                        ? `${BASE_URL_API}/image/${hookForm.watch("image")}`
                        : URL.createObjectURL(hookForm.watch("image"))
                      : ImageDefault
                  }
                  alt="Ảnh"
                />

                <Tooltip title="Xoá" arrow>
                  <CloseOutlined
                    className={classNames("item-image__input__icon clickable", {
                      "d-none": hookForm.watch("image") === null,
                    })}
                    onClick={() => {
                      hookForm.setValue("image", null);
                    }}
                  />
                </Tooltip>
              </div>

              <input
                ref={uploadRef}
                className="d-none"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={handleImageUpload}
              />
              <Button
                className="item-image__btn"
                onClick={() => uploadRef.current?.click()}
                icon={<UploadOutlined />}
              >
                Chọn ảnh
              </Button>
            </Col>

            <Col span={12}>
              <Row>
                <Col span={24} className="form__item">
                  <div className="form__item__label">
                    Họ tên <span>*</span>
                  </div>
                  <Controller
                    name="name"
                    control={hookForm.control}
                    rules={{
                      validate: {
                        required: (v) =>
                          v.trim().length > 0 || "Họ tên là bắt buộc",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        placeholder="Nhập họ tên"
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

                <Col span={24} className="form__item form__item--text-area">
                  <div className="form__item__label">Giới thiệu</div>
                  <Controller
                    name="description"
                    control={hookForm.control}
                    render={({ field, fieldState }) => (
                      <Input.TextArea
                        {...field}
                        placeholder="Nhập giới thiệu"
                        className="form__item__input"
                      />
                    )}
                  />
                </Col>

                <Col span={24} className="form__item">
                  <div className="form__item__label">Ngày sinh</div>
                  <Controller
                    name="dob"
                    control={hookForm.control}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        {...field}
                        placeholder="Chọn ngày sinh"
                        className="form__item__input"
                        format="DD/MM/YYYY"
                      />
                    )}
                  />
                </Col>
              </Row>
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
          <Button onClick={() => console.log(hookForm.getValues())}>Log</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEdit;
