import React from 'react';

class ExpressionAtlasRenderer extends React.Component {
  state = {};
  componentDidMount() {
    import('expression-atlas-heatmap-highcharts').then(
      ({ default: ExpressionAtlasHeatmap }) => {
        this.setState({
          ExpressionAtlasHeatmap,
        });
      }
    );
  }
  render() {
    const { ensgId } = this.props;
    const { ExpressionAtlasHeatmap } = this.state;
    return ExpressionAtlasHeatmap ? (
      <ExpressionAtlasHeatmap
        query={{ species: 'homo sapiens', gene: ensgId }}
      />
    ) : null;
  }
}

export default ExpressionAtlasRenderer;
