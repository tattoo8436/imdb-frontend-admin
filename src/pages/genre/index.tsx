import { PlusOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { genreApi } from "../../apis/genreApi";
import ModalDelete from "../../components/ModalDelete";
import TableFooter from "../../components/TableFooter";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_GENRE } from "../../utils/defaultValue";
import { ISearchGenre } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import SearchBar from "./SearchBar";

const Genre = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormGenre = useForm({
    defaultValues: DEFAULT_GENRE,
    mode: "onChange",
  });

  const [listGenres, setListGenres] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchGenre>({
    username: account?.username,
    password: account?.password,
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
      resizable: false,
      editable: false,
      flex: 1,
      suppressMenu: true,
      comparator: () => {
        return;
      },
    }),
    []
  );

  const columnDefs: any = getColumnDefs(gridRef, setOpenModalDelete, setOpenModalEdit);

  useEffect(() => {
    fetchGenre();
  }, [isRefetch, search]);

  const fetchGenre = async () => {
    setListGenres([]);
    try {
      const { data } = await genreApi.searchGenre(search);
      console.log({ data });
      setTotalRecords(data?.totalRecords);
      setListGenres(data?.listGenres);
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
    console.log(rowSelected);
    try {
      const { data } = await genreApi.deleteGenre({
        username: search.username,
        password: search.password,
        id: rowSelected.data.id,
      });
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
    <div className="genre">
      <div className="genre__title">Quản lý thể loại</div>

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
        className="ag-theme-alpine genre__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listGenres}
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
      />

      <ModalDelete
        openModal={openModalDelete}
        loading={loading}
        onCancel={onCancelDelete}
        onDelete={onDelete}
      />

      <ModalAdd
        hookForm={hookFormGenre}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormGenre}
        genre={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Genre;
