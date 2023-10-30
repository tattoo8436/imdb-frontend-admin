import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  Upload,
} from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Controller,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "react-toastify";
import { actorApi } from "../../apis/actorApi";
import { fileApi } from "../../apis/fileApi";
import { IMovie, IOption } from "../../utils/type";
import { optionLanguageEdit, optionType } from "../../utils/constant";
import { movieApi } from "../../apis/movieApi";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps {
  hookForm: UseFormReturn<IMovie, any, undefined>;
  hookFieldActor: UseFieldArrayReturn<IMovie, "listActors", "id">;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
  listGenres: Array<IOption>;
  listActors: Array<IOption>;
  listDirectors: Array<IOption>;
}

const ModalAdd = (props: IProps) => {
  const {
    hookForm,
    hookFieldActor,
    openModal,
    setOpenModal,
    setIsRefetch,
    account,
    listGenres,
    listActors,
    listDirectors,
  } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: IMovie) => {
    setLoading(true);
    let dataImage = null;
    try {
      if (value.image.length > 0) {
        const formData = new FormData();
        formData.append("username", account?.username);
        formData.append("password", account?.password);
        formData.append("image", value.image.at(0).originFileObj);
        dataImage = await fileApi.uploadImage(formData);
        console.log({ dataImage });
      }
      const payload = {
        accountAdmin: {
          username: account?.username,
          password: account?.password,
        },
        name: value.name,
        type: value.type,
        description: value.description,
        image: dataImage?.data ?? null,
        trailer: value.trailer,
        listGenreIds: value.listGenreIds,
        listActors: value.listActors,
        listDirectorIds: value.listDirectorIds,
        releaseDate: value.releaseDate
          ? dayjs(value.releaseDate).format("YYYY-MM-DD")
          : null,
        duration: value.duration,
        language: value.language,
      };
      const { data } = await movieApi.addMovie(payload);
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
    setTimeout(() => {
      hookForm.reset();
      hookForm.clearErrors();
    }, 100);
  };

  return (
    <Modal
      className="modal modal-add"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={1000}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Thêm phim</div>
        <div className="modal__content">
          <Row gutter={24}>
            <Col span={12} className="form__item">
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

            <Col span={12} className="form__item">
              <div className="form__item__label">
                Loại phim <span>*</span>
              </div>
              <Controller
                name="type"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className="form__item__input"
                    options={optionType}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e === 2) {
                        hookForm.setValue("directorId", null);
                      }
                    }}
                  />
                )}
              />
            </Col>

            <Col span={24} className="form__item form__item--text-area">
              <div className="form__item__label">
                Nội dung
              </div>
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

            <Col span={12} className="form__item item-image">
              <div className="form__item__label">
                Ảnh
              </div>
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

            <Col span={12} className="form__item">
              <div className="form__item__label">Trailer</div>
              <Controller
                name="trailer"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập url trailer"
                    className="form__item__input"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">
                Thể loại <span>*</span>
              </div>
              <Controller
                name="listGenreIds"
                control={hookForm.control}
                rules={{
                  validate: {
                    required: (v: any) => v.length > 0 || "Thể loại là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className="form__item__input"
                    placeholder="Chọn thể loại"
                    options={listGenres}
                    mode="multiple"
                  />
                )}
              />
              {hookForm.formState.errors.listGenreIds && (
                <p className="error-msg">
                  {hookForm.formState.errors.listGenreIds.message}
                </p>
              )}
            </Col>

            <Col span={12} className="form__item item-actor">
              <div className="item-actor__header">
                <div className="item-actor__header__label">
                  Diễn viên
                </div>
              </div>
              {hookFieldActor.fields?.map((i, index) => {
                return (
                  <div key={i.id} className="item-actor__input">
                    <Controller
                      name={`listActors.${index}.id`}
                      control={hookForm.control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={listActors}
                          className="item-actor__input__actor"
                          placeholder="Chọn diễn viên"
                        />
                      )}
                    />

                    <Controller
                      name={`listActors.${index}.nameInMovie`}
                      control={hookForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="item-actor__input__name"
                          placeholder="Nhập vai diễn trong phim"
                        />
                      )}
                    />

                    {index === 0 ? (
                      <PlusOutlined
                        className="item-actor__input__btn"
                        onClick={() =>
                          hookFieldActor.append({ id: null, nameInMovie: "" })
                        }
                      />
                    ) : (
                      <MinusOutlined
                        className="item-actor__input__btn"
                        onClick={() => hookFieldActor.remove(index)}
                      />
                    )}
                  </div>
                );
              })}
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">Đạo diễn</div>
              <Controller
                name="listDirectorIds"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className="form__item__input"
                    placeholder="Chọn đạo diễn"
                    options={listDirectors}
                    mode="multiple"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">Ngày phát hành</div>
              <Controller
                name="releaseDate"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    placeholder="Chọn ngày phát hành"
                    className="form__item__input"
                    format="DD/MM/YYYY"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">Thời lượng (phút)</div>
              <Controller
                name="duration"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập thời lượng"
                    className="form__item__input"
                    type="number"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">
                Ngôn ngữ <span>*</span>
              </div>
              <Controller
                name="language"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className="form__item__input"
                    options={optionLanguageEdit}
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

export default ModalAdd;
