import _ from 'lodash';

import client from '../public/client';
import { chunkSize } from '../public/configuration';

const getRows = (data, dataPath) => _.get(data, `data.${dataPath}`, []);

/**
 * Provides a function to asynchronously batch-download a whole dataset from
 * the backend.
 *
 * The function uses the parameter chunkSize from the configuration.js
 * file to determine the size of the chunks to fetch.
 *
 * @param {import('graphql').DocumentNode} query Query to run to fetch the data.
 * @param {import('apollo-client').QueryOptions} variables Variables object for the query.
 * @param {string} dataPath Path where the data array is inside the query's result.
 * @param {string} countPath Path where the row count variable is inside the query's result.
 *
 * @returns {Function} Function that will fetch the whole dataset.
 */
function useBatchDownloader(query, variables, dataPath, countPath) {
  const getDataChunk = async (index, size) =>
    client.query({
      query,
      variables: { index, size, ...variables },
    });

  return async function getWholeDataset() {
    let index = 0;
    let data = [];
    const chunkPromises = [];

    const firstChunk = await getDataChunk(index, chunkSize);
    data = [...getRows(firstChunk, dataPath)];
    index++;

    const count = Math.ceil(_.get(firstChunk, `data.${countPath}`) / chunkSize);

    while (index < count) {
      chunkPromises.push(getDataChunk(index, chunkSize));
      index++;
    }

    const remainingChunks = await Promise.all(chunkPromises);

    remainingChunks.forEach(chunk => {
      data = [...data, ...getRows(chunk, dataPath)];
    });

    return data;
  };
}

export default useBatchDownloader;
