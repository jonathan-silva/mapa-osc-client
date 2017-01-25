//verifica se objeto existe, se e nulo ou vazio
function validateObject(obj){
  if(obj === null){
    return false;
  }
  else if(obj===undefined){
    return false;
  }
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return false;
  }
  return true;
}
