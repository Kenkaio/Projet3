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

/* -------- Réservation effectuée ---------- */
$('#check').click(function(){
	$('#signature').hide();
	var valeurNom = document.getElementById('nom').value;
	var valeurPrenom = document.getElementById('prenom').value;
	window['dateEnregistrement'] = new Date();
	sessionStorage.setItem("nom", valeurNom);
	sessionStorage.setItem("prenom", valeurPrenom);
	sessionStorage.setItem("adresse", adresse);	
	sessionStorage.setItem("exist", 'true');
	sessionStorage.setItem("date", dateEnregistrement);
	$('#retour').text("Vélo réservé à l'adresse : " + sessionStorage.getItem("adresse") + " par " + sessionStorage.getItem("prenom") + " " + sessionStorage.getItem("nom"));
	$('#annuler').show();
	$('#retour').slideDown();	
	$('#map').hide();
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
	setTimeout(function(){
		$('#map').show();
		$('#map').css({
			"height" : '500px',
			"width" : '100%'
		});
	}, 500);
		
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
