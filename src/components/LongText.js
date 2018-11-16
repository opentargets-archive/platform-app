import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  textContainer: {
    display: 'inline-block',
    overflow: 'hidden',
  },
  showMore: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
});

class LongText extends Component {
  textRef = React.createRef();

  state = {
    showMore: false,
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
      lineHeight,
      numberOfLines: Math.round(height / lineHeight),
    });
  }

  showMore = () => {
    this.setState(({ showMore }) => ({ showMore: !showMore }));
  };

  render() {
    const { children, classes, lineLimit } = this.props;
    const { showMore, lineHeight, numberOfLines } = this.state;

    return (
      <span>
        <span
          className={classes.textContainer}
          style={{
            height: showMore ? 'auto' : lineLimit * lineHeight,
          }}
        >
          <span ref={this.textRef}>{children}</span>
        </span>
        {numberOfLines > lineLimit && (
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
