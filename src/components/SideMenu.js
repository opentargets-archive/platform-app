import React from 'react';
import Card from '@material-ui/core/Card';

import SideMenuItem from './SideMenuItem';

class SideMenu extends React.PureComponent {
  render() {
    const { style, data } = this.props;
    return (
      <Card style={style}>
        {data.map(d => (
          <SideMenuItem key={d.id} {...d} />
        ))}
      </Card>
    );
  }
}

export default SideMenu;
