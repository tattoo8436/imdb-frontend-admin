import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Modal, Row, Tooltip, Upload } from "antd";
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (director) {
      hookForm.setValue("name", director.name);
      hookForm.setValue("description", director.description);
      hookForm.setValue(
        "image",
        director.image
          ? [{ id: "1", name: String(director.image).slice(37) }]
          : []
      );
      hookForm.setValue(
        "dob",
        director.dob ? dayjs(director.dob, "YYYY-MM-DD") : null
      );
    }
  }, [openModal]);

  const onSubmit = async (value: IDirector) => {
    setLoading(true);
    let dataImage = {
      data: value.image?.length > 0 ? director.image : null,
    };
    try {
      if (value.image.length > 0 && value.image.at(0)?.id !== "1") {
        const formData = new FormData();
        formData.append("username", account?.username);
        formData.append("password", account?.password);
        formData.append("image", value.image.at(0).originFileObj);
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
    setTimeout(() => {
      hookForm.reset();
      hookForm.clearErrors();
    }, 100);
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
        <div className="modal__header">Sửa đạo diễn</div>
        <div className="modal__content">
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

            <Col span={24} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <Controller
                name="image"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Upload
                    {...field}
                    fileList={field.value}
                    onChange={(e) => {
                      field.onChange(e.fileList);
                    }}
                    beforeUpload={() => false}
                    multiple={false}
                    accept=".jpg,.png,.jpeg"
                  >
                    <Button
                      className={classNames({
                        "d-none": hookForm.watch("image")?.length > 0,
                      })}
                    >
                      Chọn ảnh
                    </Button>
                  </Upload>
                )}
              />
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
