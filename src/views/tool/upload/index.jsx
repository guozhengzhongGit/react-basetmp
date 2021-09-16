import React, { useEffect, useState } from 'react';
import { Upload, Descriptions, Skeleton, Space, Divider } from 'antd';
import BatteryProgress from '@c/BatteryProgress';
import sha256 from 'crypto-js/sha256';
import { InboxOutlined, ContainerOutlined } from '@ant-design/icons';
import { produce } from 'immer';
import * as qiniu from 'qiniu-js';
import styles from './style.scss';
import { getQiniuToken } from './api';
import { config } from './config';
import { setCurBusinessPath } from '@s/modules/global/action';
import { connect } from 'react-redux';

const { Dragger } = Upload;
const UploadTool = (props) => {
  const [pageData, setPageData] = useState({
    loading: false,
    uploadLoading: false,
    currentPercent: 0,
    data: { qiniuToken: '' },
    fileDetail: {},
  });
  useEffect(() => {
    // setInterval(() => {
    //   setPageData(
    //     produce((draft) => {
    //       if (draft.currentPercent < 100) {
    //         draft.currentPercent++;
    //       }
    //     })
    //   );
    // }, 300);
    setPageData(
      produce((draft) => {
        draft.loading = true;
      })
    );
    getQiniuToken()
      .then((res) => {
        // console.log(res);
        if (res.msg === 'success') {
          setPageData(
            produce((draft) => {
              draft.loading = false;
              draft.data.qiniuToken = res.data.qiniutoken;
            })
          );
        }
      })
      .catch((e) => {
        setPageData(
          produce((draft) => {
            draft.loading = false;
            draft.data.qiniuToken = '';
          })
        );
        console.error(e);
      });
  }, []);
  const observer = {
    next(res) {
      const {
        total: { percent },
      } = res;
      setPageData(
        produce((draft) => {
          draft.uploadLoading = true;
          draft.currentPercent = Math.floor(percent);
        })
      );
    },
    error(err) {
      console.error(err);
      setPageData(
        produce((draft) => {
          draft.uploadLoading = false;
          draft.fileDetail = {};
        })
      );
    },
    complete(res) {
      setPageData(
        produce((draft) => {
          draft.uploadLoading = false;
          draft.fileDetail = res.data;
        })
      );
    },
  };
  const uploadByQiniu = (file) => {
    const originName = file.file.name;
    const originNameArr = originName.split('.');
    const key = `${originNameArr[0]}-${sha256(file.file.uid)}.${
      originNameArr[1]
    }`;
    const putExtra = {
      fname: originName,
    };
    /*
     * qiniu.upload 返回一个 observable 对象用来控制上传行为
     * observable 对像通过 subscribe 方法可以被 observer 所订阅，订阅同时会开始触发上传，observable: 为一个带有 subscribe 方法的类实例
     * 同时返回一个 subscription 对象，该对象有一个 unsubscribe 方法取消订阅
     * */
    const observable = qiniu.upload(
      file.file,
      key,
      pageData.data.qiniuToken,
      putExtra,
      config
    );
    observable.subscribe(observer); // 这样传参形式也可以
  };
  const uploadProps = {
    customRequest: uploadByQiniu,
    showUploadList: false,
  };
  const gotoFileList = () => {
    props.changeCurrentBusinessPath('/tool/filelist');
    props.history.push('/tool/filelist');
  };
  const renderExtra = () => (
    <span className={styles.gotoBtn} onClick={gotoFileList}>
      查看上传列表
      <ContainerOutlined />
    </span>
  );
  const { loading, fileDetail, uploadLoading, currentPercent } = pageData;
  return (
    <div className={styles.uploadToolOuter}>
      <h3 className={styles.title}>上传静态资源文件</h3>
      <div className={styles.uploadContainer}>
        <Dragger disabled={loading || uploadLoading} {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">拖拽或点击上传</p>
          <p className="ant-upload-hint">支持上传图片、文档等静态资源</p>
        </Dragger>
      </div>
      {currentPercent ? (
        <div className={styles.progressOuter}>
          <BatteryProgress data={currentPercent} nums={200} />
        </div>
      ) : null}
      <div className={styles.resOuter}>
        {fileDetail && fileDetail.file_name ? (
          <Descriptions title="上传结果" bordered extra={renderExtra()}>
            <Descriptions.Item label="原文件名" span={3}>
              {fileDetail.origin_name}
            </Descriptions.Item>
            <Descriptions.Item label="存储名称" span={3}>
              {fileDetail.file_name}
            </Descriptions.Item>
            <Descriptions.Item label="文件类型">
              {fileDetail.ext_type}
            </Descriptions.Item>
            <Descriptions.Item label="文件扩展名">
              {fileDetail.ext}
            </Descriptions.Item>
            <Descriptions.Item label="mime_type">
              {fileDetail.mime_type}
            </Descriptions.Item>
            <Descriptions.Item label="文件大小" span={2}>
              {fileDetail.fsize}
            </Descriptions.Item>
            <Descriptions.Item label="所属空间">
              {fileDetail.bucket}
            </Descriptions.Item>
            <Descriptions.Item label="访问地址" span={3}>
              <a href={fileDetail.url} target="_blank" rel="noreferrer">
                {fileDetail.url}
              </a>
            </Descriptions.Item>
            {fileDetail.mime_type.indexOf('image') > -1 ? (
              <>
                <Descriptions.Item label="图片信息">
                  <div>
                    图片宽高：{fileDetail.img_width}x{fileDetail.img_height}
                  </div>
                  <Divider />
                  <div>图片体积：{fileDetail.img_size}</div>
                </Descriptions.Item>
              </>
            ) : null}
          </Descriptions>
        ) : pageData.uploadLoading ? (
          <Space>
            <Skeleton.Button active size="default" shape="square" />
            <Skeleton.Avatar active size="default" shape="circle" />
            <Skeleton.Input style={{ width: 200 }} active size="default" />
            <Skeleton.Button active size="default" shape="square" />
            <Skeleton.Avatar active size="default" shape="circle" />
            <Skeleton.Input style={{ width: 200 }} active size="default" />
          </Space>
        ) : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentBusinessPath: (...params) =>
    dispatch(setCurBusinessPath(...params)),
});

export default connect(() => ({}), mapDispatchToProps)(UploadTool);
