class Rotas{

  constructor() {
  }

  static get getBaseUrl(){
    return "mapaosc-desenv.ipea.gov.br:8383";
  }

  //index.js
  AutocompleteOSCByName(term, limit){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/autocomplete/"+term+"/"+limit;
  }
  AutocompleteOSCByCounty(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/municipio/"+term;
  }
  AutocompleteOSCByState(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/estado/"+term;
  }
  AutocompleteOSCByRegion(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/menu/geo/regiao/"+term;
  }

  //resultado-consulta.js
  OSCByID(id){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/osc/"+id;
  }
  OSCByNameInMap(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/geo/"+term;
  }
  OSCByCountyInMap(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/municipio/geo/"+term;
  }
  OSCByStateInMap(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/estado/geo/"+term;
  }
  OSCByRegionInMap(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/regiao/geo/"+term;
  }

  OSCByName(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/lista/"+term;
  }
  OSCByCounty(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/municipio/lista/"+term;
  }
  OSCByState(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/estado/lista/"+term;
  }
  OSCByRegion(term){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/search/regiao/lista/"+term;
  }

  ClusterEstado(){
    return "mapaosc-desenv.ipea.gov.br:8383"+"/api/geo/cluster/estado";
  }
}
