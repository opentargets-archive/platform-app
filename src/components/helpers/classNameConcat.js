/**
 * Given a number of classes, this will filter out any undefined values
 * and return a string that can be passed into the className property
 * of a react component. Used as a helper to concat classes in jss.
 * @param {...string} args
 * @return {string[]}
 */
const cn = (...args) => args.filter((klass) => klass).join(' ');

export default cn;