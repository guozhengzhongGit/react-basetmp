import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Statistic, Divider, Progress, Modal } from 'antd';
import { SmileTwoTone, SmileOutlined } from '@ant-design/icons';
import Welcome from '@c/Welcome';
import userSvg from '@a/imgs/user.svg';
import assetsSvg from '@a/imgs/assets.svg';
import contentSvg from '@a/imgs/content.svg';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TitleComponent,
  DataZoomComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { LineChart, BarChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import localStorage from '@u/localStorage';

echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  DataZoomComponent,
  BarChart,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  ScatterChart,
]);
import {
  titleAssetsChartOption,
  titleContentChartOption,
  titleUserChartOption,
  secondFloorContentOption,
  asyncBarOption,
  asyncRightBarOption,
  scatterOption,
  qipaoOption,
} from './mockData';
import style from './style.scss';
import produce from 'immer';
const Dashboard = () => {
  const asyncBarRef = useRef(null);
  const asyncRightRef = useRef(null);
  const [pageData, setPageData] = useState({
    welcomeModal: true,
  });
  useEffect(() => {
    const titleUser = document.querySelector('#titleUser');
    const titleContent = document.querySelector('#titleContent');
    const titleAssets = document.querySelector('#titleAssets');
    const secondFloorContent = document.querySelector('#secondFloorContent');
    const asyncBar = document.querySelector('#asyncBar');
    const asyncRight = document.querySelector('#asyncRight');
    const qipao = document.querySelector('#qipao');

    titleUser.style.height = '80px';
    // titleUser.style.marginTop = '20px';

    titleContent.style.height = '80px';
    // titleContent.style.marginTop = '20px';

    titleAssets.style.height = '300px';
    // titleAssets.style.marginTop = '20px';

    secondFloorContent.style.height = '350px';

    asyncBar.style.height = '300px';
    asyncRight.style.height = '300px';
    qipao.style.height = '300px';

    // 用户
    const titleUserChartInstance = echarts.init(titleUser, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    titleUserChartInstance.setOption(titleUserChartOption);

    // 文章
    const titleContentChartInstance = echarts.init(titleContent, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    titleContentChartInstance.setOption(titleContentChartOption);

    // 资源
    const titleAssetsChartInstance = echarts.init(titleAssets, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    titleAssetsChartInstance.setOption(titleAssetsChartOption);

    // 通栏
    const secondFloorContentInstance = echarts.init(secondFloorContent, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    secondFloorContentInstance.setOption(secondFloorContentOption);

    const asyncBarInstance = echarts.init(asyncBar, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    const asyncRightInstance = echarts.init(asyncRight, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    const qipqoInstance = echarts.init(qipao, null, {
      useDirtyRect: true,
      width: 'auto',
      height: 'auto',
    });

    // asyncBarInstance.setOption(secondFloorContentOption);

    const asyncBarApp = {};
    asyncBarApp.count = 11;
    asyncBarRef.current = setInterval(function () {
      const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

      const data0 = asyncBarOption.series[0].data;
      const data1 = asyncBarOption.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      asyncBarOption.xAxis[0].data.shift();
      asyncBarOption.xAxis[0].data.push(axisData);
      asyncBarOption.xAxis[1].data.shift();
      asyncBarOption.xAxis[1].data.push(asyncBarApp.count++);

      asyncBarInstance.setOption(asyncBarOption);
    }, 2100);
    let currentOption = scatterOption;
    asyncRightRef.current = setInterval(function () {
      currentOption =
        currentOption === scatterOption ? asyncRightBarOption : scatterOption;
      asyncRightInstance.setOption(currentOption, true);
    }, 2000);
    asyncRightInstance.setOption(currentOption, true);

    qipqoInstance.setOption(qipaoOption);
    return () => {
      clearInterval(asyncBarRef.current);
      asyncBarRef.current = null;
    };
  }, []);
  const closeWelcomeModal = () => {
    localStorage.setValue('showWelcomeModal', true);
    setPageData(
      produce((draft) => {
        draft.welcomeModal = false;
      })
    );
  };
  return (
    <div className={style.dashboardOuter}>
      <div className={style.titleOuter}>
        <Row gutter={20}>
          <Col span={8}>
            <div className={style.itemContainer}>
              <Row>
                <Col span={18}>
                  <Statistic title="用户" value={8} />
                </Col>
                <Col span={6}>
                  <div className={style.explain}>
                    <img src={userSvg} alt="" />
                  </div>
                  {/*<Statistic title="用户" value={112893} />*/}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div id="titleUser"></div>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <div className={style.userTips}>
                <div className={style.tipItem}>
                  <span>注册用户</span>
                  <span className={style.value}>98.89%</span>
                  <span className={style.up} />
                </div>
                <div className={style.tipItem}>
                  <span>活跃用户</span>
                  <span className={style.value}>34.89%</span>
                  <span className={style.down} />
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={style.itemContainer}>
              <Row>
                <Col span={18}>
                  <Statistic title="文章" value={12} />
                </Col>
                <Col span={6}>
                  <div className={style.explain}>
                    <img src={contentSvg} alt="" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div id="titleContent"></div>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <div className={style.userTips}>
                <div className={style.tipItem}>
                  <span>现有文章</span>
                  <span className={style.value}>8</span>
                  <span className={style.down} />
                </div>
                <div className={style.tipItem}>
                  <span>最近新增</span>
                  <span className={style.value}>4</span>
                  <span className={style.up} />
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={style.itemContainer}>
              <Row>
                <Col span={18}>
                  <Statistic title="资源" value={43} />
                </Col>
                <Col span={6}>
                  <div className={style.explain}>
                    <img src={assetsSvg} alt="" />
                  </div>
                </Col>
              </Row>
              <div className={style.titleAssets}>
                <Progress
                  strokeWidth={8}
                  strokeColor={{
                    from: '#ffc069',
                    to: '#ff4d4f',
                  }}
                  percent={36.7}
                  status="active"
                />
                <Progress
                  strokeWidth={8}
                  strokeColor={{
                    from: '#fff566',
                    to: '#ffc53d',
                  }}
                  percent={71.8}
                  status="active"
                />
                <Progress
                  strokeWidth={8}
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                  }}
                  percent={99.9}
                  status="active"
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div className={style.userTips}>
                <div className={style.tipItem}>
                  <span>正常访问</span>
                  <span className={style.fileStatusValue}>41</span>
                  <SmileTwoTone />
                  {/*<span className={style.up} />*/}
                </div>
                <div className={style.tipItem}>
                  <span>状态异常</span>
                  <span className={style.fileStatusValue}>2</span>
                  <SmileOutlined rotate={180} style={{ color: '#eb2f96' }} />
                  {/*<span className={style.down} />*/}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={style.contentOuter}>
        <div id="secondFloorContent"></div>
      </div>
      <div className={`${style.contentOuter} ${style.contentOuterFlex}`}>
        <div id="asyncBar" style={{ width: '60%' }}></div>
        <div id="asyncRight" style={{ width: '40%' }}></div>
      </div>
      <div className={`${style.contentOuter} ${style.contentOuterFlex}`}>
        <div id="qipao" style={{ width: '40%' }}></div>
        <div id="titleAssets" style={{ width: '60%' }}></div>
      </div>
      {localStorage.getValue('showWelcomeModal') ? null : (
        <Modal
          title="系统介绍"
          visible={pageData.welcomeModal}
          destroyOnClose
          width="860px"
          footer={null}
          onCancel={closeWelcomeModal}
          bodyStyle={{ padding: '0px 24px 24px' }}
        >
          <Welcome />
        </Modal>
      )}
    </div>
  );
};
export default Dashboard;
