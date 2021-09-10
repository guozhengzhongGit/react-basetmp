import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Input,
  Switch,
  DatePicker,
  Select,
  Button,
  message,
} from 'antd';
import { Editor } from '@bytemd/react';
import localStorage from '@u/localStorage';
import dayjs from 'dayjs';
import zh_Hans from 'bytemd/lib/locales/zh_Hans.json';
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import highlight from '@bytemd/plugin-highlight';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { produce } from 'immer';
import { apiGetUser, apiGetTag, apiPostSubmitContent } from './api';
import 'bytemd/dist/index.min.css';
// import 'github-markdown-css';
import 'juejin-markdown-theme-channing-cyan';
import 'highlight.js/styles/atom-one-light.css';
import './editor.css';
import style from './style.scss';
import { setCurBusinessPath } from '@s/modules/global/action';

// hljs.registerLanguage('javascript', javascript);

const { Item } = Form;
const { Option, OptGroup } = Select;
const editorPlugins = [
  gfm(),
  breaks(),
  footnotes(),
  frontmatter(),
  highlight(),
  mediumZoom(),
];

const CreateContent = (props) => {
  const [form] = Form.useForm();
  const [formPool, setFormPool] = useState({
    userAdminPool: [],
    userPool: [],
    tagPool: [],
  });
  const [formValue, setFormValue] = useState({
    loading: false,
  });
  const [editorValue, setEditorValue] = useState('');
  const fetchUser = async () => {
    try {
      const res = await apiGetUser();
      if (Array.isArray(res.data)) {
        const userAdmin = res.data.filter((item) => item.role_id === 1);
        const user = res.data.filter((item) => item.role_id !== 1);
        setFormPool(
          produce((draft) => {
            draft.userAdminPool = userAdmin;
            draft.userPool = user;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTag = async () => {
    try {
      const res = await apiGetTag();
      if (Array.isArray(res.data)) {
        setFormPool(
          produce((draft) => {
            draft.tagPool = res.data;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchTag();
  }, []);
  const submitContent = async (params) => {
    try {
      const res = await apiPostSubmitContent(params);
      setFormValue({
        loading: false,
      });
      if (res.msg === 'success') {
        message.success('创建成功');
        props.changeCurrentBusinessPath('/home/dashboard');
        props.history.push('/home/dashboard');
      }
    } catch (e) {
      setFormValue({
        loading: false,
      });
      console.error(e);
    }
  };
  const bundleParams = (values) => {
    const userInfo = localStorage.getValue('userInfo');
    const {
      create_time: createTime,
      creator,
      isPublic,
      tags,
      ...rest
    } = values;
    const create_time = dayjs(createTime).format('YYYY-MM-DD HH:mm');
    const create_timestamp = dayjs(createTime).unix();
    const creator_id = creator - 0;
    const is_public = isPublic ? 1 : 2;
    const tag_id = tags.join(',');
    const content = editorValue;
    const params = {
      create_time,
      create_timestamp,
      creator_id,
      is_public,
      tag_id,
      content,
      user_id: userInfo.id,
      role_id: userInfo.role_id,
      ...rest,
    };
    return params;
  };
  const onFinish = () => {
    setFormValue({
      loading: true,
    });
    form
      .validateFields()
      .then((res) => {
        if (!editorValue) {
          message.warn('正文内容不能为空');
          setFormValue({
            loading: false,
          });
          return;
        }
        const params = bundleParams(res);
        submitContent(params);
      })
      .catch((e) => {
        setFormValue({
          loading: false,
        });
        console.error(e);
      });
  };
  return (
    <div className={style.createContent}>
      <div className={style.formOuter}>
        <Form form={form}>
          <Row gutter={12}>
            <Col span={8}>
              <Item
                name="title"
                label="内容标题"
                rules={[
                  {
                    required: true,
                    message: '请输入内容标题',
                  },
                ]}
              >
                <Input placeholder="请输入内容标题" maxLength={18} />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="sub_title"
                label={<span style={{ paddingLeft: 25 }}>副标题</span>}
              >
                <Input placeholder="请输入副标题" maxLength={50} />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="creator"
                label="内容作者"
                rules={[
                  {
                    required: true,
                    message: '请选择内容作者',
                  },
                ]}
              >
                <Select placeholder="请选择内容作者">
                  <OptGroup label="管理员">
                    {formPool.userAdminPool.map((item) => (
                      <Option key={item.id}>{item.username}</Option>
                    ))}
                  </OptGroup>
                  <OptGroup label="普通用户">
                    {formPool.userPool.map((item) => (
                      <Option key={item.id}>{item.username}</Option>
                    ))}
                  </OptGroup>
                </Select>
              </Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Item
                name="tags"
                label="内容标签"
                rules={[
                  {
                    required: true,
                    message: '请选择内容标签',
                  },
                ]}
              >
                <Select
                  placeholder="请选择内容标签"
                  showArrow
                  allowClear
                  maxTagCount={4}
                  mode="multiple"
                >
                  {formPool.tagPool.map((tag) => (
                    <Option key={tag.tag_id} value={tag.tag_id}>
                      <span style={{ color: tag.color }}>{tag.tag_name}</span>
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="create_time"
                label="创作时间"
                rules={[
                  {
                    required: true,
                    message: '请选择创作时间',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="请选择创作时间"
                  renderExtraFooter={() => '快捷选择'}
                  showTime
                />
              </Item>
            </Col>
            <Col span={8}>
              <Row gutter={12}>
                <Col span={12}>
                  <Item
                    name="isPublic"
                    label="是否公开"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: '请选择是否公开',
                      },
                    ]}
                    initialValue={true}
                  >
                    <Switch checkedChildren="公开" unCheckedChildren="保密" />
                  </Item>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    onClick={onFinish}
                    loading={formValue.loading}
                  >
                    提交
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={style.editorOuter}>
        <Editor
          mode="auto"
          placeholder="请输入正文"
          locale={zh_Hans}
          value={editorValue}
          plugins={editorPlugins}
          onChange={(v) => {
            setEditorValue(v);
          }}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentBusinessPath: (...params) =>
    dispatch(setCurBusinessPath(...params)),
});

export default connect(() => ({}), mapDispatchToProps)(CreateContent);
