/*
    --------- Déclaration variables pour les diaps ----------
*/

var modification = [
    {
    	"transform": "perspective(400px) rotateY(-45deg)",
      	"width": "150px",
      	"transition-duration": "3s"
    },
    {
    	"transform": "perspective(400px) rotateY(45deg)",
      	"width": "150px",
      	"transition-duration": "3s"
    },
    {
    	"transform": "rotateY(0deg)",
      	"width": "1150px",
      	"transition-duration": "3s"
    }
];

$('#contenu1').css({
    "width": "1150px",
    "transform": "rotateY(0deg)",
    "transition-duration": "3s"
});

/*
    --------- Déclaration des modifications css en fonction de la diap selec ----------
*/

function diapFirst(){
    $('#contenu1').css(modification[2]);
    for (var i = nombreContenu; i > 1; i--) {
        $('#contenu'+i).css(modification[0]); // Boucles car modications identiques
    }
};

function diapLast(){
    $('#contenu' + nombreContenu).css(modification[2]);
    for (var i = nombreContenu - 1; i > 0; i--) {
        $('#contenu'+i).css(modification[1]);
    }
};

function diapMid(){
    for (var i = nombreContenu; i > 0; i--) { // boucle pour modifier le css quand la div selectionnée est au milieu
        var currentI = i;                       
        if(currentI > chiffreContenu) {
            $('#contenu'+currentI).css(modification[0]);
        }
        else if(currentI == chiffreContenu) {
            $('#contenu'+currentI).css(modification[2]);
        }
        else if(currentI < chiffreContenu) {
            $('#contenu'+currentI).css(modification[1]);
        }               
    }
};


/*
    --------- Animation Manuelle Click ----------
*/

var nombreContenu = $('.contenu').length;
var diap = 1;

$('.contenu').on('click', function () {
    var id = this.id;
    if(id === "contenu1"){ 
        diapFirst();
        diap = 1;        
    } 
    else if(id === "contenu" + nombreContenu){
        diapLast();
        diap = nombreContenu;
    }   
    else if((id !== "contenu" + nombreContenu) && (id !== "contenu1")){ 
        window['chiffreContenu'] = id.substr(7);
        diap = id.substr(7);
        diapMid();
    }
});

/*
    --------- Animation Manuelle Touches du clavier ----------
*/

function infosClavier(e) {
    if(e.keyCode === 39){
        if (diap === nombreContenu) {
            diap = 1;
            diapFirst();
        }
        else{
            diap++;
            window['chiffreContenu'] = diap;
            diapMid();
        }
        // -------- Modification image fleche -----------
        $('#flecheDroite').css({
            "background-image": "url('images/droiteOn.jpg')"
        });
        setTimeout(function(){ $('#flecheDroite').css({
            "background-image": "url('images/droiteOff.jpg')"
        }); }, 500);
    }
    else if(e.keyCode === 37){
        if (diap === 1) {
            diap = nombreContenu;
            diapLast();
        }
        else{
            diap--;
            window['chiffreContenu'] = diap;
            diapMid();
        }
        // -------- Modification image fleche -----------
        $('#flecheGauche').css({
            "background-image": "url('images/gaucheOn.png')"
        });
        setTimeout(function(){ $('#flecheGauche').css({
            "background-image": "url('images/gaucheOff.png')"
        }); }, 500);
    }
};


document.addEventListener("keydown", infosClavier);


/*
    --------- Animation Auto ----------
*/

function animationAuto(){
    if (diap === nombreContenu) {
        diap = 1;
        diapFirst();        
    }
    else{
        diap++;
        window['chiffreContenu'] = diap;
        diapMid();
    }
};

function lancementAnim() {
    window['varAnim'] = setInterval(animationAuto, 6000);
};

window.onload = lancementAnim();

$("#stop").click(function () {
    document.getElementById("timeline").classList.remove("timeline");
    clearInterval(varAnim);
    $('#demarrer').css({
        "opacity": "1",
        "display": "block"
    });
    $('#stop').css({
        "opacity": "0",
        "display": "none"
    });
    $('#timeline').css({
        "animation-play-state":"paused",
    });
});

$("#demarrer").click(function () {
    window['varAnim'] = setInterval(animationAuto, 6000);
    document.getElementById("timeline").classList.add("timeline");
    $('#demarrer').css({
        "opacity": "0",
        "display": "none"
    });
    $('#stop').css({
        "opacity": "1",
        "display": "block"
    });
    $('#timeline').css({
        "animation-play-state":"running",
    });
});

/* ------- Gestion du diapo < 1084px ------- */

 function diapLow(){
    if(window.innerWidth>705) {
        $('#contenu1Low').css({
            "background-image": "url('images/mapExplic.png')"
        });
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/reservation.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 5000);
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/signature.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 10000);
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/reserve.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 15000);
    }
    else if(window.innerWidth<705) {
         $('#contenu1Low').css({
            "background-image": "url('images/mapExplicLow.png')"
        });
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/reservationLow.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 5000);
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/signatureLow.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 10000);
        setTimeout(function(){ $('#contenu1Low').css({
            "background-image": "url('images/reserveLow.png')",
            "width": "100%",
            "margin": "0",
            "padding": "0"
        }); }, 15000);   
    }
}


setTimeout(diapLow, 1000);
setInterval(diapLow, 20000);

