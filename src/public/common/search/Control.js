import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  input: {
    display: 'flex',
    padding: 0,
  },
};

const InputComponent = ({ inputRef, ...rest }) => (
  <div ref={inputRef} {...rest} />
);

class Control extends React.Component {
  render() {
    const { classes, innerRef, innerProps, children, selectProps } = this.props;
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent: InputComponent,
          inputProps: {
            className: classes.input,
            inputRef: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...selectProps.textFieldProps}
      />
    );
  }
}

export default withStyles(styles)(Control);
