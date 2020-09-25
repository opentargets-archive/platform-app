import { gql } from '@apollo/client';
import { fixLabel } from './utils';

const DISEASE_FACET_QUERY = gql`
  query DiseaseAssociationFacets($efoId: String!) {
    target(efoId: $efoId) {
      name
      associatedTargets {
        aggregations {
          uniques
          aggs {
            name
            uniques
            rows {
              key
              uniques
              aggs {
                key
                uniques
              }
            }
          }
        }
        count
      }
    }
  }
`;

const TARGET_FACET_QUERY = gql`
  query TargetAssociationFacets($ensemblId: String!) {
    target(ensemblId: $ensemblId) {
      approvedName
      associatedDiseases {
        aggregations {
          uniques
          aggs {
            name
            uniques
            rows {
              key
              uniques
              aggs {
                key
                uniques
              }
            }
          }
        }
        count
      }
    }
  }
`;

const extractLevel = level =>
  level?.map(agg => ({
    nodeId: agg.key || agg.name,
    label: fixLabel(agg.key || agg.name),
    count: agg.uniques,
    checked: false,
    aggs: extractLevel(agg.aggs || agg.rows),
  }));

const prepareFacetData = data => extractLevel(data?.aggs) || [];

export const getQuery = entity =>
  ({
    disease: DISEASE_FACET_QUERY,
    target: TARGET_FACET_QUERY,
  }[entity]);

export const dataAccessor = (data, entity) =>
  ({
    disease: prepareFacetData(data?.disease?.associatedTargets.aggregations),
    target: prepareFacetData(data?.target?.associatedDiseases.aggregations),
  }[entity]);
