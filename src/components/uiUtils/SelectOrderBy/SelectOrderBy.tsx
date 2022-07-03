import React, {ChangeEvent} from 'react';
import {OrderByTypes} from "../../../api/booksApi";

type SelectOrderByPropsType = {
  orderBy: OrderByTypes
  callback: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectOrderBy = ({orderBy, callback}: SelectOrderByPropsType) => {
  return (
    <div>
      <span>Order by:</span>
      <select value={orderBy}
              onChange={callback}>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};
