import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlotContainer from './PlotContainer';

import FileSaver from 'file-saver';

const downloadSVG = ({ svgNode, filenameStem }) => {
  if (!svgNode) {
    console.info('Nothing to download.');
    return;
  }

  const contentString = svgNode.outerHTML;
  const blob = new Blob([contentString], {
    type: 'application/svg+xml',
  });
  FileSaver.saveAs(blob, `${filenameStem}.svg`);
};

const handleSVGDownload = (svgContainer, filenameStem) => {
  const node = findDOMNode(svgContainer.current);
  const svgNode = node.nodeName === 'svg' ? node : node.querySelector('svg');
  downloadSVG({ svgNode, filenameStem });
};

const DownloadSVGPlot = ({
  loading,
  error,
  left,
  center,
  svgContainer,
  filenameStem,
  reportDownloadEvent,
  children,
}) => (
  <PlotContainer
    loading={loading}
    error={error}
    left={left}
    center={center}
    right={
      <Grid container justify="flex-end" spacing={1}>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              if (reportDownloadEvent) {
                reportDownloadEvent();
              }
              handleSVGDownload(svgContainer, filenameStem);
            }}
          >
            SVG
          </Button>
        </Grid>
      </Grid>
    }
  >
    {children}
  </PlotContainer>
);

export default DownloadSVGPlot;
