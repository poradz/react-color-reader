import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
      return (
      <input type="text" 
      ref={ props.MyColor }
      name="color"
      className="form-control" 
      placeholder="Type color in rgb, hex or hsl!" 
      pattern="^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|rgb[(]([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5]),\s([0-9]{1,2}|[0-1][0-9]{1,2}|[0-2][0-4][0-9]|[2][0-5][0-5])[)]|hsl[(]([0-9]{1,2}|[0-2][0-9]{1,2}|[3][0-5][0-9]|[3][6][0]),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%),\s([0-9]{1,2}%|[0-9]{1,2}%|[1][0][0]%)[)]"
      title='"rgb(<number from 0 to 255>, <number from 0 to 255>, <number from 0 to 255>)" or "#" + 3 or 6 * "<letter from a-f or number>" or "hsl(< Hue in number from 0 to 360>, <saturation in percents>, <lightness in percents>)"'
      />
    );
}

Input.propTypes = {
  MyColor: PropTypes.func
}





            

