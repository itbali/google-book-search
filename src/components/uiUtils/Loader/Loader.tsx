import React from 'react';
import s from "./loader.module.scss"

export const Loader = () => {
  return (
    <div className={s.loader}>
      <span className={s.animation}></span>
    </div>
  );
};
