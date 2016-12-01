class Rotas{

  constructor() {
  }

  getBaseUrl(){
    return "http://localhost";
  }

  //index.js
  AutocompleteOSCByNameId(term){
    return this.getBaseUrl()+":8383/api/search/oscid/autocomplete/"+term;
  }
  AutocompleteOSCByName(term, limit){
    return this.getBaseUrl()+":8383/api/search/osc/autocomplete/"+term+"/"+limit;
  }
  AutocompleteOSCByCounty(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/municipio/"+term+"/"+limit;
  }
  AutocompleteOSCByState(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/estado/"+term+"/"+limit;
  }
  AutocompleteOSCByRegion(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/regiao/"+term+"/"+limit;
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

  ClusterMunicipio(){
    return this.getBaseUrl()+":8383/api/geo/cluster/municipio";
  }
  ClusterEstado(){
    return this.getBaseUrl()+":8383/api/geo/cluster/estado";
  }
  ClusterRegiao(){
    return this.getBaseUrl()+":8383/api/geo/cluster/regiao";
  }

  // editar-osc.js
  OSCByID_no_project(id){
    return this.getBaseUrl()+":8383/api/osc/"+id;
  }
  ProjectByID(id){
    return this.getBaseUrl()+":8383/api/projeto/"+id;
  }
  Objetivos(){
    return this.getBaseUrl()+":8383/api/menu/osc/objetivo_projeto";
  }
  MetasById(id){
    return this.getBaseUrl()+":8383/api/menu/osc/meta_projeto"+id;
  }
}
