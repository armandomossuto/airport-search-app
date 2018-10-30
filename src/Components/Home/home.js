import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Home extends Component {

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
    this.setState({searchParam: event.target.value});
  }

  onSubmit() {
   this.setState({redirect: true})
  }

  render() {
    const { redirect, searchParam } = this.state;
    if(redirect) {
      return <Redirect push to={"/search?query="+searchParam+"?page=1"} />;
    }
    return (
        <div className="front-page">
          <p> Do you want to find an airport? </p>
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

