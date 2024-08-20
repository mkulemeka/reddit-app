import { selectSort, setSort } from "./sortSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const handleSort = () => {
    dispatch(setSort(sort === "asc" ? "desc" : "asc"));
  };
  return <button onClick={handleSort}>{sort === "asc" ? "z-a" : "a-z"}</button>;
};

export default Sort;
