import { Button, Input } from "antd";
import React from "react";
import { ISearchActor } from "../../utils/type";

interface IProps {
  search: ISearchActor;
  setSearch: React.Dispatch<React.SetStateAction<ISearchActor>>;
}
const SearchBar = (props: IProps) => {
  const { search, setSearch } = props;

  return (
    <div className="search-bar">
      <Input
        className="search-bar__input"
        placeholder="Nhập tên diễn viên"
        value={search.name}
        onChange={(e) => setSearch((pre) => ({ ...pre, name: e.target.value }))}
      />
      <Button type="primary">Tìm kiếm</Button>
    </div>
  );
};

export default SearchBar;
