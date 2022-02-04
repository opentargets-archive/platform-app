import React, { Component, Fragment } from 'react';

import Select from 'react-select';
// import AsyncSelect from 'react-select/async'
//import { colourOptions } from '../data';

// const geneSymbolList = [
//   { value: 'CDK14', label: 'CDK14'},
//   { value: 'SOX30', label: 'SOX30'},		
//   { value: 'RBMX', label: 'RBMX'},
//   { value: 'KCNK13', label: 'KCNK13'},
//   { value: 'MORC3', label: 'MORC3'},
//   { value: 'PDCD2', label: 'PDCD2'},	
//   { value: 'FRY', label: 'FRY'},
//   { value: 'ALK', label: 'ALK'},
//   { value: 'ZSCAN16-AS1', label: 'ZSCAN16-AS1'},
//   { value: 'HEG1', label: 'HEG1'},
//   { value: 'CACNA1I', label: 'CACNA1I'},
//   { value: 'ZNRF2', label: 'ZNRF2'},
//   { value: 'ZNRD1ASP', label: 'ZNRD1ASP'},	
//   { value: 'ZNRD1', label: 'ZNRD1'},
//   { value: 'ZNHIT2', label: 'ZNHIT2'},
//   { value: 'ZNF971P', label: 'ZNF971P'},
//   { value: 'ZNF965P', label: 'ZNF965P'},
//   { value: 'ZNF962P', label: 'ZNF962P'},
//   { value: 'ZNF93', label: 'ZNF93'},
//   { value: 'ZNF90P3', label: 'ZNF90P3'},
//   { value: 'ZNF90P2', label: 'ZNF90P2'},
//   { value: 'ZNF880', label: 'ZNF880'},
// ]

const diseaseList = [
  { value: 'Acute Lymphoblastic Leukemia', label: 'Acute Lymphoblastic Leukemia'},
  { value: 'Acute Myeloid Leukemia', label: 'Acute Myeloid Leukemia'},
  { value: 'Clear cell sarcoma of the kidney', label: 'Clear cell sarcoma of the kidney'},
  { value: 'Osteosarcoma', label: 'Osteosarcoma'},
  { value: 'neuroblastoma', label: 'neuroblastoma'},
  { value: 'Craniopharyngioma', label: 'Craniopharyngioma'},
  { value: 'Atypical Teratoid Rhabdoid Tumor', label: 'Atypical Teratoid Rhabdoid Tumor'},
  { value: 'High-grade glioma/astrocytoma', label: 'High-grade glioma/astrocytoma'},
  { value: 'Choroid plexus carcinoma', label: 'Choroid plexus carcinoma'},
  { value: 'Ewing sarcoma', label: 'Ewing sarcoma'},
  { value: 'Adenoma', label: 'Adenoma'},
  { value: 'Germinoma', label: 'Germinoma'},
  { value: 'Diffuse midline glioma', label: 'Diffuse midline glioma'},
  { value: 'Low-grade glioma/astrocytoma', label: 'Low-grade glioma/astrocytoma'},
  { value: 'Meningioma', label: 'Meningioma'},
  { value: 'Sarcoma', label: 'Sarcoma'},
  { value: 'CNS Embryonal tumor', label: 'CNS Embryonal tumor'},
  { value: 'Teratoma', label: 'Teratoma'},
  { value: 'Subependymal Giant Cell Astrocytoma', label: 'Subependymal Giant Cell Astrocytoma'},
  { value: 'Chordoma', label: 'Chordoma'},
  { value: 'Neuroblastoma', label: 'Neuroblastoma'},
  { value: 'Neurofibroma/Plexiform', label: 'Neurofibroma/Plexiform'},
  { value: 'Schwannoma', label: 'Schwannoma'},
  { value: 'Medulloblastoma', label: 'Medulloblastoma'},
  { value: 'Dysembryoplastic neuroepithelial tumor', label: 'Dysembryoplastic neuroepithelial tumor'},
  { value: 'Rhabdoid tumor', label: 'Rhabdoid tumor'},
  { value: 'choroid plexus papilloma', label: 'Choroid plexus papilloma'}

]

export default class PedSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      geneSymbolOptions: [],
      diseaseOptions: diseaseList
    }
    this.toggleClearable = this.toggleClearable.bind(this)
    this.toggleDisabled = this.toggleDisabled.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
    this.toggleRtl = this.toggleRtl.bind(this)
    this.toggleSearchable = this.toggleSearchable.bind(this)
  
  }
 

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  handleChange = (e) => {
    if (typeof e === "string") {
      this.props.setInputValue(e || '')
    } else if (typeof e === "object") {
      console.log("It's true")
      this.props.setInputValue(e?.value || '')
    }
    console.log("Selected: ", e)
  }

  getOptions(){
    if (this.props.entity === "target") {
      this.setState({isLoading: true})
      let i = 0;
      let geneSymbolList = [
        { value: 'CDK14', label: 'CDK14'},
        
      ] 
      while( i < 40000) {
        geneSymbolList = [...geneSymbolList, { value: 'ZNRD1', label: 'ZNRD1'}]
        i++
      }
      if (i >= 40000) {
        this.setState({isLoading: false})
      }
      this.setState({geneSymbolOptions: geneSymbolList})
    }
  }
  componentDidMount(){
    this.getOptions()
  }

  render() {

    const { isClearable, isSearchable, isDisabled, isLoading, isRtl, geneSymbolOptions, diseaseOptions} =
      this.state;
    const { inputValue, entity} = this.props;
    
    console.log("geneSymbolList: ", geneSymbolOptions)

    return (
      <Fragment>
        <Select         
          className="basic-single"
          classNamePrefix="select"
          defaultValue={ {value: inputValue, label: inputValue} || ''}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={ entity === 'target' ? geneSymbolOptions : diseaseOptions}
          onChange={this.handleChange}
          // cacheOptions defaultOptions 
          // loadOptions={colourOptions}
          // onInputChange={this.handleChange}
        />

      
      </Fragment>
    );
  }
}