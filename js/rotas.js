class Rotas{

  constructor() {
  }

  getBaseUrl(){
    return "https://mapaosc-desenv.ipea.gov.br";
  //  return "https://10.1.4.205";
  //  return "http://localhost";
  }

  //index.js
  AutocompleteOSCByName(term, limit, similarity){
    return this.getBaseUrl()+":8383/api/search/osc/autocomplete/"+term+"/"+limit+"/0/"+similarity;
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
  OSCByNameInMap(term, similarity){
    return this.getBaseUrl()+":8383/api/search/osc/geo/"+term+"/0/0/"+similarity;
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

  OSCByName(term, offset, similarity){
    return this.getBaseUrl()+":8484/api/search/osc/lista/"+term+"/10/"+offset+"/"+similarity;
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
  AtualizarProjectByID(id){
    return this.getBaseUrl()+":8383/api/osc/projeto/"+id;
  }
  CriarProjectByID(id){
    return this.getBaseUrl()+":8383/api/osc/projeto/insert/"+id;
  }
  RemoverProjectByID(id_proj,id_osc){
    return this.getBaseUrl()+":8383/api/osc/projeto/"+id_proj+"/"+id_osc;
  }
  Objetivos(){
    return this.getBaseUrl()+":8383/api/menu/osc/objetivo_projeto";
  }
  MetasById(id){
    return this.getBaseUrl()+":8383/api/menu/osc/meta_projeto/"+id;
  }
  AreaAtuacao(){
    return this.getBaseUrl()+":8383/api/menu/osc/area_atuacao";
  }
  AtualizarAreaAtuacao(id){
    return this.getBaseUrl()+":8383/api/osc/area_atuacao/"+id;
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
  RelacoesTrabalho(id){
    return this.getBaseUrl()+":8383/api/osc/relacoestrabalho/"+id;
  }
  RelacoesTrabalhoOutra(id){
    return this.getBaseUrl()+":8383/api/osc/relacoestrabalhooutra/"+id;
  }
  ParticipacaoSocialConselho(id){
    return this.getBaseUrl()+":8383/api/osc/participacaosocialconselho/"+id;
  }
  ParticipacaoSocialConferencia(id){
    return this.getBaseUrl()+":8383/api/osc/participacaosocialconferencia/"+id;
  }
  OutraParticipacaoSocial(id){
    return this.getBaseUrl()+":8383/api/osc/participacaosocialoutra/"+id;
  }
  PeriodicidadeReuniao(){
    return this.getBaseUrl()+":8383/api/menu/osc/periodicidade_reuniao/";
  }
  Conselho(){
    return this.getBaseUrl()+":8383/api/menu/osc/conselho/";
  }
  Conferencia(){
    return this.getBaseUrl()+":8383/api/menu/osc/conferencia/";
  }
  Titularidade(){
    return this.getBaseUrl()+":8383/api/menu/osc/tipo_participacao/";
  }
  FontesRecursosById(){
    return this.getBaseUrl()+":8383/api/osc/recursos/"+id;
  }
  FontesRecursos(){
    return this.getBaseUrl()+":8383/api/menu/osc/fonte_recursos_osc";
  }
  AtualizarFontesRecursos(id){
    return this.getBaseUrl()+":8383/api/osc/recursososc/"+id;
  }
  ConselhoFiscal(id){
    return this.getBaseUrl()+":8383/api/osc/conselhofiscal/"+id;
  }
  Dirigente(id){
    return this.getBaseUrl()+":8383/api/osc/dirigente/"+id;
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

  //alterar-senha
  AlterarSenha(){
    return this.getBaseUrl()+":8383/api/user/alterarsenha/";
  }

  //configurar-conta.js
  ValidarUsuario(id){
    return this.getBaseUrl()+":8383/api/user/"+id;
  }

  UpdateUsuario(id){
    return this.getBaseUrl()+":8383/api/user/"+id;
   }

   //usuario
  AtivarUsuario(token){
    return this.getBaseUrl()+":8383/api/user/ativarcadastro/"+token;
  }

  //consulta avancada
  SituacaoImovel(){
    return this.getBaseUrl()+":8383/api/menu/osc/situacao_imovel/";
  }

  FontesRecursosProjeto(){
    return this.getBaseUrl()+":8383/api/menu/osc/origem_fonte_recursos_projeto/";
  }

  ZonaAtuacaoProjeto(){
    return this.getBaseUrl()+":8383/api/menu/osc/zona_atuacao_projeto/";
  }

  AbrangenciaProjeto(){
    return this.getBaseUrl()+":8383/api/menu/osc/abrangencia_projeto/";
  }

  SituacaoProjeto(){
    return this.getBaseUrl()+":8383/api/menu/osc/status_projeto/";
  }

  FormaParticipacaoConferencia(){
    return this.getBaseUrl()+":8383/api/menu/osc/forma_participacao_conferencia/";
  }

  ConsultaAvancadaLista(term){
    return this.getBaseUrl()+":8383/api/search/osc/lista/consultaAvancada/"+term;

  }

  ConsultaAvancadaMapa(term){
    return this.getBaseUrl()+":8383/api/search/osc/geo/consultaAvancada/"+term;

  }

  //Imprensa
  Imprensa(){
    return this.getBaseUrl()+":8383/api/imprensa/";
  }
  NoticiaByID(id){
    return this.getBaseUrl()+":8383/api/noticia/"+id;
  }
  VideoByID(id){
    return this.getBaseUrl()+":8383/api/video/"+id;
  }

}
