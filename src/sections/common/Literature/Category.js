import React from 'react';
import {
  InputLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedCategoriesState,
  loadingEntitiesState,
  literatureState,
  fetchSimilarEntities,
  updateLiteratureState,
} from './atoms';

const toggleValue = (selected, categories) => {
  const isChecked = categories.indexOf(selected) !== -1;
  if (!isChecked) return [...categories, selected];
  return [...categories.filter(value => value !== selected).sort()];
};

const categories = [
  { name: 'target', label: 'Target' },
  { name: 'disease', label: 'Disease' },
  { name: 'drug', label: 'Drug' },
];

export default function Category() {
  const category = useRecoilValue(selectedCategoriesState);
  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const [loadingEntities, setLoadingEntities] = useRecoilState(
    loadingEntitiesState
  );

  const bibliographyState = useRecoilValue(literatureState);

  const handleChange = async event => {
    const {
      query,
      id,
      category,
      selectedEntities,
      globalEntity,
      cursor,
    } = bibliographyState;
    const {
      target: { name: clicked },
    } = event;
    const newCategories = toggleValue(clicked, category);
    setLoadingEntities(true);
    const request = await fetchSimilarEntities({
      query,
      id,
      category: newCategories,
      entities: selectedEntities,
      cursor,
    });
    const data = request.data[globalEntity];

    const update = {
      entities: data.similarEntities,
      loadingEntities: false,
      category: newCategories,
    };
    setLiteratureUpdate(update);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
                  disabled={loadingEntities}
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
