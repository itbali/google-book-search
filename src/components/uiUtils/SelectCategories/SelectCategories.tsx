import React, {ChangeEvent} from 'react';
import {SubjectTypes} from "../../../api/booksApi";

type SelectCategoriesType = {
  subject:SubjectTypes
  callback:(e: ChangeEvent<HTMLSelectElement>)=>void
}

export const SelectCategories = ({subject, callback}:SelectCategoriesType) => {
  return (
    <div>
      <span>Category:</span>
      <select value={subject}
              onChange={callback}
      >
        <option value="all">All</option>
        <option value="Art">Art</option>
        <option value="Biography">Biography</option>
        <option value="Computers">Computers</option>
        <option value="History">History</option>
        <option value="Medical">Medical</option>
        <option value="Poetry">Poetry</option>
      </select>
    </div>
  );
};
