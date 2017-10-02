import React from 'react';

class Form extends React.Component {

  render() {
    return (
      <form onSubmit={ this.props.onSubmit } id="colorForm" className="form-horizontal">
        <div className="form-group">
          <label className="col-xs-3 control-label color">Color</label>
          <div className="col-xs-6">
            { this.props.children }
            <div className="col-xs-3 form-group">
              <button className="btn primary" type="submit" value="submit"><span className="color">SUBMIT</span></button>
            </div>            
          </div>
        </div>
      </form>
    );
  }
}

export default Form;