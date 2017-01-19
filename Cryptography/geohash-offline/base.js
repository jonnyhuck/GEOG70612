function stripBad3(string) {
    for (var i=0, output='', valid="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; i<string.length; i++)
       if (valid.indexOf(string.charAt(i)) != -1)
          output += string.charAt(i)
    return output;
} 


function FracHex2Dec(input) {
	var iz = "";
 	var v = "";
	var pos = 0;
	var g = 0;
	var m = 0;
	var nUpower = 0;
	var nSprod = 0;
	var lst = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var pw3 = parseInt(16, 10)
	var sNumber = input;
	sNumber = sNumber.toUpperCase()
	sNumber = stripBad3(sNumber)
	var j =  sNumber.length
	for (k=0; k < j; k++) {
	iz = sNumber.charAt(k)
	pos = lst.indexOf(iz)
	nUpower = k+1
	nSprod = Math.pow(pw3, -nUpower)
	m=pos*nSprod
	g = g+m
	v = "" + g
	var vj =  v.length
	var jv = v.substring(1, vj)
		}
	return jv;
}
