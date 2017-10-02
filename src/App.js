import React from 'react';
import './App.css';
import Form from './Components/Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
  }
  
  componentDidMount() {
    this.setColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setColor();
  }

  formatColor(ary) {
      return ary.substring(4, ary.length - 1);
  }

  isRgb() {
    return this.state.color.substring(0, 3) ==='rgb';
  }

  isHsl() {
    return this.state.color.substring(0, 3) === 'hsl';
  }

  isHex() {
    return this.state.color.substring(0, 1) === '#';
  }

  setColor() {
    const color = this.state.color;
    document.querySelector('.color-container')
    .style.background = color;
    document.querySelector('.color')
    .style.color = color;
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    if (r !== ''){
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
  }
  
  rgbToHsl(r, g, b){
    r /= 255; 
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: alert('error');
        }
        h /= 6;
    }
    return "hsl(" + Math.floor(h * 360) + ", " + Math.floor(s * 100) + "%, " + Math.floor(l * 100) + "%)";
  }

  handleRgbAndHslFormat(func, color) {
    let formated = this.formatColor(color)
    formated = formated.split('%').join('');
    formated = formated.split(',').map(Number);
    return func(formated[0], formated[1], formated[2]);
  }

  hexToRgb(hex) {
    if (hex.length === 4){
      let temp = hex;
      hex = `#${temp.charAt(1)}${temp.charAt(1)}${temp.charAt(2)}${temp.charAt(2)}${temp.charAt(3)}${temp.charAt(3)}`;
    }
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : null;
  }

  hslToRgb(h, s, l) {
  let r, g, b;
    h = h / 360;
    //h = h.toFixed(2);
    s = s / 100;
    //s = s.toFixed(2);
    l = l / 100;
    //l = l.toFixed(2);
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  r = parseInt(Math.max(Math.min(r * 256, 255), 0), 10);
  g = parseInt(Math.max(Math.min(g * 256, 255), 0), 10);
  b = parseInt(Math.max(Math.min(b * 256, 255), 0), 10);

  return  "rgb(" + r + ", " + g + ", " + b + ")";
}
  showRgb(){
    if (this.isRgb()) {
      return this.state.color;
    } 
    else if (this.isHsl()) {
      return this.handleRgbAndHslFormat(this.hslToRgb, this.state.color);
    }
    else {
      return this.hexToRgb(this.state.color);
    }
  }

  showHex(){
    if (this.isRgb()) {
      return this.handleRgbAndHslFormat(this.rgbToHex, this.state.color);
    } 
    else if (this.isHsl()) {
      return this.handleRgbAndHslFormat(this.rgbToHex, this.handleRgbAndHslFormat(this.hslToRgb, this.state.color));
    }
    else {
      return this.state.color;
    }
  }
  
  showHsl(){
    if (this.isRgb()) {
      return this.handleRgbAndHslFormat(this.rgbToHsl, this.state.color);
    } 
    else if (this.isHex()) {
      return this.handleRgbAndHslFormat(this.rgbToHsl, this.hexToRgb(this.state.color));
    }
    else {
      return this.state.color;
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.refs.color.value === '') {
      alert('Write your color in correct format.')
    } 
    else {
      this.setState({ color: this.refs.color.value });
    }
  }

  render() {
    return (
      <div className='container'>
        <h2>COLOR READER</h2>
            <Form onSubmit={ this.handleSubmit }> 
              <input type="text" 
              ref="color" 
              className="form-control" 
              name="color"
              placeholder="Type color in rgb, hex or hsl!" 
              pattern="^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|rgb[(]([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5])[)]|hsl[(]([0-9]{1,2}|[0-2][0-9]{1,2}|[3][0-5][0-9]|[3][6][0]),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%)[)]"
              title='"rgb(<number from 0 to 255>, <number from 0 to 255>, <number from 0 to 255>)" or "#" + 3 or 6 * "<letter from a-f or number>" or "hsl(< Hue in number from 0 to 360>, <saturation in percents>, <lightness in percents>)"'
              />
            </Form>
        <div className="color-container col-xs-6"></div>
        <div className="col-xs-6">
          <h3>
          { this.showRgb() }
            <br />
          { this.showHex() }
            <br />
          { this.showHsl() }
          </h3>
        </div>
      </div>
    );
  }
}

export default App;