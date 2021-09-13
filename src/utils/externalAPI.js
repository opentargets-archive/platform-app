import axios from 'axios'; 
import config from '../config';

const url= {
    geneAllCancerJSON: "/tpm/gene-all-cancer/json",
  }

/*
  Get a single-gene single-disease all-GTEx-tissue-subgroups TPM summary table
  API DOC https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
export const getGeneAllCancerJSON = async (ensemblId,callback,errorHandler = (error)=>{console.log(error)}) => {
         
          const params= {
              ensemblId: ensemblId
            };
          const endpoint = config.chopRServer.concat(url.geneAllCancerJSON);

          RServerDataGETFetcher(params,endpoint,callback,errorHandler)
        
}

/*
  Data fetcher for the CHoP R server
*/
const RServerDataGETFetcher =  (params,endpoint,callback,errorHandler) => {
         axios.get(endpoint, {params})
          .then(function (response) {
            if(response.status && response.status === 200){
              callback(response.data);
            }else{
              errorHandler("err message");
            }
          })
          .catch(function (error) {
            errorHandler(error);
          }); 
}