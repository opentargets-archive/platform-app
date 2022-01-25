const sample = {
  rows: [
    // {
    //   disease: {
    //     id: '123',
    //     name: 'colorectal carcinoma',
    //   },
    //   project: 'CRISPR Cas9 Target ID OTAR015',
    //   contrast: 'loss of cell viability vs. control?',
    //   cellLine: 'ABC1',
    //   biomarkers: ['APC', 'CRIS', 'MSI', 'TP53', 'KRAS'],
    //   size: 65.12,
    //   hit: true,
    //   projectHit: true,
    //   observation: true,
    //   hypothesis: 'MSI',
    // },

    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 60.0,
      confidence: 'significant',
      expectedConfidence: 'significant',
      diseaseCellLines: [
        {
          name: 'CL-1',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSI',
          description: 'Microsatellite instability',
        },
        {
          name: 'B1-mut',
          description: 'Biomarker 1 mutation',
        },
        {
          name: 'B2-mut',
          description: 'Biomarker 2 mutation',
        },
        {
          name: 'B3-mut',
          description: 'Biomarker 3 mutation',
        },
        {
          name: 'B4-mut',
          description: 'Biomarker 4 mutation',
        },
        {
          name: 'CRIS-A',
          description: 'CRIS-A category',
        },
      ],
      validationHypotheses: [
        {
          hypothesis: 'MSI',
          description: 'Microsatellite stability.',
        },
      ],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 55.0,
      confidence: 'significant',
      expectedConfidence: 'significant',
      diseaseCellLines: [
        {
          name: 'CL-2',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSI',
          description: 'Microsatellite instability',
        },
        {
          name: 'B1-wt',
          description: 'Biomarker 1 wild-type',
        },
        {
          name: 'B2-wt',
          description: 'Biomarker 2 wild-type',
        },
        {
          name: 'B3-mut',
          description: 'Biomarker 3 mutation',
        },
        {
          name: 'B4-mut',
          description: 'Biomarker 4 mutation',
        },
        {
          name: 'CRIS-A',
          description: 'CRIS-A category',
        },
      ],
      validationHypotheses: [
        {
          hypothesis: 'MSI',
          description: 'Microsatellite stability.',
        },
      ],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 10.1,
      confidence: 'not significant',
      expectedConfidence: 'not significant',
      diseaseCellLines: [
        {
          name: 'CL-3',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSI',
          description: 'Microsatellite instability',
        },
        {
          name: 'B1-mut',
          description: 'Biomarker 1 mutation',
        },
        {
          name: 'B2-mut',
          description: 'Biomarker 2 mutation',
        },
        {
          name: 'B3-wt',
          description: 'Biomarker 3 wild-type',
        },
        {
          name: 'B4-mut',
          description: 'Biomarker 4 mutation',
        },
        {
          name: 'CRIS-A',
          description: 'CRIS-A category',
        },
      ],
      validationHypotheses: [],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 17.0,
      confidence: 'not significant',
      expectedConfidence: 'significant',
      diseaseCellLines: [
        {
          name: 'CL-4',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSS',
          description: 'Microsatellite stability',
        },
        {
          name: 'B1-mut',
          description: 'Biomarker 1 mutation',
        },
        {
          name: 'B2-mut',
          description: 'Biomarker 2 mutation',
        },
        {
          name: 'B3-mut',
          description: 'Biomarker 3 mutation',
        },
        {
          name: 'B4-wt',
          description: 'Biomarker 4 wild-type',
        },
      ],
      validationHypotheses: [],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 76.0,
      confidence: 'significant',
      expectedConfidence: 'significant',
      diseaseCellLines: [
        {
          name: 'CL-5',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSI',
          description: 'Microsatellite instability',
        },
        {
          name: 'B1-wt',
          description: 'Biomarker 1 wild-type',
        },
        {
          name: 'B2-mut',
          description: 'Biomarker 2 mutation',
        },
        {
          name: 'B3-wt',
          description: 'Biomarker 3 wild-type',
        },
        {
          name: 'B4-mut',
          description: 'Biomarker 4 mutation',
        },
        {
          name: 'CRIS-A',
          description: 'CRIS-B category',
        },
      ],
      validationHypotheses: [
        {
          hypothesis: 'MSI',
          description: 'Microsatellite stability.',
        },
      ],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 22.0,
      confidence: 'significant',
      expectedConfidence: 'not significant',
      diseaseCellLines: [
        {
          name: 'CL-6',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSS',
          description: 'Microsatellite stability',
        },
        {
          name: 'B1-wt',
          description: 'Biomarker 1 wild-type',
        },
        {
          name: 'B2-wt',
          description: 'Biomarker 2 wild-type',
        },
        {
          name: 'B3-wt',
          description: 'Biomarker 3 wild-type',
        },
        {
          name: 'B4-mut',
          description: 'Biomarker 4 mutation',
        },
      ],
      validationHypotheses: [],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 81.0,
      confidence: 'significant',
      expectedConfidence: 'significant',
      diseaseCellLines: [
        {
          name: 'CL-7',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSI',
          description: 'Microsatellite instability',
        },
        {
          name: 'B1-mut',
          description: 'Biomarker 1 mutation',
        },
        {
          name: 'B2-mut',
          description: 'Biomarker 2 mutation',
        },
        {
          name: 'B3-wt',
          description: 'Biomarker 3 wild-type',
        },
        {
          name: 'B4-wt',
          description: 'Biomarker 4 wild-type',
        },
        {
          name: 'CRIS-D',
          description: 'CRIS-D category',
        },
      ],
      validationHypotheses: [
        {
          hypothesis: 'MSI',
          description: 'Microsatellite stability.',
        },
      ],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
    {
      datasourceId: 'ot_crispr_validation',
      dataTypeId: 'ot_validation_lab',
      projectId: 'OTAR015',
      projectDescription: 'CRISPR Cas9 Target ID',
      targetFromSource: 'BRAF',
      targetId: 'ENSG00000157764',
      diseaseFromSourceMappedId: 'EFO_0000365',
      diseaseId: 'EFO_0000365',
      diseaseLabel: 'colorectal adenocarcinoma',
      resourceScore: 7.3,
      confidence: 'not significant',
      expectedConfidence: 'not significant',
      diseaseCellLines: [
        {
          name: 'CL-8',
          id: 'SIDM00000',
        },
      ],
      biomarkers: [
        {
          name: 'MSS',
          description: 'Microsatellite stability',
        },
        {
          name: 'B1-wt',
          description: 'Biomarker 1 wild-type',
        },
        {
          name: 'B2-wt',
          description: 'Biomarker 2 wild-type',
        },
        {
          name: 'B3-wt',
          description: 'Biomarker 3 wild-type',
        },
        {
          name: 'B4-wt',
          description: 'Biomarker 4 wild-type',
        },
        {
          name: 'CRIS-B',
          description: 'CRIS-B category',
        },
      ],
      validationHypotheses: [],
      statisticalTestTail: 'upper tail',
      contrast: 'Loss of cell viability vs control',
      studyOverview: 'CellTitreGio measurement',
    },
  ],
};

export default sample;
