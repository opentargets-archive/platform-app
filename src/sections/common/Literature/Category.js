import React from 'react';
import {
  InputLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
// import ScrollToTop from '../../../components/ScrollToTop';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryListState, categoryState } from './atoms';

const toggleValue = (selected, categories) => {
  const isChecked = categories.indexOf(selected) !== -1;
  if (!isChecked) return [...categories, selected];
  return [...categories.filter(value => value !== selected)];
};

export default function Category() {
  const categories = useRecoilValue(categoryListState);
  const [category, setCategory] = useRecoilState(categoryState);
  // const [startTransition, isPending] = useTransition({
  //   timeoutMs: 3000,
  // });

  const handleChange = event => {
    // startTransition(() => {
    const {
      target: { name: clicked },
    } = event;
    const newCategories = toggleValue(clicked, category);
    setCategory(newCategories);
    // });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <ScrollToTop /> */}

      <InputLabel style={{ marginRight: '15px' }} id="demo-mutiple-name-label">
        Tag category:
      </InputLabel>
      <FormGroup row>
        {categories.map(({ name, label }) => {
          return (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={category.indexOf(name) !== -1}
                  onChange={handleChange}
                  name={name}
                  color="primary"
                  // disabled={isPending}
                />
              }
              label={label}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
