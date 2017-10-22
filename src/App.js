import React from 'react';
import './App.css';
//import {Form} from './Components/Form';
//import {Input} from './Components/Input';
import {InputInstant} from './Components/InputInstant';
import {Container} from './Components/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.isLight = this.isLight.bind(this);
    this.setLightness = this.setLightness.bind(this);
    this.setColor = this.setColor.bind(this);
  }
  
  componentDidMount() {
    this.setColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setColor();
  }
  /////////return lightness of hsl//////////
  isLight(star) {
    let light = this.formatColor(this.showHsl());
    light = light.split('%').join('');
    light = light.split(',').map(Number);
    return light[2];
  }
  ////////set lightness of dom elements
  setLightness(hue, satur, element){
    let lightness;
      if (this.isLight() < 10) {
        lightness = 10; 
      }
      else if (element === "lawn" && this.isLight() > 70) {
        lightness = 70; 
      }
      else if (element === "cloud" && this.isLight() > 90) {
        lightness = 90; 
      }
      else {lightness = this.isLight();}
      return "hsl("+hue+", "+satur+"%, "+lightness+"%)";
  }

  setColor() {
    const color = this.state.color;
    document.querySelector('.container').style.background = color;
    document.querySelector('.lawn-radius__child').style.background = color;
    document.querySelector('.lawn').style.background = this.setLightness(90, 100, "lawn");
    document.querySelector('.lawn-radius').style.background = this.setLightness(90, 100, "lawn");
    const cloud = document.getElementsByClassName("cloud");
    for (let i = cloud.length - 1; i >= 0; i--) {
      cloud[i].style.background = this.setLightness(205, 85, "cloud");
    }
    const stars = document.getElementsByClassName("star");
    if (this.isLight() > 30) {
      for (let i = stars.length - 1; i >= 0; i--)
        stars[i].style.display = "none";
    } else {
      for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].style.background = this.setLightness(60, 100);
        stars[i].style.display = "inline";
      }
    }
  }

///////////////////COLOR NAME CONVERSION LOGIC

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

  formatColor(ary) {
      return ary.substring(4, ary.length - 1);
  }

  handleRgbAndHslFormat(func, color) {
    let formated = this.formatColor(color);
    formated = formated.split('%').join('');
    formated = formated.split(',').map(Number);
    return func(formated[0], formated[1], formated[2]);
  }

////////////checking type of color using regex//////

  isRgb(col) {
    //return this.state.color.substring(0, 3) ==='rgb';
    let re = /rgb[(]([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5])[)]/;
    let ok = re.exec(col);
    return ok;
  }

  isHsl(col) {
    //return this.state.color.substring(0, 3) === 'hsl';
    let re = /hsl[(]([0-9]{1,2}|[0-2][0-9]{1,2}|[3][0-5][0-9]|[3][6][0]),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%)[)]/;
    let ok = re.exec(col);
    return ok;
  }

  isHex(col) {
    //return this.state.color.substring(0, 1) === '#';
    let re = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    let ok = re.exec(col);
    return ok;
  }

  showRgb(){
    let col = this.state.color;
    if (this.isRgb(col)) {
      // this.setState({ 
      //   rgb: col
      // });
      return col;
    } 
    else if (this.isHsl(col)) {
      return this.handleRgbAndHslFormat(this.hslToRgb, col);
    }
    else {
      return this.hexToRgb(col);
    }
  }

  showHex(){
    let col = this.state.color;    
    if (this.isRgb(col)) {
      return this.handleRgbAndHslFormat(this.rgbToHex, col);
    } 
    else if (this.isHsl(col)) {
      return this.handleRgbAndHslFormat(this.rgbToHex, this.handleRgbAndHslFormat(this.hslToRgb, col));
    }
    else {
      return col;
    }
  }
  
  showHsl(){
    let col = this.state.color;
    if (this.isRgb(col)) {
      return this.handleRgbAndHslFormat(this.rgbToHsl, col);
    } 
    else if (this.isHex(col)) {
      return this.handleRgbAndHslFormat(this.rgbToHsl, this.hexToRgb(col));
    }
    else {
      return col;
    }
  }

//Input submit version///////////
  // handleSubmit(e){
  //   e.preventDefault();
  //   if(this.MyColor.value === '') {
  //     alert('Write your color in correct format.')
  //   } 
  //   else {
  //     this.setState({ backgroundColor: this.MyColor.value });
  //   }
  // }
  // <Form onSubmit={ this.handleSubmit } >
  //     <Input MyColor={input => this.MyColor = input} />
  // </Form> 

  handleOnChange(e){
    let col = this.MyColorInst.value;
    if (this.isRgb(col) || this.isHex(col) || this.isHsl(col)) {
      this.setState({ 
        color: col
      });
    }
  }

  render() {
    return (
      <Container showRgb={this.showRgb()} showHex={this.showHex()} showHsl={this.showHsl()}>
          <InputInstant MyColorInst={input => this.MyColorInst = input} onChange={ this.handleOnChange.bind(this) }/>
      </Container>
    );
  }
}

export default App;

