const releases = [
  // 20.09 RELEASE
  {
    version: '20.09',
    date: '2020 September',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_association_data.json.gz',
            size: '677MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_evidence_data.json.gz',
            size: '3.2GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_target_list.csv.gz',
            size: '910KB',
          },
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_disease_list.csv.gz',
            size: '292KB',
          },
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/output/20.09_disease_list.json.gz',
            size: '338KB',
          },
        ],
      },
      {
        name: 'Known target safety',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/input/annotation-files/known_target_safety-2020-09-02.json',
            size: '345KB',
          },
        ],
      },
      {
        name: 'Non-clinical experimental toxicity',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/input/annotation-files/experimental-toxicity-2020-04-07.tsv',
            size: '149KB',
          },
        ],
      },
      {
        name: 'Target tractability',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/input/annotation-files/tractability_buckets-2020-08-14.tsv',
            size: '28.1MB',
          },
        ],
      },
      {
        name: 'Baseline expression',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.09/input/annotation-files/baseline_expression_counts-2020-05-07.tsv',
            size: '15.2MB',
          },
        ],
      },
    ],
  },

  // 20.06 RELEASE
  {
    version: '20.06',
    date: '2020 June',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_association_data.json.gz',
            size: '767MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_evidence_data.json.gz',
            size: '4.1GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_target_list.csv.gz',
            size: '916KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_disease_list.csv.gz',
            size: '285KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/output/20.06_disease_list.json.gz',
            size: '331KB',
          },
        ],
      },
      {
        name: 'Known target safety',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/input/annotation-files/known_target_safety-2020-06-01.json',
            size: '349KB',
          },
        ],
      },
      {
        name: 'Non-clinical experimental toxicity',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/input/annotation-files/experimental-toxicity-2020-04-07.tsv',
            size: '149KB',
          },
        ],
      },
      {
        name: 'Target tractability',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/input/annotation-files/tractability_buckets-2020-05-14.tsv',
            size: '18MB',
          },
        ],
      },
      {
        name: 'Baseline expression',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.06/input/annotation-files/baseline_expression_counts-2020-05-07.tsv',
            size: '15MB',
          },
        ],
      },
    ],
  },

  // 20.04 RELEASE
  {
    version: '20.04',
    date: '2020 April',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_association_data.json.gz',
            size: '878MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_evidence_data.json.gz',
            size: '4.4GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_target_list.csv.gz',
            size: '918KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_disease_list.csv.gz',
            size: '285KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/output/20.04_disease_list.json.gz',
            size: '332KB',
          },
        ],
      },
      {
        name: 'Known target safety',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/input/annotation-files/known_target_safety-2020-04-01.json',
            size: '345KB',
          },
        ],
      },
      {
        name: 'Target tractability',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.04/input/annotation-files/tractability_buckets-2020-03-26.tsv',
            size: '17.3MB',
          },
        ],
      },
      {
        name: 'Baseline expression',
        files: [
          {
            url:
              'https://github.com/opentargets/expression_analysis/raw/master/exp_summary_NormCounts_genes.txt',
            size: '12.3MB',
          },
        ],
      },
    ],
  },

  // 20.02 RELEASE
  {
    version: '20.02',
    date: '2020 February',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_association_data.json.gz',
            size: '765MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_evidence_data.json.gz',
            size: '4.23GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_target_list.csv.gz',
            size: '911KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_disease_list.csv.gz',
            size: '276KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/20.02/output/20.02_disease_list.json.gz',
            size: '321KB',
          },
        ],
      },
    ],
  },

  // 19.11 RELEASE
  {
    version: '19.11',
    date: '2019 November',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_association_data.json.gz',
            size: '661MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_evidence_data.json.gz',
            size: '3.75GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_target_list.csv.gz',
            size: '905KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_disease_list.csv.gz',
            size: '271KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.11/output/19.11_disease_list.json.gz',
            size: '314KB',
          },
        ],
      },
    ],
  },

  // 19.09 RELEASE
  {
    version: '19.09',
    date: '2019 November',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_association_data.json.gz',
            size: '271MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_evidence_data.json.gz',
            size: '2.76GB',
          },
        ],
      },
      {
        name: 'Target list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_target_list.csv.gz',
            size: '898KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_target_list.json.gz',
            size: '1MB',
          },
        ],
      },
      {
        name: 'Disease list',
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_disease_list.csv.gz',
            size: '212KB',
          },
          {
            name: 'GZipped JSON',
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.09/output/19.09_disease_list.json.gz',
            size: '252KB',
          },
        ],
      },
    ],
  },

  // 19.06 RELEASE
  {
    version: '19.06',
    date: '2019 June',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.06/output/19.06_association_data.json.gz',
            size: '270MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.06/output/19.06_evidence_data.json.gz',
            size: '2.7GB',
          },
        ],
      },
    ],
  },

  // 19.04 RELEASE
  {
    version: '19.04',
    date: '2019 April',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.04/output/19.04_association_data.json.gz',
            size: '272MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.04/output/19.04_evidence_data.json.gz',
            size: '2.7GB',
          },
        ],
      },
    ],
  },

  // 19.02 RELEASE
  {
    version: '19.02',
    date: '2019 February',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.02/output/19.02_association_data.json.gz',
            size: '257MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/19.02/output/19.02_evidence_data.json.gz',
            size: '2.7GB',
          },
        ],
      },
    ],
  },

  // 18.12 RELEASE
  {
    version: '18.12',
    date: '2018 December',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.12/output/18.12_association_data.json.gz',
            size: '252MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.12/output/18.12_evidence_data.json.gz',
            size: '2.5GB',
          },
        ],
      },
    ],
  },

  // 18.10 RELEASE
  {
    version: '18.10',
    date: '2018 October',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.10/18.10_association_data.json.gz',
            size: '234MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.10/18.10_evidence_data.json.gz',
            size: '2.7GB',
          },
        ],
      },
    ],
  },

  // 18.08 RELEASE
  {
    version: '18.08',
    date: '2018 August',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.08/18.08_association_data.json.gz',
            size: '202MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.08/18.08_evidence_data.json.gz',
            size: '2.4GB',
          },
        ],
      },
    ],
  },

  // 18.06 RELEASE
  {
    version: '18.06',
    date: '2018 June',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.06/18.06_association_data.json.gz',
            size: '189MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.06/18.06_evidence_data.json.gz',
            size: '2.3GB',
          },
        ],
      },
    ],
  },

  // 18.04 RELEASE
  {
    version: '18.04',
    date: '2018 April',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.04/18.04_association_data.json.gz',
            size: '178MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.04/18.04_evidence_data.json.gz',
            size: '6GB',
          },
        ],
      },
    ],
  },

  // 18.02 RELEASE
  {
    version: '18.02',
    date: '2018 February',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.02/18.02_association_data.json.gz',
            size: '172MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/18.02/18.02_evidence_data.json.gz',
            size: '5.5GB',
          },
        ],
      },
    ],
  },

  // 17.12 RELEASE
  {
    version: '17.12',
    date: '2017 December',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.12/17.12_association_data.json.gz',
            size: '171MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.12/17.12_evidence_data.json.gz',
            size: '5.1GB',
          },
        ],
      },
    ],
  },

  // 17.09 RELEASE
  {
    version: '17.09',
    date: '2017 September',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.09/17.09_association_data.json.gz',
            size: '198MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.09/17.09_evidence_data.json.gz',
            size: '5.2GB',
          },
        ],
      },
    ],
  },

  // 17.06 RELEASE
  {
    version: '17.06',
    date: '2017 June',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.06/17.06_association_data.json.gz',
            size: '233MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.06/17.06_evidence_data.json.gz',
            size: '5.1GB',
          },
        ],
      },
    ],
  },

  // 17.04 RELEASE
  {
    version: '17.04',
    date: '2017 April',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.04/17.04_association_data.json.gz',
            size: '207MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.04/17.04_evidence_data.json.gz',
            size: '4.4GB',
          },
        ],
      },
    ],
  },

  // 17.02 RELEASE
  {
    version: '17.02',
    date: '2017 February',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.02/17.02_association_data.json.gz',
            size: '215MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/17.02/17.02_evidence_data.json.gz',
            size: '4.4GB',
          },
        ],
      },
    ],
  },

  // 16.12 RELEASE
  {
    version: '16.12',
    date: '2016 December',
    artifacts: [
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.12/16.12_evidence_data.json.gz',
            size: '4.4GB',
          },
        ],
      },
    ],
  },

  // 16.09 RELEASE
  {
    version: '16.09',
    date: '2016 September',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.04/16.08_association_data_fixed.json.gz',
            size: '179MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_evidence_data.json.gz',
            size: '1.7GB',
          },
        ],
      },
    ],
  },

  // 16.08 RELEASE
  {
    version: '16.08',
    date: '2016 August',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_association_data.json.gz',
            size: '179MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.08/16.08_evidence_data.json.gz',
            size: '1.7GB',
          },
        ],
      },
    ],
  },

  // 16.04 RELEASE
  {
    version: '16.04',
    date: '2016 April',
    artifacts: [
      {
        name: 'Associations',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.04/16.04_association_data.json.gz',
            size: '148MB',
          },
        ],
      },
      {
        name: 'Evidences',
        important: true,
        files: [
          {
            url:
              'https://storage.googleapis.com/open-targets-data-releases/16.04/16.04_evidence_data.json.gz',
            size: '1.3GB',
          },
        ],
      },
    ],
  },
];

export default releases;
