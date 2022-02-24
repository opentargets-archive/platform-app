import React, { Fragment, useState } from 'react';
import Select, { components } from 'react-select';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';
import { Search } from '@material-ui/icons';
import DiseaseOptions from './diseaseOptions.json'
import { inputSanitize } from './utils';


const TARGET_SEARCH_QUERY = loader('./TargetSearchQuery.gql')

/*      react-select custom style   */
const customStyle = {
  option: (provided, state) => (
  {
    ...provided,
    backgroundColor: state.isFocused ? '#ECECEC' : 'white',
    color: 'black',
    fontSize: "14px"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: '16px',
    // border: '1px solid black',
    margin: '0px',
    padding: '0px'
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "28px 0px",
    borderBottom: '1px solid black',
    paddingTop: '1px',
  }),
  control: (styles) => ({
    ...styles,
    border: 'none',
    // This line disable the blue border
    boxShadow: 'none'
  }),
  clearIndicator: () => ({
    borderBottom: '1px solid black',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingRight: 0,
  })

}

const getDiseaseOptions = () => {
  let diseaseList = []
  DiseaseOptions.forEach(e => {
    diseaseList.push(
      {value: e.Disease, label: e.Disease}
    )
  });
  return diseaseList
}

function PedSearch({setInputValue, inputValue, entity="disease", defaultOptions, placeHolder="Search and Select"}) {
  const [isClearable] = useState(true)
  const [isLoading] = useState(false)
  const [isSearchable] = useState(true)
  const [diseaseOptions] = useState(getDiseaseOptions())

  const [getGeneOptions, {loading, data}] = useLazyQuery(TARGET_SEARCH_QUERY)

  const  handleChange = (e) => {
    if (typeof e === "string") {
      setInputValue(e || '')
    } else if (typeof e === "object") {
      setInputValue(e?.value || '')
    }
  }
  const handlerOnInputChange = (inputVal) => {
      return  getGeneOptions({ variables: {geneSymbol: inputSanitize(inputVal)}})
  }
  
  /****         Custom react-select components         ****/
  const NoOptionsMessage = props => {
    const inputvalue = props?.selectProps?.inputValue || ''
    
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class"> { inputvalue.length > 0 ? "No matches were found" : placeHolder }</span> 
      </components.NoOptionsMessage>
    );
  };
  const ClearIndicator = props => {
    return props?.selectProps?.value?.value?.length === 0 
            ? null 
            : <components.ClearIndicator {...props}></components.ClearIndicator> 
  }
  const DropdownIndicator = props => {
    return !props?.selectProps?.value?.value?.length 
              ? <div style={{ borderBottom: '1px solid black', marginBottom: '4px', paddingRight: '4px'}}>
                  <Search style={{}}/>
                </div>
              : null
  }
  const getTargetOptions = () => {
    const options = []
    const fetchData = data?.pedCanNavGene?.rows
    if (fetchData) {
      fetchData.map(({key}) => options.push({value: key, label: key}))
    } 
    return  options.length === 0 ? defaultOptions : options
  }

  return (
    <Fragment>
      <Select
        defaultValue={inputValue ? {value: inputValue, label: inputValue} : ''}
        loading={loading}         
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        options={ entity === 'target' ? getTargetOptions() : diseaseOptions }
        onChange={handleChange}
        styles={customStyle}
        placeholder={placeHolder}
        components={{ ClearIndicator, DropdownIndicator, NoOptionsMessage, IndicatorSeparator: () => null}}
        onInputChange={handlerOnInputChange}
      />
    </Fragment>
  );
}
export default PedSearch;
