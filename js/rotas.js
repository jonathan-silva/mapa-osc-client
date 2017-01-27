class Rotas{

  constructor() {
  }

  getBaseUrl(){
    return "http://mapaosc-desenv.ipea.gov.br";
    // return "http://10.1.4.205";
    // return "http://localhost";
  }

  //index.js
  AutocompleteOSCByName(term, limit){
    return this.getBaseUrl()+":8383/api/search/osc/autocomplete/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByCnpj(term, limit){
    return this.getBaseUrl()+":8383/api/search/cnpj/autocomplete/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByCounty(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/municipio/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByState(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/estado/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByRegion(term, limit){
    return this.getBaseUrl()+":8383/api/menu/geo/regiao/"+term+"/"+limit+"/0";
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

  OSCByName(term,offset){
    return this.getBaseUrl()+":8484/api/search/osc/lista/"+term+"/10/"+offset;
  }
  OSCByCounty(term,offset){
    return this.getBaseUrl()+":8484/api/search/municipio/lista/"+term+"/10/"+offset;
  }
  OSCByState(term,offset){
    return this.getBaseUrl()+":8484/api/search/estado/lista/"+term+"/10/"+offset;
  }
  OSCByRegion(term,offset){
    return this.getBaseUrl()+":8484/api/search/regiao/lista/"+term+"/10/"+offset;
  }
  AllOSC(offset){
    return this.getBaseUrl()+":8484/api/search/all/lista/10/"+offset;
  }

  ClusterMunicipio(){
    return this.getBaseUrl()+":8383/api/geo/cluster/municipio";
  }
  ClusterEstado(){
    return this.getBaseUrl()+":8383/api/geo/cluster/estado";
  }
  ClusterEstadoPorRegiao(id){
    return this.getBaseUrl()+":8383/api/geo/cluster/estado/"+id;
  }
  ClusterPais(){
    return this.getBaseUrl()+":8383/api/geo/cluster/regiao";
  }
  ClusterRegiao(id){
    return this.getBaseUrl()+":8383/api/geo/cluster/regiao/"+id;
  }

  // editar-osc.js
  OSCByID_no_project(id){
    return this.getBaseUrl()+":8383/api/osc/no_project/"+id;
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
  AreaAtuacao(){
    return this.getBaseUrl()+":8383/api/menu/osc/area_atuacao";
  }
  DadosGerais(id){
    return this.getBaseUrl()+":8383/api/osc/dadosgerais/"+id;
  }
  SubAreaAtuacao(){
    return this.getBaseUrl()+":8383/api/menu/osc/subarea_atuacao";
  }
  MetaProjeto(id){
    return this.getBaseUrl()+":8383/api/menu/osc/meta_projeto/"+id;
  }
  Descricao(id){
    return this.getBaseUrl()+":8383/api/osc/descricao/"+id;
  }
  Certificado(id){
    return this.getBaseUrl()+":8383/api/osc/certificado/"+id;
  }

  // editais.js
  Edital(){
    return this.getBaseUrl()+":8383/api/edital";
  }

  // Header.jsx
  Login(){
    return this.getBaseUrl()+":8383/api/user/login/";
  }

  //cadastro-receber-noticia.js
  ReceberNoticia(){
    return this.getBaseUrl()+":8383/api/user/newsletter/";
  }

  //cadastro-representante.js
  CadastroRepresentante(){
    return this.getBaseUrl()+":8383/api/user/";
  }

  //contato.js
  Contato(){
    return this.getBaseUrl()+":8383/api/user/contato/";
  }

  //recuperar-senha
  RecuperSenha(){
    return this.getBaseUrl()+":8383/api/user/esquecisenha/";
  }

}
