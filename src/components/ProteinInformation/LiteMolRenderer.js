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
    this.plugin = plugin;
  }
  componentDidUpdate(prevProps) {
    const { pdbId } = this.props;
    if (prevProps.pdbId !== pdbId) {
      this.plugin.clear();
      this.plugin.loadMolecule({
        id: pdbId,
        url: `https://www.ebi.ac.uk/pdbe/entry-files/download/pdb${pdbId}.ent`,
        format: 'pdb',
      });
    }
  }
  render() {
    return (
      <div
        id="litemol"
        style={{
          border: '1px solid #E0E0E0',
          width: '100%',
          height: '100%',
          minHeight: '480px',
          position: 'relative',
        }}
      />
    );
  }
}

export default LiteMolRenderer;
