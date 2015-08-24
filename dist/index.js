'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTypeaheadComponent = require('react-typeahead-component');

var _reactTypeaheadComponent2 = _interopRequireDefault(_reactTypeaheadComponent);

var _templatesOptionTemplateJsx = require('./templates/OptionTemplate.jsx');

var _templatesOptionTemplateJsx2 = _interopRequireDefault(_templatesOptionTemplateJsx);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fluxxor = require('fluxxor');

var _fluxxor2 = _interopRequireDefault(_fluxxor);

var FluxMixin = _fluxxor2['default'].FluxMixin(_react2['default']);
var StoreWatchMixin = _fluxxor2['default'].StoreWatchMixin;

var googleUrl = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  mixins: [FluxMixin],

  getInitialState: function getInitialState() {
    return {
      inputValue: ''
    };
  },

  handleOptionChange: function handleOptionChange(event, option) {
    this.setInputValue(option);
  },

  handleOptionClick: function handleOptionClick(event, option) {
    this.setInputValue(option);
  },

  setInputValue: function setInputValue(value) {
    var inputValue = value[0];
    this.setState({
      inputValue: inputValue
    });
  },

  handleChange: function handleChange(event) {
    var enteredChars = event.target.value;

    this.setState({
      inputValue: enteredChars
    });

    _jquery2['default'].ajax({
      url: googleUrl + enteredChars,
      dataType: 'jsonp',
      data: {
        q: enteredChars
      },
      success: (function (results) {
        var searchResults = results[1];
        this.setState({
          options: searchResults
        });
      }).bind(this)
    });
  },

  handleClose: function handleClose() {
    var inputValue = this.state.inputValue;
    var flux = this.getFlux();
    if (inputValue) {
      flux.actions.searchTerm(inputValue);
    }
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_reactTypeaheadComponent2['default'], {
        inputValue: this.state.inputValue,
        options: this.state.options,
        inputId: this.props.id,
        autoFocus: true,
        placeholder: this.props.placeholder,
        onKeyUp: this.onKeyPress,
        optionTemplate: _templatesOptionTemplateJsx2['default'],
        onChange: this.handleChange.bind(this),
        onComplete: this.handleComplete,
        onOptionChange: this.handleOptionChange,
        onDropdownClose: this.handleClose,
        onOptionClick: this.handleOptionClick })
    );
  }
});
module.exports = exports['default'];