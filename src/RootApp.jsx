import React, { useState } from 'react';
import { Button, DatePicker, message } from 'antd';
import Icon from '@c/Icon';
import AntIcon from '@c/AntIcon';
import style from '@/rootApp.scss';
import './rootApp.css';

const RootApp = () => {
  const [info, setInfo] = useState({
    count: 0,
    name: 'gzz',
    age: 18,
  });
  const handleAdd = () => {
    setInfo((prev) => ({
      ...prev,
      count: prev.count + 1,
    }));
  };
  const handleChange = (value) => {
    message.info(
      `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`
    );
  };
  return (
    <div className={style.outer}>
      <p>
        num: <b>{info.count}</b>
      </p>
      hello world, {info.name}
      <Button onClick={handleAdd} type="primary">
        add
      </Button>
      <DatePicker onChange={handleChange} />
      <Icon type="icon-gzznan" style={{ fontSize: '28px', color: '#000' }} />
      <AntIcon type="icon-gzznv" style={{ fontSize: 28, color: '#000' }} />
    </div>
  );
};

export default RootApp;
