import React from 'react';
import LiteMol from 'litemol';
import 'litemol/dist/css/LiteMol-plugin.css';

class LiteMolRenderer extends React.Component {
  componentDidMount() {
    const { pdbId } = this.props;
    const plugin = LiteMol.Plugin.create({
      target: '#litemol',
      viewportBackground: '#fff',
      layoutState: {
        hideControls: true,
        isExpanded: false,
      },
    });
    plugin.loadMolecule({
      id: pdbId,
      url: `https://www.ebi.ac.uk/pdbe/entry-files/download/pdb${pdbId}.ent`,
      format: 'pdb',
    });
  }
  render() {
    return (
      <div
        id="litemol"
        style={{
          width: '640px',
          height: '480px',

          position: 'relative',
        }}
      />
    );
  }
}

export default LiteMolRenderer;
