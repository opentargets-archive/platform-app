import React from 'react';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import TargetSummaryContext from '../contexts/TargetSummaryContext';

const styles = theme => ({
  noDataMessage: {
    color: theme.palette.grey[400],
  },
});

class DetailPanelLoader extends React.Component {
  render() {
    const { classes, sectionId, hasData, query, SectionComponent } = this.props;
    const targetContext = this.context;
    const { ensgId } = targetContext;

    // display a sensible message
    if (!hasData) {
      return (
        <Typography align="center" className={classes.noDataMessage}>
          No data available for this target.
        </Typography>
      );
    }

    // Some sections have multiple queries on different tabs, for example,
    // so manage this themselves.
    if (query) {
      return (
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const sectionData = data.target.details[sectionId];
            return (
              <SectionComponent {...{ ...targetContext, data: sectionData }} />
            );
          }}
        </Query>
      );
    } else {
      return <SectionComponent {...targetContext} />;
    }
  }
}
DetailPanelLoader.contextType = TargetSummaryContext;

export default withStyles(styles)(DetailPanelLoader);
