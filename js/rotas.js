class Rotas{

  constructor() {
  }

  getBaseUrl(){
    return "http://localhost";//mapaosc-desenv.ipea.gov.br
  }

  //index.js
  AutocompleteOSCByName(term, limit){
    return this.getBaseUrl()+":8383/api/search/osc/autocomplete/"+term+"/"+limit;
  }
  AutocompleteOSCByCounty(term){
    return this.getBaseUrl()+":8383/api/menu/geo/municipio/"+term;
  }
  AutocompleteOSCByState(term){
    return this.getBaseUrl()+":8383/api/menu/geo/estado/"+term;
  }
  AutocompleteOSCByRegion(term){
    return this.getBaseUrl()+":8383/api/menu/geo/regiao/"+term;
  }

  //resultado-consulta.js
  OSCPopUpByID(id){
    return this.getBaseUrl()+":8383/api/osc/popup/"+id;
  }
  OSCByID(id){
    return this.getBaseUrl()+":8383/api/osc/"+id;
  }
  OSCByNameInMap(term){
    return this.getBaseUrl()+":8383/api/search/osc/geo/"+term;
  }
  OSCByCountyInMap(term){
    return this.getBaseUrl()+":8383/api/search/municipio/geo/"+term;
  }
  OSCByStateInMap(term){
    return this.getBaseUrl()+":8383/api/search/estado/geo/"+term;
  }
  OSCByRegionInMap(term){
    return this.getBaseUrl()+":8383/api/search/regiao/geo/"+term;
  }
  AllOSCInMap(){
    return this.getBaseUrl()+":8383/api/geo/osc/";
  }

  OSCByName(term){
    return this.getBaseUrl()+":8484/api/search/osc/lista/"+term;
  }
  OSCByCounty(term){
    return this.getBaseUrl()+":8484/api/search/municipio/lista/"+term;
  }
  OSCByState(term){
    return this.getBaseUrl()+":8484/api/search/estado/lista/"+term;
  }
  OSCByRegion(term){
    return this.getBaseUrl()+":8484/api/search/regiao/lista/"+term;
  }
  AllOSC(term){
    //return this.getBaseUrl()+":8484/api/search/regiao/lista/"+term;
  }

  ClusterEstado(){
    return this.getBaseUrl()+":8383/api/geo/cluster/estado";
  }
}
