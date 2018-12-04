/* -------- Réservation effectuée ---------- */

var identite = {
	nom: "",
	prenom: ""
}

var lieu = {
	adresse: "",
	exist: "",
	date: ""
}

$('#check').click(function(){
	clear();
	var identiteReserv = Object.create(identite);
	var identiteLieu = Object.create(lieu);
	$('#signature').hide();
	var valeurNom = document.getElementById('nom').value;
	var valeurPrenom = document.getElementById('prenom').value;
	window['dateEnregistrement'] = new Date();

	identiteReserv.prenom = valeurPrenom;
	identiteReserv.nom = valeurNom;
	localStorage.setItem('identite', JSON.stringify(identiteReserv));
	var dataId = JSON.parse(localStorage.getItem('identite'));

	identiteLieu.adresse = adresse;	
	identiteLieu.exist = 'true';
	identiteLieu.date = dateEnregistrement;
	sessionStorage.setItem('lieu', JSON.stringify(identiteLieu));
	var dataLieu = JSON.parse(sessionStorage.getItem('lieu'));
	window.location.reload();
	$('#retour').text("Vélo réservé à l'adresse : " + dataLieu.adresse + " par " + dataId.prenom + " " + dataId.nom);
	$('#retour').slideDown();
	$('#formulaireReservation').hide();
	$('#retour').slideDown();
	$('#chrono').slideDown();
	exist = 1;

});

/* ------ Nettoyage des informations -------- */
function clear(){
	sessionStorage.clear();
	$('#retour').slideUp();
	$('#chrono').slideUp();		
	exist = 0;		
}

$('#annuler').click(function(){
	clear();
	$(this).css({
		"box-shadow": "0px 0px 10px black"
	});
	setTimeout(function(){
		$(this).css({
			"box-shadow": "0px 6px 10px black"
		});
	}, 500);
});

var exist = 0;
$('#form').show();
$('#signature').hide();


$('#reserver').click(function(){
var valeurNom = document.getElementById('nom').value;
var valeurPrenom = document.getElementById('prenom').value;	
	if (valeurNom === "") {
		$('#nom').css({
			"border" : "2px double red"
		});
		setTimeout(function(){							
			$('#nom').css({
				"border" : "1px solid grey"
			});
		}, 1000);
	}
	else if (valeurPrenom === "") {
		$('#prenom').css({
			"border" : "2px double red"
		});
		setTimeout(function(){							
			$('#prenom').css({
				"border" : "1px solid grey"
			});
		}, 1000);
	}
	else{
		$('#form').hide("slow");
		$('#signature').show("slow");
	}
	
});