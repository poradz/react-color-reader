import React, { Component } from 'react';
import {CustomInput} from './RefComp';

class RefsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('first name:', this.firstName.value);
    this.firstName.value = 'Got ya!';
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CustomInput
            label={'Name'}
            firstName={input => this.firstName = input} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RefsForm;