var alpha = /[a-zA-Z]/
var num = /[0-9]/

function vercomp(a, b){
  // easy comparison to see if versions are identical
  if (a == b){ return 0; }

  var A = split(a);
  var B = split(b);

  if(A.length < B.length){
    return -vercomp(b, a);
  }

  var res = 0;
  A.forEach(function(segmentA, i){
    if(res != 0) return;

    var segmentB = B[i];

    // handle the tilde separator, it sorts before everything else
    if(segmentA == '~' || segmentB == '~'){
      if(segmentA != '~') {
        res = 1
        return
      }
      if(segmentB != '~'){
        res = -1
        return
      }
    }

    if(segmentA == segmentB){
      return 0
    }

    if(segmentB == null){
      res = 1;
      return;
    }

    typeA = !isNaN(segmentA)? 'num' : 'alpha'
    typeB = !isNaN(segmentB)? 'num' : 'alpha'

    if(typeA != typeB){
      if(typeA == 'num'){
        res = 1;
        return;
      }
    }

    if(segmentA > segmentB){
      res = 1
      return;
    }else{
      res = -1
      return;
    }
  });
  return res;
}


function split(str){
  var res = [];
  var lastType = null;
  var segment = null;

  function push(segment){
    if(num.test(segment)){
      res.push(+segment);
    }else{
      res.push(segment);
    }
  }

  for (var i = 0, len = str.length; i < len; i++) {
    var type;
    if(alpha.test(str[i])){
      type = 'alpha'
    }else if(num.test(str[i])){
      type = 'num'
    }else if(str[i] == "~"){
      type = '~'
    }else{
      lastType = 'unknown'
      continue
    }

    if(lastType == type){
      segment+= str[i]
    }else{
      if(segment) push(segment)
      segment = str[i]
    }
    lastType = type;
  }
  push(segment);
  return res;
}

module.exports = vercomp;
module.exports.split = split;
