var twoProduct_1 = twoProduct;

var SPLITTER = +(Math.pow(2, 27) + 1.0);

function twoProduct(a, b, result) {
  var x = a * b;

  var c = SPLITTER * a;
  var abig = c - a;
  var ahi = c - abig;
  var alo = a - ahi;

  var d = SPLITTER * b;
  var bbig = d - b;
  var bhi = d - bbig;
  var blo = b - bhi;

  var err1 = x - (ahi * bhi);
  var err2 = err1 - (alo * bhi);
  var err3 = err2 - (ahi * blo);

  var y = alo * blo - err3;

  if(result) {
    result[0] = y;
    result[1] = x;
    return result
  }

  return [ y, x ]
}

var robustSum = linearExpansionSum;

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b;
  var bv = x - a;
  var av = x - bv;
  var br = b - bv;
  var ar = a - av;
  var y = ar + br;
  if(y) {
    return [y, x]
  }
  return [x]
}

function linearExpansionSum(e, f) {
  var ne = e.length|0;
  var nf = f.length|0;
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0])
  }
  var n = ne + nf;
  var g = new Array(n);
  var count = 0;
  var eptr = 0;
  var fptr = 0;
  var abs = Math.abs;
  var ei = e[eptr];
  var ea = abs(ei);
  var fi = f[fptr];
  var fa = abs(fi);
  var a, b;
  if(ea < fa) {
    b = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  var x = a + b;
  var bv = x - a;
  var y = b - bv;
  var q0 = y;
  var q1 = x;
  var _x, _bv, _av, _br, _ar;
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei;
      eptr += 1;
      if(eptr < ne) {
        ei = e[eptr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fptr += 1;
      if(fptr < nf) {
        fi = f[fptr];
        fa = abs(fi);
      }
    }
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }
  while(eptr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
    }
  }
  while(fptr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    } 
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
    }
  }
  if(q0) {
    g[count++] = q0;
  }
  if(q1) {
    g[count++] = q1;
  }
  if(!count) {
    g[count++] = 0.0;  
  }
  g.length = count;
  return g
}

var dotProd = robustDotProduct;

function robustDotProduct(a, b) {
  var r = twoProduct_1(a[0], b[0]);
  for(var i=1; i<a.length; ++i) {
    r = robustSum(r, twoProduct_1(a[i], b[i]));
  }
  return r
}

var clipPoly = splitPolygon;
var positive_1 = positive;
var negative_1 = negative;

function planeT(p, plane) {
  var r = robustSum(dotProd(p, plane), [plane[plane.length-1]]);
  return r[r.length-1]
}


//Can't do this exactly and emit a floating point result
function lerpW(a, wa, b, wb) {
  var d = wb - wa;
  var t = -wa / d;
  if(t < 0.0) {
    t = 0.0;
  } else if(t > 1.0) {
    t = 1.0;
  }
  var ti = 1.0 - t;
  var n = a.length;
  var r = new Array(n);
  for(var i=0; i<n; ++i) {
    r[i] = t * a[i] + ti * b[i];
  }
  return r
}

function splitPolygon(points, plane) {
  var pos = [];
  var neg = [];
  var a = planeT(points[points.length-1], plane);
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i];
    var b = planeT(t, plane);
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      var p = lerpW(s, b, t, a);
      pos.push(p);
      neg.push(p.slice());
    }
    if(b < 0) {
      neg.push(t.slice());
    } else if(b > 0) {
      pos.push(t.slice());
    } else {
      pos.push(t.slice());
      neg.push(t.slice());
    }
    a = b;
  }
  return { positive: pos, negative: neg }
}

function positive(points, plane) {
  var pos = [];
  var a = planeT(points[points.length-1], plane);
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i];
    var b = planeT(t, plane);
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      pos.push(lerpW(s, b, t, a));
    }
    if(b >= 0) {
      pos.push(t.slice());
    }
    a = b;
  }
  return pos
}

function negative(points, plane) {
  var neg = [];
  var a = planeT(points[points.length-1], plane);
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i];
    var b = planeT(t, plane);
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      neg.push(lerpW(s, b, t, a));
    }
    if(b <= 0) {
      neg.push(t.slice());
    }
    a = b;
  }
  return neg
}
clipPoly.positive = positive_1;
clipPoly.negative = negative_1;

export default clipPoly;
export { clipPoly as __moduleExports, negative_1 as negative, positive_1 as positive };
