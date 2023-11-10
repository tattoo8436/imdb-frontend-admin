import { PlusOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { directorApi } from "../../apis/directorApi";
import ModalDelete from "../../components/ModalDelete";
import TableFooter from "../../components/TableFooter";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_DIRECTOR } from "../../utils/defaultValue";
import { ISearchDirector } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import SearchBar from "./SearchBar";

const Director = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormDirector = useForm({
    defaultValues: DEFAULT_DIRECTOR,
    mode: "onChange",
  });

  const [listDirectors, setListDirectors] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchDirector>({
    accountAdmin: {
      username: account?.username,
      password: account?.password,
    },
    pageIndex: 1,
    pageSize: 10,
    name: "",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultColDef: any = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      editable: false,
      flex: 1,
      suppressMenu: true,
      comparator: () => {
        return;
      },
    }),
    []
  );

  const columnDefs: any = getColumnDefs(
    gridRef,
    setOpenModalDelete,
    setOpenModalEdit
  );

  useEffect(() => {
    fetchDirector();
  }, [isRefetch, search]);

  const fetchDirector = async () => {
    setListDirectors([]);
    try {
      const { data } = await directorApi.searchDirector(search);
      console.log({ data });
      setTotalRecords(data?.totalRecords);
      setListDirectors(data?.listDirectors);
    } catch (error) {
      console.log(error);
    }
  };

  const onSortChanged = (e: any) => {
    const column = e.columnApi
      .getColumnState()
      .find((e: any) => e.sort !== null);
    if (column !== undefined) {
      setSearch({
        ...search,
        sortBy: column.colId,
        orderBy: column.sort === "asc" ? "ASC" : "DESC",
      });
    } else {
      setSearch({
        ...search,
        sortBy: null,
        orderBy: null,
      });
    }
  };

  const onCancelDelete = () => {
    setOpenModalDelete(false);
  };

  const onDelete = async () => {
    setLoading(true);
    const rowSelected = gridRef?.current?.api?.getDisplayedRowAtIndex(
      gridRef?.current?.api?.getFocusedCell().rowIndex
    );
    const payload = {
      accountAdmin: {
        username: search.accountAdmin?.username,
        password: search.accountAdmin?.password,
      },
      id: rowSelected.data.id,
    };
    try {
      const { data } = await directorApi.deleteDirector(payload);
      console.log({ data });
      setLoading(false);
      setOpenModalDelete(false);
      setIsRefetch((pre) => !pre);
      toast.success("Xoá thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="director">
      <div className="director__title">Quản lý đạo diễn</div>

      <Row justify="space-between">
        <Col span={4}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModalAdd(true)}
          >
            Thêm
          </Button>
        </Col>

        <Col span={20}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            setIsRefetch={setIsRefetch}
          />
        </Col>
      </Row>

      <div
        className="ag-theme-alpine director__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listDirectors}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellClicked={(e) => console.log(e)}
          rowSelection={"single"}
          localeText={{ noRowsToShow: "Không có dữ liệu" }}
          onSortChanged={onSortChanged}
        />
      </div>

      <TableFooter
        pageIndex={search.pageIndex}
        pageSize={search.pageSize}
        totalRecords={totalRecords}
        setSearch={setSearch}
        setIsRefetch={setIsRefetch}
      />

      <ModalDelete
        openModal={openModalDelete}
        loading={loading}
        onCancel={onCancelDelete}
        onDelete={onDelete}
      />

      <ModalAdd
        hookForm={hookFormDirector}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormDirector}
        director={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Director;
