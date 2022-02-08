import React, { Component, Fragment } from 'react';

import Select from 'react-select';

import DiseaseOptions from './diseaseOptions.json'
import TargetOptions from './targetOptions.json'

export default class PedSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      isClearable: true,
      isLoading: false,
      isSearchable: true,
      geneSymbolOptions: [],
      diseaseOptions: [],
    }
    this.toggleClearable = this.toggleClearable.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
    this.toggleSearchable = this.toggleSearchable.bind(this)
  }

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
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
    const geneSymbolList = []
    const diseaseList = []

    if (this.props.entity === "target") {
        TargetOptions.forEach(e => {
          geneSymbolList.push(
            {value: e.Gene_symbol, label: e.Gene_symbol}
          )
        });
      this.setState({geneSymbolOptions: geneSymbolList})
    } else if (this.props.entity === "disease") {
        DiseaseOptions.forEach(e => {
          diseaseList.push(
            {value: e.Disease, label: e.Disease}
          )
        });
      this.setState({diseaseOptions: diseaseList})
    }
  }
  componentDidMount(){
    this.getOptions()
  }

  render() {

    const { isClearable, isSearchable, isLoading, geneSymbolOptions, diseaseOptions} =
      this.state;
    const { inputValue, entity } = this.props;
    
    return (
      <Fragment>
        <Select         
          className="basic-single"
          classNamePrefix="select"
          defaultValue={ {value: inputValue, label: inputValue} || ''}
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          name="color"
          options={ entity === 'target' ? geneSymbolOptions : diseaseOptions}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}