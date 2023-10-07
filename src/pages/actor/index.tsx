import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getColumnDefs } from "./ColumnDefs";
import { actorApi } from "../../apis/actorApi";
import SearchBar from "./SearchBar";

const Actor = () => {
  const gridRef = useRef(null);
  const columnDefs: any = getColumnDefs(gridRef);

  const [listActors, setListActors] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState({ pageIndex: 1, name: "" });

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: false,
      editable: false,
      flex: 1,
      suppressMenu: true,
    }),
    []
  );

  useEffect(() => {
    fetchActor();
  }, [isRefetch]);

  const fetchActor = async () => {
    try {
      const { data } = await actorApi.getAllActors();
      console.log({ data });

      setListActors(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actor">
      <div className="actor__title">Quản lý diễn viên</div>

      <SearchBar search={search} setSearch={setSearch} />

      <div
        className="ag-theme-alpine director__table"
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
        />
      </div>
    </div>
  );
};

export default Actor;
