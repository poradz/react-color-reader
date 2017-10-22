import React from 'react';
import PropTypes from 'prop-types';

export const Form = (props) => {
  return (
  <form onSubmit={ props.onSubmit } id="colorForm" className="form-horizontal">
    <div className="form-group">
      <label className="col-xs-3 control-label color">Color</label>
      <div className="col-xs-6">
       {props.children}
        <div className="col-xs-3 form-group">
          <button className="btn" type="submit" value="submit"><span className="color">SUBMIT</span></button>
        </div>            
      </div>
    </div>
  </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}



