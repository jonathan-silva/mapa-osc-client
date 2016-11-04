class Rotas{

  constructor() {
  }

  static get getBaseUrl(){
    return "http://mapaosc-desenv.ipea.gov.br:8383";
  }

  //index.js
  AutocompleteOSCByName(term, limit){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/autocomplete/"+term+"/"+limit;
  }
  AutocompleteOSCByCounty(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/municipio/"+term;
  }
  AutocompleteOSCByState(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/estado/"+term;
  }
  AutocompleteOSCByRegion(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/regiao/"+term;
  }

  //resultado-consulta.js
  OSCByID(id){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/osc/"+id;
  }
  OSCByNameInMap(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/geo/"+term;
  }
  OSCByCountyInMap(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/municipio/geo/"+term;
  }
  OSCByStateInMap(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/estado/geo/"+term;
  }
  OSCByRegionInMap(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/regiao/geo/"+term;
  }

  OSCByName(term){
    return "http://mapaosc-desenv.ipea.gov.br:8484"+"/api/search/osc/lista/"+term;
  }
  OSCByCounty(term){
    return "http://mapaosc-desenv.ipea.gov.br:8484"+"/api/search/municipio/lista/"+term;
  }
  OSCByState(term){
    return "http://mapaosc-desenv.ipea.gov.br:8484"+"/api/search/estado/lista/"+term;
  }
  OSCByRegion(term){
    return "http://mapaosc-desenv.ipea.gov.br:8484"+"/api/search/regiao/lista/"+term;
  }

  ClusterEstado(){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/geo/cluster/estado";
  }
}
