class Rotas{

  constructor() {
  }

  static get getBaseUrl(){
    return "http://localhost:8383";
  }

  //index.js
  AutocompleteOSCByName(term, limit){
    return "http://localhost:8383"+"/api/search/osc/autocomplete/"+term+"/"+limit;
  }
  AutocompleteOSCByCounty(term){
    return "http://localhost:8383"+"/api/menu/geo/municipio/"+term;
  }
  AutocompleteOSCByState(term){
    return "http://localhost:8383"+"/api/menu/geo/estado/"+term;
  }
  AutocompleteOSCByRegion(term){
    return "http://localhost:8383"+"/api/menu/geo/regiao/"+term;
  }

  //resultado-consulta.js
  OSCByID(id){
    return "http://localhost:8383"+"/api/osc/"+id;
  }
  OSCByNameInMap(term){
    return "http://localhost:8383"+"/api/search/osc/geo/"+term;
  }
  OSCByCountyInMap(term){
    return "http://localhost:8383"+"/api/search/municipio/geo/"+term;
  }
  OSCByStateInMap(term){
    return "http://localhost:8383"+"/api/search/estado/geo/"+term;
  }
  OSCByRegionInMap(term){
    return "http://localhost:8383"+"/api/search/regiao/geo/"+term;
  }

  OSCByName(term){
    return "http://localhost:8383"+"/api/search/osc/lista/"+term;
  }
  OSCByCounty(term){
    return "http://localhost:8383"+"/api/search/municipio/lista/"+term;
  }
  OSCByState(term){
    return "http://localhost:8383"+"/api/search/estado/lista/"+term;
  }
  OSCByRegion(term){
    return "http://localhost:8383"+"/api/search/regiao/lista/"+term;
  }
}
