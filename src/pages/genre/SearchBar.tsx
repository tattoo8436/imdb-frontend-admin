import { Button, Input } from "antd";
import React, { useState } from "react";
import { ISearchActor, ISearchGenre } from "../../utils/type";

interface IProps {
  search: ISearchActor;
  setSearch: React.Dispatch<React.SetStateAction<ISearchGenre>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchBar = (props: IProps) => {
  const { search, setSearch, setIsRefetch } = props;

  const [input, setInput] = useState(search.name);

  return (
    <div className="search-bar">
      <Input
        className="search-bar__input"
        placeholder="Nhập tên thể loại"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() => {
          setSearch((pre) => ({ ...pre, name: input }));
          setIsRefetch((pre) => !pre);
        }}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
