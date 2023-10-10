import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import ImageDefault from "../../assets/images/user-default.png";
import { BASE_URL_API } from "../../utils";
import { DEFAULT_FORMAT_DATE } from "../../utils/constant";

export const getColumnDefs = (
  gridRef: React.MutableRefObject<any>,
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      flex: 0,
      cellClass: "align-right",
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "image",
      headerName: "Ảnh",
      minWidth: 100,
      flex: 0.3,
      autoHeight: true,
      sortable: false,
      cellClass: "align-center",
      cellRenderer: (e: any) => {
        return (
          <Avatar
            src={e.value ? `${BASE_URL_API}/image/${e.value}` : ImageDefault }
            alt="Ảnh"
            className="cell-image"
            //style={{width: '80px', height: '80px', border: '1px solid black'}}
            
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      flex: 0.3,
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "description",
      headerName: "Giới thiệu",
      minWidth: 200,
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      minWidth: 100,
      flex: 0.3,
      cellClass: "align-center",
      cellRenderer: (e: any) => {
        return e.value ? dayjs(e.value).format(DEFAULT_FORMAT_DATE) : "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      flex: 0,
      sortable: false,
      cellRenderer: (e: any) => {
        return (
          <div className="cell-action">
            <Tooltip title="Sửa" arrow>
              <EditFilled
                className="cell-action__btn btn-edit"
                onClick={() => setOpenModalEdit(true)}
              />
            </Tooltip>

            <Tooltip title="Xoá" arrow>
              <DeleteFilled
                className="cell-action__btn btn-delete"
                onClick={() => setOpenModalDelete(true)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
};
