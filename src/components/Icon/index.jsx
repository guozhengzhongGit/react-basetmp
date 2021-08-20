import React from 'react';

const Icon = ({ type, style }) => {
  return (
    <span style={style}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={'#' + type}></use>
      </svg>
    </span>
  );
};

export default Icon;
