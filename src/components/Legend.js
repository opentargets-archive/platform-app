import React from 'react';
import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const colorRange = [
  '#e8edf1',
  '#d2dce4',
  '#bbcbd6',
  '#a5b9c9',
  '#8fa8bc',
  '#7897ae',
  '#6285a1',
  '#4b7493',
  '#356386',
  '#1f5279',
];

function Legend() {
  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          border: '1px solid #eeefef',
          height: '20px',
          width: '20px',
        }}
      />{' '}
      <span style={{ position: 'relative', bottom: '5px' }}>No data</span>
      <div style={{ display: 'flex' }}>
        <div style={{ height: '20px', width: '20px', textAlign: 'center' }}>
          0
        </div>
        {colorRange.map(color => {
          return (
            <div
              key={color}
              style={{
                backgroundColor: color,
                height: '20px',
                width: '20px',
              }}
            />
          );
        })}
        <div style={{ height: '20px', width: '20px', textAlign: 'center' }}>
          1
        </div>
      </div>
      <Link href="https://docs.targetvalidation.org/getting-started/scoring">
        <FontAwesomeIcon icon={faQuestionCircle} size="xs" /> Score
      </Link>
    </div>
  );
}

export default Legend;
