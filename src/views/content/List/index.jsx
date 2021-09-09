import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { PageHeader, Spin, Alert, Tag } from 'antd';

import style from './style.scss';
import { apiGetContentList } from './api';

const ContentList = (props) => {
  const [pageData, setPageData] = useState({
    loading: false,
    list: [],
  });
  const fetchContentList = async () => {
    setPageData(
      produce((draft) => {
        draft.loading = true;
      })
    );
    try {
      const res = await apiGetContentList();
      if (res.msg === 'success') {
        setPageData(
          produce((draft) => {
            draft.list = res.data;
          })
        );
      }
      setPageData(
        produce((draft) => {
          draft.loading = false;
        })
      );
    } catch (error) {
      setPageData(
        produce((draft) => {
          draft.loading = false;
        })
      );
      console.error(error);
    }
  };
  useEffect(() => {
    fetchContentList();
  }, []);
  const { loading, list } = pageData;
  const renderListItem = (item) => {
    return (
      <div key={item.id} className={style.itemWrapper}>
        <div className={style.itemTitle}>
          <span>{item.title}</span>
          {item.tag_name ? (
            <span>
              <Tag color={item.tag_color}>{item.tag_name}</Tag>
            </span>
          ) : null}
        </div>
        <div className={style.itemSubTitle}>{item.sub_title}</div>
      </div>
    );
  };
  return (
    <div className={style.outer}>
      <div className={style.pageHeader}>
        <PageHeader
          title="文章列表"
          subTitle={
            <Alert type="success" message={`文章数量：${list.length}`} />
          }
        />
      </div>
      <Spin spinning={loading}>
        <div className={style.container}>
          <div className={style.listWrapper}>
            {list.map((item) => renderListItem(item))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ContentList;
