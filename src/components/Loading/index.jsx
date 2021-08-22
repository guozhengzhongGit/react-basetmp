import React from 'react';
import Icon from '../Icon';
import './styles.css';

const LoadingIcon = ({ style }) => {
  return (
    <span style={style} className="loading">
      <Icon type="icon-gzzLoading" />
    </span>
  );
};

export default LoadingIcon;
