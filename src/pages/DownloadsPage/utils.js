import React from 'react';

import {
  faArchive,
  faDna,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const mapFile = url => {
  let format = '';
  const fileNameParts = url.split('.');

  if (fileNameParts[fileNameParts.length - 1].toLowerCase() === 'gz') {
    fileNameParts.pop();
    format = 'GZipped';
  }

  return [format, fileNameParts.pop().toUpperCase()].join(' ');
};

export const mapIcon = name => (
  <FontAwesomeIcon
    icon={
      {
        'Target list': faDna,
        'Disease list': faStethoscope,
      }[name] || faArchive
    }
  />
);
