import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()
    this.state = {
      searchText: ''
    }
  }

  handleOnChange(fieldValue){
    this.setState({
      searchText: fieldValue
    })
  }


  handleOnClick(){
    this.props.processSearch(this.state.searchText)
    this.setState({
      searchText: ''
    })
  }
  

  render() {
    const { searchText } = this.state
    
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
            placeholder="Search Your Feed"
            value={ searchText }
            onChange={e => this.handleOnChange(e.target.value)}
            onKeyPress={e => e.charCode === 13 ? this.handleOnClick() : console.log(e.charCode)}
            />

          <SearchIcon 
            id="Search__icon"
            onClick={()=> this.handleOnClick()}
            />
        </div>
        
      </section>
    )
  }
}