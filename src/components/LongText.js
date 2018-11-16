import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  textContainer: {
    display: 'inline-block',
    overflow: 'hidden',
  },
  showMore: {
    color: 'blue',
    cursor: 'pointer',
  },
});

class LongText extends Component {
  textRef = React.createRef();

  state = {
    showMore: false,
    height: 0,
    lineHeight: 0,
  };

  componentDidMount() {
    const el = this.textRef.current;
    const height = el.offsetHeight;
    const lineHeight = Number.parseInt(
      document.defaultView
        .getComputedStyle(el, null)
        .getPropertyValue('line-height'),
      10
    );

    this.setState({
      height,
      lineHeight,
    });
  }

  showMore = () => {
    this.setState(({ showMore }) => ({ showMore: !showMore }));
  };

  render() {
    const { children, classes, lineLimit } = this.props;
    const { showMore, height, lineHeight } = this.state;
    const numberOfLines = lineHeight === 0 ? 0 : height / lineHeight;
    const hideText = numberOfLines > lineLimit;
    return (
      <span>
        <span
          className={classes.textContainer}
          style={{
            height: showMore ? height : lineLimit * lineHeight,
          }}
        >
          <span ref={this.textRef}>{children}</span>
        </span>
        {hideText && (
          <span>
            {showMore ? '' : '... '}[{' '}
            <span className={classes.showMore} onClick={this.showMore}>
              {showMore ? ' hide' : ' showMore'}
            </span>{' '}
            ]
          </span>
        )}
      </span>
    );
  }
}

export default withStyles(styles)(LongText);
