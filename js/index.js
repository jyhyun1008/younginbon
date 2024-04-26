
function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()

var base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

var smalltextarr = []
var texttonumarr = []
var text = ''
var title = qs.title.replace(/\\n/g, '<br></br>')

if (qs.text) {
    var smalltext = qs.text.split("'")
    for (var i=0; i<smalltext.length; i++){
        if (i%2 == 1){
            texttonumarr[i] = []
            smalltextarr[i] = smalltext[i].match(/.{1,4}/g)
            for (var j=0; j<smalltextarr[i].length; j++){
                texttonumarr[i][j] = base64[j]
            }
            smalltext[i] = texttonumarr[i].join('')
        }
    }
    var smalltextstring = smalltext.join('')
    
    text = smalltextstring.replace(/\s/g, '').replace(/\\n/g, '○')
}

if (text) {
    var text2 = text.match(/.{1,12}/g)
    var index = -1
    var k = 0
    for (var i=0; i<20; i++){
        if (text2[i]) {
            if (text2[i].includes('A')) {
                index += 2
                k = 0
            }
            for (var j=0; j<base64.length * 2; j++) {
                if (j == base64.length) {
                    if (text2[i].includes('A')) {
                        index += 2
                        k = 0
                    }
                }
                if (index > 0){
                    if (text2[i].includes(base64[j % base64.length])) {
                        text2[i] = text2[i].replace(base64[j % base64.length], '('+smalltextarr[index][k]+')')
                        k += 1
                    }
                }
            }
            text2[i] = text2[i].replace(/\)\(/g, '').replace(/\(/g, '<span>').replace(/\)/g, '</span>')
            document.querySelector('#text'+i).innerHTML = text2[i]

            spanArr = Array.from(document.querySelectorAll('#text'+i+' span'))
            for(var l=0; l<spanArr.length; l++) {
                var length = Math.ceil(spanArr[l].innerText.length / 2)
                var spanArrSplit0 = spanArr[l].innerText.substring(0, length)
                var spanArrSplit1 = spanArr[l].innerText.substring(length)
                
                spanArr[l].innerHTML = '<div>' + spanArrSplit0 + '</div><div>' + spanArrSplit1 + '</div>'
            }
        }
    }
}

if (title){
    document.querySelector('#booktitle').innerHTML = title
}
