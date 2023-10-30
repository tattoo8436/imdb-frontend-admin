import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getColumnDefs } from "./ColumnDefs";
import { actorApi } from "../../apis/actorApi";
import SearchBar from "./SearchBar";
import { IActor, ISearchActor } from "../../utils/type";
import { getCurrentAccount } from "../../utils";
import TableFooter from "../../components/TableFooter";
import ModalDelete from "../../components/ModalDelete";
import { toast } from "react-toastify";
import ModalAdd from "./ModalAdd";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { DEFAULT_ACTOR } from "../../utils/defaultValue";
import ModalEdit from "./ModalEdit";

const Actor = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormActor = useForm({
    defaultValues: DEFAULT_ACTOR,
    mode: "onChange",
  });

  const [listActors, setListActors] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchActor>({
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
    fetchActor();
  }, [isRefetch, search]);

  const fetchActor = async () => {
    setListActors([]);
    try {
      const { data } = await actorApi.searchActor(search);
      console.log({ data });
      setTotalRecords(data?.totalRecords);
      setListActors(data?.listActors);
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
    const payload = {
      accountAdmin: {
        username: search.accountAdmin?.username,
        password: search.accountAdmin?.password,
      },
      id: rowSelected.data.id,
    }
    try {
      const { data } = await actorApi.deleteActor(payload);
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
    <div className="actor">
      <div className="actor__title">Quản lý diễn viên</div>

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
        className="ag-theme-alpine actor__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listActors}
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
        hookForm={hookFormActor}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormActor}
        actor={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Actor;
