import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Link } from 'ot-ui';

import BasePage from '../../components/BasePage';

const releases = [
  {
    version: '19.06',
    date: '2019 Jun',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.06/output/19.06_association_data.json.gz',
      size: '270MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.06/output/19.06_evidence_data.json.gz',
      size: '2.72Gb',
    },
  },
  {
    version: '19.04',
    date: '2019 Apr',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.04/output/19.04_association_data.json.gz',
      size: '272MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.04/output/19.04_evidence_data.json.gz',
      size: '2.67Gb',
    },
  },
  {
    version: '19.02',
    date: '2019 Feb',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.02/output/19.02_association_data.json.gz',
      size: '257MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/19.02/output/19.02_evidence_data.json.gz',
      size: '2.67Gb',
    },
  },
  {
    version: '18.12',
    date: '2018 Dec',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.12/output/18.12_association_data.json.gz',
      size: '252MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.12/output/18.12_evidence_data.json.gz',
      size: '2.45Gb',
    },
  },
  {
    version: '18.10',
    date: '2018 Oct',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.10/18.10_association_data.json.gz',
      size: '234MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.10/18.10_evidence_data.json.gz',
      size: '2.67Gb',
    },
  },
  {
    version: '18.08',
    date: '2018 Aug',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.08/18.08_association_data.json.gz',
      size: '202MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.08/18.08_evidence_data.json.gz',
      size: '2.44Gb',
    },
  },
  {
    version: '18.06',
    date: '2018 Jun',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.06/18.06_association_data.json.gz',
      size: '189MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.06/18.06_evidence_data.json.gz',
      size: '2.3Gb',
    },
  },
  {
    version: '18.04',
    date: '2018 Apr',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.04/18.04_association_data.json.gz',
      size: '178MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.04/18.04_evidence_data.json.gz',
      size: '6.04Gb',
    },
  },
  {
    version: '18.02',
    date: '2018 Feb',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.02/18.02_association_data.json.gz',
      size: '172MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/18.02/18.02_evidence_data.json.gz',
      size: '5.49Gb',
    },
  },
  {
    version: '17.12',
    date: '2017 Dec',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.12/17.12_association_data.json.gz',
      size: '171MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.12/17.12_evidence_data.json.gz',
      size: '5.05Gb',
    },
  },
  {
    version: '17.09',
    date: '2017 Sep',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.09/17.09_association_data.json.gz',
      size: '198MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.09/17.09_evidence_data.json.gz',
      size: '5.19Gb',
    },
  },
  {
    version: '17.06',
    date: '2017 Jun',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.06/17.06_association_data.json.gz',
      size: '233MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.06/17.06_evidence_data.json.gz',
      size: '5.1Gb',
    },
  },
  {
    version: '17.04',
    date: '2017 Apr',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.04/17.04_association_data.json.gz',
      size: '207MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.04/17.04_evidence_data.json.gz',
      size: '4.4Gb',
    },
  },
  {
    version: '17.02',
    date: '2017 Feb',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.02/17.02_association_data.json.gz',
      size: '215MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/17.02/17.02_evidence_data.json.gz',
      size: '4.35Gb',
    },
  },
  {
    version: '16.12',
    date: '2016 Dec',
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.12/16.12_evidence_data.json.gz',
      size: '4.35Gb',
    },
  },
  {
    version: '16.09',
    date: '2016 Sep',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.04/16.08_association_data_fixed.json.gz',
      size: '179MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_evidence_data.json.gz',
      size: '1.7Gb',
    },
  },
  {
    version: '16.08',
    date: '2016 Aug',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_association_data.json.gz',
      size: '179MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_evidence_data.json.gz',
      size: '1.7Gb',
    },
  },
  {
    version: '16.04',
    date: '2016 Apr',
    associations: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.04/16.04_association_data.json.gz',
      size: '148MB',
    },
    evidence: {
      url:
        'https://storage.googleapis.com/open-targets-data-releases/16.04/16.04_evidence_data.json.gz',
      size: '1.3Gb',
    },
  },
];

const DownloadsPage = () => {
  return (
    <BasePage>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h1" paragraph>
            Data Download
          </Typography>
          <Typography paragraph>
            All data from targetvalidation.org is available for download as
            compressed JSON files.
          </Typography>
          <Typography paragraph>
            We provide downloads of all associations between targets and
            diseases calculated by the platform, as well as all the evidence
            used in calculating each association. These are the same objects
            returned by the corresponding <code>/public/associations</code> and{' '}
            <code>/public/evidence</code> API methods. See the{' '}
            <Link
              external
              to="https://docs.targetvalidation.org/tutorials/rest-api"
            >
              API documentation
            </Link>{' '}
            for further details.
          </Typography>
          <Typography paragraph>
            <strong>NOTE</strong>: The files below are useful only if you want
            to analyze the data. They are not a database dump and cannot be
            easily used to replicate the platform locally/somewhere else.
          </Typography>

          {releases.map(release => (
            <React.Fragment key={release.version}>
              <Typography variant="h6" component="h2">
                {release.date}
              </Typography>

              <ul>
                {release.associations ? (
                  <li>
                    <Typography>
                      <Link external to={release.associations.url}>
                        Associations objects
                      </Link>{' '}
                      ({release.associations.size})
                    </Typography>
                  </li>
                ) : null}
                {release.evidence ? (
                  <li>
                    <Typography>
                      <Link external to={release.evidence.url}>
                        Evidence objects
                      </Link>{' '}
                      ({release.evidence.size})
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </BasePage>
  );
};

export default DownloadsPage;
