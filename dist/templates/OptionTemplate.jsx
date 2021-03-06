'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'OptionTemplate',

  render: function render() {
    var searchResult = this.props.data[0];
    return _react2['default'].createElement(
      'div',
      null,
      searchResult
    );
  }
});
module.exports = exports['default'];