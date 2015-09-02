import React from 'react';
import Typeahead from 'react-typeahead-component';
import OptionTemplate from './templates/OptionTemplate.jsx';
import $ from 'jquery';
import Fluxxor from 'fluxxor';

var FluxMixin = Fluxxor.FluxMixin( React );
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var googleUrl =  '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState() {
    return {
      inputValue: ''
    };
  },

  handleOptionChange(event, option) {
    this.setInputValue(option);
  },

  handleOptionClick(event, option) {
    this.setInputValue(option);
  },

  setInputValue(value) {
    var inputValue = value[0];
    this.setState({
        inputValue: inputValue
    });
  },

  handleChange(event) {
    var enteredChars = event.target.value;

    this.setState({
      inputValue: enteredChars
    });

    $.ajax({
      url: googleUrl + enteredChars,
      dataType: 'jsonp',
      data: {
        q: enteredChars
      },
      success: function( results ){
        var searchResults = results[1];
        this.setState({
          options: searchResults
        });
      }.bind(this)
    });
  },

  handleClose(){
    var inputValue = this.state.inputValue;
    var flux = this.getFlux();
    if(inputValue){
      flux.actions.search(inputValue);
    }
  },

  render() {
    return (
      <div>
        <Typeahead
          inputValue={this.state.inputValue}
          options={this.state.options}
          inputId={this.props.id}
          autoFocus={true}
          placeholder={this.props.placeholder}
          onKeyUp={this.onKeyPress}
          optionTemplate={OptionTemplate}
          onChange={this.handleChange.bind(this)}
          onComplete={this.handleComplete} 
          onOptionChange={this.handleOptionChange} 
          onDropdownClose={this.handleClose}
          onOptionClick={this.handleOptionClick} />
      </div>
    );
  }
});










