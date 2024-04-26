
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
if (!document.querySelector('#book-content').value) {
    document.querySelector('#book-content').value = "子曰學而時習之不亦說乎\n'學之爲言效也人性皆善而覺有先後後覺者必效先覺之所爲乃可以明善而復其初也習鳥數飛也學之不已如鳥數飛也說喜意也旣學而又時時習之則所學者熟而中心喜說其進自不能已矣.\n程子曰習重習也時復思繹浹洽於中則說也又曰學者將以行之也時習之則所學者在我故悅.\n謝氏曰時習者無時而不習坐如尸坐時習也立如齊立時習也'\n有朋自遠方來不亦樂乎\n'朋同類也自遠方來則近者可知.程子曰以善及人而信從者衆故可樂又曰說在心樂主發散在外'\n人不知而不慍不亦君子乎\n'慍含怒意君子成德之名.\n尹氏曰學在己知不知在人何慍之有.\n程子曰雖樂於及人不見是而無悶乃所謂君子.\n愚謂及人而樂者順而易不知而不慍者逆而難故惟成德者能之然德之所以成亦由學之正習之熟說之深而不已焉耳'.\n有子曰其爲人也孝弟而好犯上者鮮矣不好犯上而好作亂者未之有也\n'有子孔子弟子名若善事父母爲孝善事兄長爲弟犯上謂干犯在上之人鮮少也作亂則爲悖逆爭鬪之事矣此言人能孝弟則其心和順少好犯上必不好作亂也'.\n君子務本本立而道生孝弟也者其爲仁之本與\n'務專力也本猶根也仁者愛之理心之德也爲仁猶曰行仁與者疑辭謙退不敢質言也言君子凡事專用力於根本根本旣立則其道自生若上文所謂孝弟乃是爲仁之本學者務此則仁道自此而生也.\n程子曰孝弟順德也故不好犯上豈復有逆理亂常之事德有本本立則其道充大孝弟行於家而後仁愛及於物所謂親親而仁民也故爲仁以孝弟爲本論性則以仁爲孝弟之本或問孝弟爲仁之本此是由孝弟可以至仁否曰非也謂行仁自孝弟始孝弟는 是仁之一事니 謂之行仁之本則可謂是仁之本則不可蓋仁是性也孝弟是用也性中只有箇仁義禮智四者而已曷嘗有孝弟來然仁主於愛愛莫大於愛親故曰孝弟也者其爲仁之本與'.\n子曰巧言令色鮮矣仁"
}
console.log(document.querySelector('#book-content').value )

var text = document.querySelector('#book-content').value.replace(/\./g, '<br>')
var title = document.querySelector('#book-title').value.replace(' ', '<br></br>')

renderText(title, text)

function renderText(title, text) {

    var smalltext = text.split("'")
    for (var i=0; i<smalltext.length; i++){
        if (i%2 == 1){
            texttonumarr[i] = []
            smalltextarr[i] = smalltext[i].replace(/\s/g, '').replace(/\<br\>/g, '○').match(/.{1,4}/g)
            for (var j=0; j<smalltextarr[i].length; j++){
                texttonumarr[i][j] = base64[j]
            }
            smalltext[i] = texttonumarr[i].join('')
        }
    }
    var smalltextstring = smalltext.join('')
    
    text = smalltextstring.replace(/\s/g, '').replace(/\<br\>/g, '○')

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

    document.querySelector('#booktitle').innerHTML = title
}


document.querySelector('#book-title').addEventListener("input", (e) => {
    title = document.querySelector('#book-title').value
    renderText(title, text)
})

document.querySelector('#book-content').addEventListener("input", (e) => {
    text = document.querySelector('#book-content').value.replace(/\./g, '<br>')
    renderText(title, text)
})

var isFolded = true

document.querySelector('#outerline').addEventListener("click", (e) => {
    if (isFolded) {
        document.querySelector('.form').style.display = "flex"
        isFolded = false
    } else {
        document.querySelector('.form').style.display = "none"
        isFolded = true
    }
})