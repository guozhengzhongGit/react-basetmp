import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { apiGetFileList } from './api';
import { Alert, Table, Tag, Modal } from 'antd';
import fileIconMap, { platformIcon, fileTagColor } from '@/config/fileIconMap';
import AntIcon from '@c/AntIcon';
import { loadImageAsync } from '@u/common';
import styles from './style.scss';
const modalBodyStyle = {
  padding: '12px 14px',
  width: '100%',
  minHeight: '300px',
};
const FileList = () => {
  const [pageData, setPageData] = useState({
    loading: false,
    tableData: [],
    tableScrollHeight: 0,
  });
  const [previewModal, setPreviewModal] = useState({
    visible: false,
    fileLoading: false,
    imgUrl: '',
  });
  const fetchFileList = async () => {
    setPageData(
      produce((draft) => {
        draft.loading = true;
      })
    );
    try {
      const res = await apiGetFileList();
      if (res.msg === 'success') {
        setPageData(
          produce((draft) => {
            draft.loading = false;
            draft.tableData = res.data;
          })
        );
      }
    } catch (e) {
      setPageData(
        produce((draft) => {
          draft.loading = false;
        })
      );
      console.error(e);
    }
  };
  const handleWindowResize = () => {
    const viewHeight = document.documentElement.clientHeight;
    const contentHeight = viewHeight - 54 - 18 - 16 - 40 - 14 - 55 - 18 - 16;
    setPageData(
      produce((draft) => {
        draft.tableScrollHeight = contentHeight;
      })
    );
  };
  useEffect(() => {
    fetchFileList();
    const viewHeight = document.documentElement.clientHeight;
    const contentHeight = viewHeight - 54 - 18 - 16 - 40 - 14 - 55 - 18 - 16;
    setPageData(
      produce((draft) => {
        draft.tableScrollHeight = contentHeight;
      })
    );
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const renderFileIcon = (ext) => {
    return fileIconMap[ext.toLowerCase()];
  };

  const renderPlatformIcon = (v) => {
    return platformIcon[v];
  };

  const renderFileTypeColor = (v) => {
    return fileTagColor[v.toLowerCase()];
  };

  const previewFile = (data) => {
    if (data.ext_type === 'txt') return;
    if (data.mime_type.indexOf('image') > -1) {
      setPreviewModal(
        produce((draft) => {
          draft.visible = true;
          draft.fileLoading = true;
        })
      );
      loadImageAsync(data.url)
        .then(() => {
          setPreviewModal(
            produce((draft) => {
              draft.fileLoading = false;
              draft.imgUrl = data.url;
            })
          );
        })
        .catch((e) => e);
    }
  };

  const closeModal = () => {
    setPreviewModal(
      produce((draft) => {
        draft.visible = false;
      })
    );
  };

  const columns = [
    {
      title: '原文件',
      dataIndex: 'origin_name',
      key: 'origin_name',
      render: (text, rowData) => {
        return rowData.ext_type === 'txt' ? (
          <span>{text}</span>
        ) : (
          <a href={rowData.url} target="_blank" rel="noreferrer">
            {text}
          </a>
        );
      },
    },
    {
      title: '扩展名',
      width: '18%',
      align: 'center',
      dataIndex: 'ext_type',
      key: 'ext_type',
      render: (text) => {
        return (
          <div className={styles.extColumnOuter}>
            <span className={styles.icon}>{renderFileIcon(text)}</span>
            <div
              className={styles.text}
              style={{ background: renderFileTypeColor(text) }}
            >
              {text}
            </div>
          </div>
        );
      },
    },
    {
      title: '文件来源',
      width: '12%',
      align: 'center',
      dataIndex: 'hash',
      key: 'hash',
      render: (text, rowData) => {
        return (
          <div className={styles.platformColumnOuter}>
            <span>{renderPlatformIcon(rowData.bucket)}</span>
          </div>
        );
      },
    },
    {
      title: '所属空间',
      width: '12%',
      align: 'center',
      dataIndex: 'bucket',
      key: 'bucket',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: '文件体积',
      width: '14%',
      align: 'center',
      dataIndex: 'fsize',
      key: 'fsize',
      render: (text) => <div>{text}</div>,
    },
    {
      title: '预览',
      width: '14%',
      align: 'center',
      dataIndex: 'url',
      key: 'url',
      render: (text, rowData) => (
        <div
          onClick={() => previewFile(rowData)}
          className={
            rowData.ext_type === 'txt'
              ? `${styles.actionColumnOuter} ${styles.actionColumnOuterDisabled}`
              : styles.actionColumnOuter
          }
        >
          <Tag color="cyan">点我查看</Tag>
        </div>
      ),
    },
  ];
  const { loading, tableData, tableScrollHeight } = pageData;
  const { visible, fileLoading, imgUrl } = previewModal;
  return (
    <div className={styles.fileListOuter} id="fileListOuter">
      <Alert message="资源列表" type="info" />
      <div className={styles.tableOuter}>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
          rowKey="id"
          scroll={{ y: tableScrollHeight }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div>
                  <p className={styles.tableImgExtraInfo}>
                    该图片宽高: {record.img_width} x {record.img_height}
                  </p>
                </div>
              );
            },
            rowExpandable: (record) => !!record.img_width,
          }}
        />
      </div>
      <Modal
        width={800}
        bodyStyle={modalBodyStyle}
        getContainer={() => document.querySelector('#fileListOuter')}
        title="文件预览"
        visible={visible}
        footer={null}
        onCancel={closeModal}
      >
        <div className={styles.previewModalOuter}>
          {fileLoading ? (
            <span className={styles.imgLoadingContainer}>
              <AntIcon type="icon-gzzLoading" />
            </span>
          ) : (
            <img src={imgUrl} alt="" />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FileList;
