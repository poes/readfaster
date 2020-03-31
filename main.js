function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} 



var texts = [
    'A shower is a place in which a person bathes under a spray of typically warm or hot water. Indoors, there is a drain in the floor. Most showers have temperature, spray pressure and adjustable showerhead nozzle. The simplest showers have a swivelling nozzle aiming down on the user, while more complex showers have a showerhead connected to a hose that has a mounting bracket. This allows the showerer to hold the showerhead by hand to spray the water at different parts of their body.',
    'A computer is a machine that can be instructed to carry out sequences of arithmetic or logical operations automatically via computer programming. Modern computers have the ability to follow generalized sets of operations, called programs. These programs enable computers to perform an extremely wide range of tasks.',
    'The cat (Felis catus) is a small carnivorous mammal. It is the only domesticated species in the family Felidae and often referred to as the domestic cat to distinguish it from wild members of the family. The cat is either a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact. Domestic cats are valued by humans for companionship and for their ability to hunt pests such as rodents. About 60 cat breeds are recognized by various cat registries.',
    'Cactus spines are produced from specialized structures called areoles, a kind of highly reduced branch. Areoles are an identifying feature of cacti. As well as spines, areoles give rise to flowers, which are usually tubular and multipetaled. Many cacti have short growing seasons and long dormancies, and are able to react quickly to any rainfall, helped by an extensive but relatively shallow root system that quickly absorbs any water reaching the ground surface.'
]

var text = texts[Math.floor(Math.random() * texts.length)];
var srt = 0;
var frt = 0;

function r2d(n){ // round 2 decimals
    return Math.round(n * 100) / 100;
}

function srStart(){
    srt = Date.now();
    var button = document.getElementById('srb');
    var srtext = document.getElementById('srtext');
    button.innerText = 'stop';
    button.onclick = function(){
        var time = Date.now() - srt;
        button.innerText = 'retry';
        button.onclick = srStart;
        var msw = time / text.split(" ").length;
        var wpm = 60000 / msw;
        srtext.innerText = 'Done!'
        document.getElementById('resultsr').innerHTML = 'You read the text in <a class="red">' + time + 'ms</a> (<a class="red">' + r2d(msw) + 'ms</a> per word)<br>Which is <a class="red">' + r2d(wpm) + '</a> words per minute!';
        //'You read the text in ' + time + 'ms (' + r2d(msw) + 'ms per word)\nWhich is ' + r2d(wpm) + ' words per minute!';
    };
    srtext.innerText = text;
}

var wordindex = 0;
function frStart(){
    frt = Date.now();
    var slider = document.getElementById('slider');
    var button = document.getElementById('frb');
    var frtext = document.getElementById('frtext');
    button.innerText = 'disabled';
    button.disabled = true;
    wordindex = 0;
    decTimeout();
}

function decTimeout(){
    var slider = document.getElementById('slider');
    var frtext = document.getElementById('frtext');
    var words = text.split(' ');
    if(wordindex > words.length - 1){
        frEnd();
    } else {
        frtext.innerText = words[wordindex];
        wordindex++;
        setTimeout(function(){
            decTimeout();
        }, slider.value)
    }
}

async function frEnd(){
    var button = document.getElementById('frb');
    var words = text.split(' ');
    var time = Date.now() - frt;
    var msw = time / text.split(" ").length;
    var wpm = 60000 / msw;
    frtext.innerText = 'Done!';
    button.disabled = false;
    button.innerText = 'retry';
    document.getElementById('resultfr').innerHTML = 'You read the text in <a class="red">' + time + 'ms</a> (<a class="red">' + r2d(msw) + 'ms</a> per word)<br>Which is <a class="red">' + r2d(wpm) + '</a> words per minute!';
    //'You read the text in ' + time + 'ms (' + r2d(msw) + 'ms per word)\nWhich is ' + r2d(wpm) + ' words per minute!';
}

var wordindex = 0;
function frrStart(){
    frt = Date.now();
    var slider = document.getElementById('sliderr');
    var button = document.getElementById('frrb');
    var frtext = document.getElementById('frrtext');
    button.innerText = 'disabled';
    button.disabled = true;
    wordindex = 0;
    deccTimeout();
}

function deccTimeout(){
    var slider = document.getElementById('sliderr');
    var frtext = document.getElementById('frrtext');
    var words = document.getElementById('realip').value.split(' ');
    if(wordindex > words.length - 1){
        frrEnd();
    } else {
        frtext.innerText = words[wordindex];
        wordindex++;
        setTimeout(function(){
            deccTimeout();
        }, slider.value)
    }
}

async function frrEnd(){
    var frtext = document.getElementById('frrtext');
    var button = document.getElementById('frrb');
    var words = document.getElementById('realip').value.split(' ');
    var time = Date.now() - frt;
    var msw = time / document.getElementById('realip').value.split(" ").length;
    var wpm = 60000 / msw;
    frtext.innerText = 'Done!';
    button.disabled = false;
    button.innerText = 'retry';
    document.getElementById('resultfrr').innerHTML = 'You read the text in <a class="red">' + time + 'ms</a> (<a class="red">' + r2d(msw) + 'ms</a> per word)<br>Which is <a class="red">' + r2d(wpm) + '</a> words per minute!';
    //'You read the text in ' + time + 'ms (' + r2d(msw) + 'ms per word)\nWhich is ' + r2d(wpm) + ' words per minute!';
}

setInterval(function(){
    var slider = document.getElementById('slider');
    var sliderN = document.getElementById('nrms');
    sliderN.value = slider.value + 'ms/word';
    var sliderr = document.getElementById('sliderr');
    var sliderrN = document.getElementById('nrmsr');
    sliderrN.value = sliderr.value + 'ms/word';
}, 50);