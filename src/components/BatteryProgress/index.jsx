import React, { Component } from 'react';
import styles from './style.scss';

export default class BatteryProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#000',
      progressColor: '#aaa',
    };
  }

  renderProgress() {
    const progressItemStyle = {
      width: `${100 / this.props.nums}%`,
      height: '100%',
      lineHeight: '100%',
      padding: '0px 1px',
      fontWeight: 600,
      // color: `rgb(${this.props.progressColor}`,
    };
    let progressItemLength = this.props.nums * (this.props.data / 100);
    var ele = [];
    for (let i = 0; i < progressItemLength; i++) {
      ele.push(
        <div
          style={Object.assign(progressItemStyle, {
            color: `rgb(${this.state.progressColor}`,
          })}
          key={i}
        >
          /
        </div>
      );
    }
    return ele;
  }

  componentDidMount() {
    if (this.props.data === 100) {
      this.setState({ bgColor: '#f5f5f5', progressColor: '#13c2c2' });
    } else if (this.props.data >= 80) {
      this.setState({ bgColor: '#d9f7be', progressColor: '#73d13d' });
    } else if (this.props.data >= 50) {
      this.setState({ bgColor: '#e6fffb', progressColor: '#36cfc9' });
    } else if (this.props.data >= 20) {
      this.setState({ bgColor: '#ffe7ba', progressColor: '#fa8c16' });
    } else {
      this.setState({ bgColor: '#fff2e8', progressColor: '#ff7a45' });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data === 100) {
        this.setState({ bgColor: '#f5f5f5', progressColor: '#13c2c2' });
      } else if (this.props.data >= 80) {
        this.setState({ bgColor: '#d9f7be', progressColor: '#73d13d' });
      } else if (this.props.data >= 50) {
        this.setState({ bgColor: '#e6fffb', progressColor: '#36cfc9' });
      } else if (this.props.data >= 20) {
        this.setState({ bgColor: '#ffe7ba', progressColor: '#fa8c16' });
      } else {
        this.setState({ bgColor: '#fff2e8', progressColor: '#ff7a45' });
      }
    }
  }
  render() {
    const { bgColor, progressColor } = this.state;
    const { data } = this.props;
    const progressArticleStyle = {
      color: progressColor,
      background: bgColor,
      border: `1px solid ${progressColor}`,
    };
    return (
      <div className={styles.barContainer}>
        <div style={progressArticleStyle} className={styles.bar}>
          {this.renderProgress()}
        </div>
        <div className={styles.num} style={{ color: progressColor }}>
          {data}%
        </div>
      </div>
    );
  }
}
