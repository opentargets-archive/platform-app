import React, { Fragment, useState } from 'react';
import Select, { components } from 'react-select';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';
import { Search } from '@material-ui/icons';
import DiseaseOptions from './diseaseOptions.json'

const TARGET_SEARCH_QUERY = loader('../../pages/PedCancerDataNavPage/TargetSearchQuery.gql')

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
    fontSize: '16px'
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "28px 0px",
    borderBottom: '1px solid black'
 
  }),
  control: (styles) => ({
    ...styles,
    border: 'none',
    // This line disable the blue border
    boxShadow: 'none'
  })
}

const getDiseaseOptions = () => {
  console.log("I am here")
  let diseaseList = []
  DiseaseOptions.forEach(e => {
    diseaseList.push(
      {value: e.Disease, label: e.Disease}
    )
  });
  return diseaseList
}

function PedSearch({setInputValue, inputValue, entity="disease"}) {
  const [isClearable] = useState(true)
  const [isLoading] = useState(false)
  const [isSearchable] = useState(true)
  const [diseaseOptions] = useState(getDiseaseOptions())

  const [getGeneOptions, {loading, error, data}] = useLazyQuery(TARGET_SEARCH_QUERY)

  const  handleChange = (e) => {
    if (typeof e === "string") {
      setInputValue(e || '')
    } else if (typeof e === "object") {
      setInputValue(e?.value || '')
    }
    console.log("Selected: ", e)
  }
  const handlerOnInputChange = (inputVal) => {
      console.log("Input Value: ", inputVal)
      return  getGeneOptions({ variables: {geneSymbol: inputVal}})
  }
  
  // Custom react-select components
  const NoOptionsMessage = props => {
    const inputvalue = props?.selectProps?.inputValue || ''
    console.log("NoOptionsMessage: inputValue: ", inputvalue)
    
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class"> { inputvalue.length > 0 ? "No Option" : "Start searching ... " }</span> 
      </components.NoOptionsMessage>
    );
  };
  const ClearIndicator = props => {
    console.log("ClearIndicator: selectProps.value: ", props?.selectProps?.value?.value?.length)

    return props?.selectProps?.value?.value?.length === 0 
            ? null 
            : <components.ClearIndicator {...props}></components.ClearIndicator> 
  }
  const DropdownIndicator = props => {
    console.log("DropdownIndicator: selectProps.value: ", props?.selectProps?.value?.value?.length)

    return !props?.selectProps?.value?.value?.length ? <Search /> : null
  }

  console.log("Gene data", data)
  return (
    <Fragment>
      <Select
        loading={loading}         
        className="basic-single"
        classNamePrefix="select"
        defaultValue={ {value: inputValue, label: inputValue} || ''}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name="color"
        options={ 
          entity === 'target' 
          ? 
            data &&
            data.pedCanNavGene &&
            data.pedCanNavGene.rows &&
            data.pedCanNavGene.rows.map(({key}) => ({value: key, label: key}))
          
          : diseaseOptions
        }
        onChange={handleChange}
        styles={customStyle}
        placeholder=""
        autoFocus={false}
        components={{ DropdownIndicator, IndicatorSeparator:() => null, ClearIndicator ,NoOptionsMessage}}
        onInputChange={handlerOnInputChange}
      />
    </Fragment>
  );
}
export default PedSearch;
