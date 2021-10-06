import axios from 'axios'; 
import config from '../config';

const url= {
  // For Target Page
    geneAllCancerJSON: "/tpm/gene-all-cancer/json",
    geneAllCancerPlot: "/tpm/gene-all-cancer/plot",
  // For Evidence Page
    geneDiseaseGtexJSON: "/tpm​/gene-disease-gtex​/json",
    geneDiseaseGtexPlot: "/tpm​/gene-disease-gtex​/plot",
  }

  
  /*
  Get a single-gene all-diseases TPM summary table          : Evidence Page
  API DOC https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
  export const getGeneDiseaseGtexJSON = async (ensemblId, efoId, callback, errorHandler = (error)=>{console.log(error)}, widget = "detail") => {
         
    const params= {
        ensemblId: ensemblId,
        efoId: efoId
      };
    const endpoint = config.chopRServer.concat("/tpm/gene-disease-gtex/json");
    if (widget === "detail") {
      RServerJSONGETFetcher(params, endpoint, callback, errorHandler)
    } else {
       RServerJSONGETFetcherForSummary(params, endpoint, callback, errorHandler)
    }
  
}

/*
  Get a single-gene all-diseases TPM boxplot            : Evidence Page
  API DOC https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
  export const getGeneDiseaseGtexPlot = async (ensemblId, efoId, yAxisScale, callback, errorHandler = (error)=>{console.log(error)}) => {
         
    const params = {
        ensemblId: ensemblId,
        efoId: efoId,
        yAxisScale: yAxisScale,
      };
    let endpoint = config.chopRServer.concat("/tpm/gene-disease-gtex/plot");
    
    endpoint = endpoint + `?ensemblId=${ensemblId}&efoId=${efoId}&yAxisScale=${yAxisScale}`
    console.log("endpoint: ", endpoint)
    RServerPlotGETFetcher(params, endpoint, callback, errorHandler)
  
}




  /*
  Get a single-gene all-diseases TPM summary table          : Target Page
  API DOC https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
export const getGeneAllCancerJSON = async (ensemblId,callback,errorHandler = (error)=>{console.log(error)}, widget = 'detail') => {
         
          const params= {
              ensemblId: ensemblId
            };
          const endpoint = config.chopRServer.concat(url.geneAllCancerJSON);

          if (widget === "detail") {
            RServerJSONGETFetcher(params, endpoint, callback, errorHandler)
          } else {
            return RServerJSONGETFetcherForSummary(params, endpoint, callback, errorHandler)
          }

           
}

/*  
  Get a single-gene all-diseases TPM boxplot              : Target Page
  API DOC https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
  export const getGeneAllCancerPlot = async (ensemblId, yAxisScale, callback, errorHandler = (error)=>{console.log(error)}) => {
         
    const params= {
        ensemblId: ensemblId,
        yAxisScale: yAxisScale,
      };
    let endpoint = config.chopRServer.concat(url.geneAllCancerPlot);
    
    endpoint = endpoint + `?ensemblId=${ensemblId}&yAxisScale=${yAxisScale}`
     console.log("endpoint: ", endpoint)
    RServerPlotGETFetcher(params, endpoint, callback, errorHandler)
  
}



/*
  JSON Data fetcher for the CHoP R server
*/

const RServerJSONGETFetcherForSummary =  (params,endpoint,callback,errorHandler) => {
  axios.get(endpoint, {params})
   .then(function (response) {
     if(response.status && response.status === 200){
       callback(response.data);
     }else if (response.status && (response.status === 404 || response.status === 500 )){
      callback(null);
     } else {
        errorHandler("err message");
     }
   })
   .catch(function (error) {
    errorHandler(error);
  }); 
}

const RServerJSONGETFetcher =  (params,endpoint,callback,errorHandler) => {
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

/*
  Plot fetcher for the CHoP R server
*/
const RServerPlotGETFetcher =  (params,endpoint,callback,errorHandler) => {
  axios.get(endpoint, {responseType: 'arraybuffer'})
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