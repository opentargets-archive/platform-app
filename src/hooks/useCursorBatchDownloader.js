import _ from 'lodash';

import client from '../client';
import { downloaderChunkSize } from '../constants';

const getRows = (chunk, dataPath) => _.get(chunk, dataPath, []);

/**
 * Provides a function to asynchronously batch-download a whole dataset from
 * the backend.
 *
 * The function uses the parameter chunkSize from the configuration.js
 * file to determine the size of the chunks to fetch.
 *
 * @param {import('graphql').DocumentNode} query Query to run to fetch the data.
 * @param {import('apollo-client').QueryOptions} variables Variables object for the query.
 * @param {string} dataPath Path where the data array, row count and cursor are inside the query's result.
 * @param {string} [rowField=rows] field in dataPath containing the rows. Default: 'rows'.
 * @param {string} [countField=count] field in dataPath containing the row count. Default: 'count'.
 *
 * @returns {Function} Function that will fetch the whole dataset.
 */
function useCursorBatchDownloader(
  query,
  variables,
  dataPath,
  rowField = 'rows',
  countField = 'count'
) {
  const rowPath = `${dataPath}.${rowField}`;
  const cursorPath = `${dataPath}.cursor`;
  const countPath = `${dataPath}.${countField}`;

  const getDataChunk = async (cursor, size) =>
    client.query({
      query,
      variables: { cursor, size, ...variables },
    });

  return async function getWholeDataset() {
    const firstChunk = await getDataChunk(null, downloaderChunkSize);

    const data = [...getRows(firstChunk, rowPath)];
    const count = _.get(firstChunk, countPath, 0);
    const chunksToFetch = Math.ceil(count / downloaderChunkSize);
    let cursor = _.get(firstChunk, cursorPath, null);
    let chunksFetched = 1;

    while (chunksFetched < chunksToFetch) {
      const newChunk = await getDataChunk(cursor, downloaderChunkSize);

      cursor = _.get(newChunk, cursorPath, null);
      data.push(...getRows(newChunk, rowPath));
      chunksFetched++;
    }

    return data;
  };
}

export default useCursorBatchDownloader;
