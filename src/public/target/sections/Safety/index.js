// import React, { Component } from 'react';
// import classNames from 'classnames';
// import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
// import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
// import { PALETTE } from 'ot-ui';

// import Widget from '../Widget';
// import Detail from './Detail';

// const styles = () => ({
//   icon: {
//     color: PALETTE.purple,
//     fontSize: '54px',
//     width: '61px',
//   },
//   iconNoData: {
//     color: PALETTE.lightgrey,
//   },
//   text: {
//     marginTop: '15px',
//   },
// });

// class Safety extends Component {
//   state = { loading: true };

//   componentDidMount() {
//     fetch(
//       `https://platform-api-qc.opentargets.io/v3/platform/private/target/${
//         this.props.ensgId
//       }`
//     )
//       .then(res => res.json())
//       .then(data => {
//         this.setState({ loading: false, safety: data.safety });
//       });
//   }

//   render() {
//     const { symbol, classes } = this.props;
//     const { loading, safety } = this.state;
//     const hasData = safety === undefined ? false : true;

//     return loading ? null : (
//       <Widget
//         title="Target safety"
//         detailUrlStem="safety"
//         detail={<Detail symbol={symbol} safety={safety} />}
//         detailHeader={{
//           title: `${symbol} - Safety`,
//           description: `Known safety effects and safety risk information for ${symbol}`,
//         }}
//         hasData={hasData}
//       >
//         <Grid container direction="column">
//           <Grid item container justify="center">
//             <Icon
//               className={classNames(
//                 'fas fa-exclamation-triangle',
//                 classes.icon,
//                 { [classes.iconNoData]: !hasData }
//               )}
//             />
//           </Grid>
//           <Typography
//             align="center"
//             variant="body1"
//             color={hasData ? 'default' : 'secondary'}
//             className={classes.text}
//           >
//             Drug target safety assessment data {!safety && 'not'} available for{' '}
//             {symbol}
//           </Typography>
//         </Grid>
//       </Widget>
//     );
//   }
// }

// Safety.widgetName = 'target safety';

// export default withStyles(styles)(Safety);
