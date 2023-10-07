import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ColGroupDef } from "ag-grid-community";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import { DEFAULT_FORMAT_DATE } from "../../utils/constant";

export const getColumnDefs = (gridRef: React.MutableRefObject<any>) => {
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
      minWidth: 150,
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 200,
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
      minWidth: 200,
      cellClass: "align-center",
      cellRenderer: (e: any) => {
        return dayjs(e.value).format(DEFAULT_FORMAT_DATE) ?? "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      flex: 0,
      cellRenderer: (e: any) => {
        return (
          <div className="cell-action">
            <Tooltip title="Sửa" arrow>
              <EditFilled className="cell-action__btn btn-edit" />
            </Tooltip>

            <Tooltip title="Xoá" arrow>
              <DeleteFilled className="cell-action__btn btn-delete" />
            </Tooltip>
          </div>
        );
      },
    },
  ];
};
