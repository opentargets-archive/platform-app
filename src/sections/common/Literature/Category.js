import React, { useState } from 'react';
import {
  Chip,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import ScrollToTop from '../../../components/ScrollToTop';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryListState, categoryState } from './atoms';

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    minWidth: '180px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Category() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const categories = useRecoilValue(categoryListState);
  const [category, setCategory] = useRecoilState(categoryState);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = event => {
    setOpen(false);
    setCategory(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScrollToTop />
      <InputLabel style={{ marginRight: '15px' }} id="demo-mutiple-name-label">
        Tag category:
      </InputLabel>
      <FormControl className={classes.controlsContainer}>
        {/* <InputLabel id="demo-mutiple-name-label">Tag category:</InputLabel> */}
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          displayEmpty
          value={category}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          renderValue={selected => {
            if (selected.length === 0) {
              return <Chip label="All" className={classes.chip} />;
            }
            return (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={categories.find(x => x.name === value).label}
                    className={classes.chip}
                  />
                ))}
              </div>
            );
          }}
        >
          <MenuItem disabled value="">
            <em>All</em>
          </MenuItem>
          {categories.map(category => (
            <MenuItem
              key={category.name}
              value={category.name}
              // style={getStyles(category.value, category, theme)}
            >
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
