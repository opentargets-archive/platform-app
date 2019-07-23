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
      <div>
        <ExpressionAtlasHeatmap
          query={{ species: 'homo sapiens', gene: ensgId }}
        />
      </div>
    ) : null;
  }
}

export default ExpressionAtlasRenderer;
