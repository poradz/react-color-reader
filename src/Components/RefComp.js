import React, { Component } from 'react';

export class CustomInput extends React.Component {
  render() {
  	return (
    <div>
      <label>{this.props.label}:</label>
      <input type="text" ref={this.props.firstName}/>
    </div>
  );
	}
}