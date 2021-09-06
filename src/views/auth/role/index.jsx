import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { apiGetRoleInfo } from './api';
import style from './style.scss';

const RoleManage = () => {
  const [pageInfo, setPageInfo] = useState({
    loading: false,
    name: '',
    role_id: null,
    tableData: [],
  });
  const fetchRoleList = async () => {
    setPageInfo((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const res = await apiGetRoleInfo();
      const { code, data } = res;
      if (code === 200 && data.role_name) {
        setPageInfo((prev) => ({
          ...prev,
          loading: false,
          role_id: data.role_id,
          name: data.role_name,
          tableData: data.list,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchRoleList();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '父级ID',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (text) => <>{text !== 0 ? text : <a>无父级</a>}</>,
    },
    {
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
    },
  ];
  return (
    <div className={style.roleOuter}>
      <div className={style.title}>
        当前角色是：
        <Tag color={pageInfo.role_id === 1 ? 'gold' : 'cyan'}>
          {pageInfo.name}
        </Tag>
      </div>
      <Table
        pagination={false}
        bordered
        rowKey="id"
        dataSource={pageInfo.tableData}
        loading={pageInfo.loading}
        columns={columns}
      />
    </div>
  );
};

export default RoleManage;
