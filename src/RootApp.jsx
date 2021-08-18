import React, { useState } from 'react';
import { Button, DatePicker, message } from 'antd';
import style from '@/rootApp.scss';

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
    </div>
  );
};

export default RootApp;
