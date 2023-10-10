import { Pagination, Select } from "antd";
import React from "react";
import { optionPageSize } from "../utils/constant";

interface IProps {
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  setSearch: any;
}

const TableFooter = (props: IProps) => {
  const { pageIndex, pageSize, totalRecords, setSearch } = props;  

  return (
    <div className="table-footer">
      <div className="table-footer__show">
        <div className="table-footer__show__label">Hiển thị</div>
        <Select
          className="table-footer__show__input"
          options={optionPageSize}
          value={pageSize}
          onChange={(e) => setSearch((pre: any) => ({ ...pre, pageSize: e }))}
        />
      </div>

      <div className="table-footer__pagination">
        <Pagination
          current={pageIndex}
          total={totalRecords}
          pageSize={pageSize}
          onChange={(e) => setSearch((pre: any) => ({ ...pre, pageIndex: e }))}
        />
      </div>
    </div>
  );
};

export default TableFooter;
