import _ from 'lodash';
import { useState } from 'react';
import client from '../client';
import { downloaderChunkSize } from '../constants';

const getRows = (data, dataPath) => _.get(data, dataPath, []);

/**
 * Asynchronously batch-downloads a whole dataset from the backend.
 *
 * The function uses the parameter downloaderChunkSize from the configuration.js
 * file to determine the size of the chunks to fetch.
 *
 * @param {import('graphql').DocumentNode} query Query to run to fetch the data.
 * @param {import('apollo-client').QueryOptions} variables Variables object for the query.
 * @param {string} dataPath Path where the data array, row count and cursor are inside the query's result.
 * @param {string} [rowField=rows] field in dataPath containing the rows. Default: 'rows'.
 * @param {string} [countField=count] field in dataPath containing the row count. Default: 'count'.
 *
 * @returns {object} Object with {loading, error, data} fields.
 */
function useBatchDownloader(
  query,
  variables,
  dataPath,
  rowField = 'rows',
  countField = 'count'
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const rowPath = `${dataPath}.${rowField}`;
  const countPath = `${dataPath}.${countField}`;

  const getDataChunk = async (index, size) =>
    client.query({
      query,
      variables: { index, size, ...variables },
    });

  async function getWholeDataset() {
    const chunkPromises = [];
    let data = [];
    let index = 0;

    try {
      const firstChunk = await getDataChunk(index, downloaderChunkSize);
      data = [...getRows(firstChunk, rowPath)];
      index++;

      const count = Math.ceil(
        _.get(firstChunk, countPath) / downloaderChunkSize
      );

      while (index < count) {
        chunkPromises.push(getDataChunk(index, downloaderChunkSize));
        index++;
      }

      const remainingChunks = await Promise.all(chunkPromises);

      remainingChunks.forEach(chunk => {
        data = [...data, ...getRows(chunk, rowPath)];
      });

      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    getWholeDataset();
  }

  return { loading, error, data };
}

export default useBatchDownloader;
