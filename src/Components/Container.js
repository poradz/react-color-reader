import React from 'react';
import PropTypes from 'prop-types';

export class Container extends React.Component {
    
  randomSky() {
  var arr = Array.from(new Array(600), (x,i) => i);
  var multidivs = arr.map((number) => (
    <div style={{ left: Math.random()*99+"%", bottom: Math.random()*80+20+"%" }}id={"id"+number.toString()} key={number.toString()} className="star" />
  ));
  var lessArr = Array.from(new Array(50), (x,i) => i);
  var lessdivs = lessArr.map((number) => (
    <div style={{ left: Math.random()*99+"%", top: Math.random()*20+80+"%" }}id={"id"+number.toString()} key={number.toString()} className="star" />
  ));
  multidivs.push(lessdivs);
  return multidivs;
  }

  render() {
    return (
  	<div className='wrap'>
      <div className='container'>
          <div className='stars-container'>
            {this.randomSky()}
            <div className="cloud cloud__one"> { this.props.showRgb } </div>
            <div className="cloud cloud__two"> { this.props.showHex } </div>
            <div className="cloud cloud__three"> { this.props.showHsl } </div>
            {this.props.children}
          </div>
      </div>
      <div className="lawn-radius">
        <div className="lawn-radius__child" />
      </div>
      <div className="lawn">
      </div>
    </div>
    );
  }
}

Container.propTypes = {
  onSubmit: PropTypes.func,
  showRgb: PropTypes.string,
  showHex: PropTypes.string,
  showHsl: PropTypes.string
}



