import { createFromIconfontCN } from '@ant-design/icons';
const AntIcon = createFromIconfontCN({
  scriptUrl:
    process.env.NODE_ENV === 'production'
      ? '/font/iconfont.js'
      : '//at.alicdn.com/t/font_2758544_625k9lmoakb.js',
});

export default AntIcon;
