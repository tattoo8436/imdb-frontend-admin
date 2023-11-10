import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Controller,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { optionLanguageEdit, optionType } from "../../utils/constant";
import { IMovie, IOption } from "../../utils/type";
import { fileApi } from "../../apis/fileApi";
import { movieApi } from "../../apis/movieApi";
import { toast } from "react-toastify";

interface IProps {
  hookForm: UseFormReturn<IMovie, any, undefined>;
  hookFieldActor: UseFieldArrayReturn<IMovie, "listActors", "id">;
  movie: IMovie;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
  listGenres: Array<IOption>;
  listActors: any[];
  listDirectors: any[];
}

const ModalEdit = (props: IProps) => {
  const {
    hookForm,
    hookFieldActor,
    movie,
    openModal,
    setOpenModal,
    setIsRefetch,
    account,
    listDirectors,
    listGenres,
    listActors,
  } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movie) {
      hookForm.setValue("name", movie.name);
      hookForm.setValue("type", movie.type);
      hookForm.setValue("description", movie.description);
      hookForm.setValue(
        "image",
        movie.image ? [{ id: "1", name: String(movie.image).slice(37) }] : []
      );
      hookForm.setValue("trailer", movie.trailer);
      hookForm.setValue(
        "listGenreIds",
        movie.listMovieGenres?.map((i) => i.genre.id)
      );
      hookForm.setValue(
        "listActors",
        movie.listMovieActors?.map((i) => ({
          id: i.actor.id,
          nameInMovie: i.nameInMovie,
        }))
      );
      hookForm.setValue(
        "listDirectorIds",
        movie.listMovieDirectors?.map((i) => i.director.id)
      );
      hookForm.setValue(
        "releaseDate",
        movie.releaseDate ? dayjs(movie.releaseDate, "YYYY-MM-DD") : null
      );
      hookForm.setValue("duration", movie.duration);
      hookForm.setValue("language", movie.language);
    }
  }, [openModal]);

  const onSubmit = async (value: IMovie) => {
    setLoading(true);
    let dataImage = {
      data: value.image?.length > 0 ? movie.image : null,
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
        accountAdmin: {
          username: account?.username,
          password: account?.password,
        },
        id: movie.id,
        name: value.name,
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
      const { data } = await movieApi.editMovie(payload);
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
      width={1000}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Sửa phim</div>
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
                    disabled
                  />
                )}
              />
            </Col>

            <Col span={24} className="form__item form__item--text-area">
              <div className="form__item__label">Nội dung</div>
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
              <div className="form__item__label">Ảnh</div>
              <Controller
                name="image"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Upload
                    {...field}
                    fileList={field.value}
                    onChange={(e: any) => {
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
                    required: (v: any) =>
                      v.length > 0 || "Thể loại là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className="form__item__input"
                    placeholder="Chọn thể loại"
                    options={listGenres}
                    mode="multiple"
                    filterOption={(input, option) =>
                      option?.label.toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
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
                  Diễn viên <span>*</span>
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
                          filterOption={(input, option) =>
                            option.labelText
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          showSearch
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
                    filterOption={(input, option) =>
                      option.labelText
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch
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
