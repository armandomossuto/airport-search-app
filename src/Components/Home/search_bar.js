import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false,
      searchParam: '',
    };

    this.checkKey = this.checkKey.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  checkKey(event) {
    // This event handler just checks if key pressed was Enter to excute onSubmit 
    if(event.key==="Enter") {
      this.onSubmit();
    }
  }

  onChange(event) {
    // Handles change of value of the input. This is the only way to handle it with React.
    this.setState({searchParam: event.target.value});
  }

  onSubmit() {
    // Handles when user submits the search. Changes redirect to TRUE, so next time render is excuted it will redirect to Search component
   this.setState({redirect: true})
  }

  render() {
    const { redirect, searchParam } = this.state;
    // Checks if user submitted the search query. If true redirects to Search component
    if(redirect) {
      return <Redirect push to={"/search?query="+searchParam+"?page=1"} />;
    }
  // If not, renders this component normally
    return (
        <div>
          < input 
            type="text" 
            placeholder="Name, City, IATA code, ..." 
            value={searchParam} 
            onChange={this.onChange} 
            onKeyDown={this.checkKey} 
          />
          < button
            type="submit" 
            onClick={this.onSubmit} 
          > 
            <img src="search_icon.png" alt="" /> 
          </button>
        </div>
      );
  }
}

