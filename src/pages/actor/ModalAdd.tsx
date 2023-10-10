import {
  CloseOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Modal, Row, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { IActor } from "../../utils/type";
import { Controller, UseFormReturn } from "react-hook-form";
import ImageDefault from "../../assets/images/user-default.png";
import classNames from "classnames";
import dayjs from "dayjs";
import { actorApi } from "../../apis/actorApi";
import { toast } from "react-toastify";
import { fileApi } from "../../apis/fileApi";

interface IProps {
  hookForm: UseFormReturn<IActor, any, undefined>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalAdd = (props: IProps) => {
  const { hookForm, openModal, setOpenModal, setIsRefetch, account } = props;

  const uploadRef: any = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.item(0);
    if (file) {
      hookForm.setValue("image", file);
    }
  };

  const onSubmit = async (value: IActor) => {
    console.log(dayjs(value.dob).format("YYYY-MM-DD"));
    setLoading(true);
    let dataImage = null;
    try {
      if (value.image) {
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
        name: value.name,
        description: value.description,
        image: dataImage?.data ?? null,
        dob: value.dob ? dayjs(value.dob).format("YYYY-MM-DD") : null,
      };
      const { data } = await actorApi.addActor(payload);
      console.log({ data });
      setIsRefetch((pre) => !pre);
      setLoading(false);
      onCancel();
      toast.success("Thêm thành công!", { autoClose: 3000 });
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
        <div className="modal__header">Thêm diễn viên</div>
        <div className="modal__content">
          <Row>
            <Col span={12} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <div className="item-image__input">
                <img
                  src={
                    hookForm.watch("image")
                      ? typeof hookForm.watch("image") === "string"
                        ? ""
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

export default ModalAdd;
