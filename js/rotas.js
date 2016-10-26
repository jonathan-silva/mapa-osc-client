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
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"api/osc/"+id;
  }
  OSCByName(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/osc/lista/"+term;
  }
  OSCByCounty(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/municipio/lista/"+term;
  }
  OSCByState(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/estado/lista/"+term;
  }
  OSCByRegion(term){
    return "http://mapaosc-desenv.ipea.gov.br:8383"+"/api/search/regiao/lista/"+term;
  }
}
