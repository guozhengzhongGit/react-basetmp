import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import { Divider, message } from 'antd';
import { Viewer } from '@bytemd/react';
import 'bytemd/dist/index.min.css';
import 'juejin-markdown-theme-channing-cyan';
import 'highlight.js/styles/atom-one-light.css';
import { apiGetContentDetail } from './api';
import style from './style.scss';
const ContentDetail = (props) => {
  const {
    match: { params },
  } = props;
  const [pageInfo, setPageInfo] = useState({
    loading: false,
    data: null,
  });
  const fetchContentDetail = async () => {
    if (!params.id) {
      message.warn('参数错误');
      return;
    }
    setPageInfo(
      produce((draft) => {
        draft.loading = true;
      })
    );
    try {
      const res = await apiGetContentDetail({ source_id: params.id });
      if (res.msg === 'success') {
        setPageInfo(
          produce((draft) => {
            draft.loading = false;
            draft.data = res.data;
          })
        );
      }
    } catch (e) {
      console.error(e);
      setPageInfo(
        produce((draft) => {
          draft.loading = false;
        })
      );
    }
  };
  useEffect(() => {
    fetchContentDetail();
  }, []);
  const { title, sub_title, create_time, content } = pageInfo.data || {};
  return (
    <div className={style.contentDetailOuter}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.bar}>
        {sub_title ? <p className={style.subTitle}>{sub_title}</p> : null}
        <p className={style.createTime}>{create_time}</p>
      </div>
      <Divider />
      <div className={style.viewOuter}>
        <Viewer value={content} />
      </div>
    </div>
  );
};

export default ContentDetail;
