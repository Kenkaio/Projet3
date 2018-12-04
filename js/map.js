window.onload = function() { 
	var dataLieu = JSON.parse(sessionStorage.getItem('lieu'));
	// Initialisation de la map préalablement chargé sur fichier HTML
    L.mapquest.key = 'h929kA7Z4D4lFKTIgc5KacHfwVm8F1Sy';
    var baseLayer = L.mapquest.tileLayer('map');

    var map = L.mapquest.map('map', {
      center: L.latLng(45.75, 4.85),
      layers: baseLayer,
      zoom: 12
    });	

    /* ----- Récupération des infos api jcdecaux + ajout marqueurs sur la map ------- */

    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=22beeee17c3d11328823943102304b87aee0b0ca", function (reponse) {
    	var addressPoints = JSON.parse(reponse);	
	
        var markers = L.markerClusterGroup();

        for (var i = 0; i < addressPoints.length; i++) {
          	var title = addressPoints[i].name;
          	var id = addressPoints[i].number;

          	var marker = L.marker(new L.LatLng(addressPoints[i].position.lat, addressPoints[i].position.lng), {
            	title: title,
            	alt: id,
            	icon: L.mapquest.icons.marker()
          	});
          	if (dataLieu != null) { 
          		var dataId = JSON.parse(localStorage.getItem('identite'));
          		$('#retour').text("Vélo réservé à l'adresse : " + dataLieu.adresse + " par " + dataId.prenom + " " + dataId.nom);
		    	$('#retour').slideDown();
		    	$('#chrono').slideDown();
		    }

          	marker.bindPopup(title);
          	markers.addLayer(marker); 			
		    marker.on("click", function(){			              	
				var identifiant = this.options.alt;
				var valeur = 0;
				for (var i = 0; i < addressPoints.length; i++) {
		            if(addressPoints[i].number === identifiant){
		                valeur = i;
		                break;
	       		 	}
	    		}
	    		if(window.innerWidth>705) {
		    		$('#map').animate({
						width: '75%',
						marginLeft: '0px',
					}, 1000);
		    		setTimeout(function(){							
						$('#formulaireReservation').css({
							'display' : 'block',
							'opacity' : '0',
						});
					}, 1000);
					setTimeout(function(){							
						$('#formulaireReservation').css({
							'opacity' : '1',
							"transition" : "1.5s"
						});
					}, 1100);
					window['adresse'] = addressPoints[valeur].address;
		    		$('#adresse').text("Adresse : " + addressPoints[valeur].address);
		    		$('#places').text(addressPoints[valeur].bike_stands + " places");

		    		if (addressPoints[valeur].available_bikes === 1) {
		    			$('#veloDispo').text(addressPoints[valeur].available_bikes + " vélo disponible");
		    			$('#veloDispo').css({ 'color': 'black', 'fontWeight' : "normal"});
		    			$('#form').show();
		    		}
		    		else if (addressPoints[valeur].available_bikes === 0) {
		    			$('#veloDispo').text("Aucun vélo disponible");
		    			$('#veloDispo').css({ 'color': 'red', 'fontWeight' : "bold"});
		    			$('#form').hide();
		    		}
		    		else{
		    			$('#veloDispo').text(addressPoints[valeur].available_bikes + " vélos disponibles");
		    			$('#veloDispo').css({ 'color': 'black', 'fontWeight' : "normal"});
		    			$('#form').show();
		    		}
		    		$("#revenir").css({
						"display": "none"
					});
					$("#reserver").css({
						"margin-left": "20%"
					});
			    }
			    else if(window.innerWidth<705) {
			    	$('#map').css({
						'display': 'none',
					}, 1000);							
					$('#formulaireReservation').css({
						'display' : 'block',
						"margin": "auto",
						'opacity' : '0',
					});
					setTimeout(function(){							
						$('#formulaireReservation').css({
							'opacity' : '1',
							"transition" : "1.5s"
						});
					}, 100);
					window['adresse'] = addressPoints[valeur].address;
		    		$('#adresse').text("Adresse : " + addressPoints[valeur].address);
		    		$('#places').text(addressPoints[valeur].bike_stands + " places");

		    		if (addressPoints[valeur].available_bikes === 1) {
		    			$('#veloDispo').text(addressPoints[valeur].available_bikes + " vélo disponible");
		    			$('#veloDispo').css({ 'color': 'black', 'fontWeight' : "normal"});
		    			$('#form').show();
		    		}
		    		else if (addressPoints[valeur].available_bikes === 0) {
		    			$('#veloDispo').text("Aucun vélo disponible");
		    			$('#veloDispo').css({ 'color': 'red', 'fontWeight' : "bold"});
		    			$('#form').hide();
		    		}
		    		else{
		    			$('#veloDispo').text(addressPoints[valeur].available_bikes + " vélos disponibles");
		    			$('#veloDispo').css({ 'color': 'black', 'fontWeight' : "normal"});
		    			$('#form').show();
		    		}
			    }
		  	});        	
        }
        map.addLayer(markers);
	});
	/* ------ Création de la fonction compteur lancé toutes les secondes ------ */
    function compteur(){
    	if (dataLieu != null) {
	    	var date = dataLieu.date;
	    	var dateConv = Date.parse(date);
			var nouvelleDate = new Date();
			var nouvelleDateConv = Date.parse(nouvelleDate);
	    	var msecPerMinute = 1000 * 60;
	    	var interval = (nouvelleDateConv - dateConv);
	    	var chrono = 1200000 - interval;
	    	var verif = chrono;
	    	var minutes = Math.floor(chrono / msecPerMinute);
			chrono = chrono - (minutes * msecPerMinute);
			var seconds = Math.floor(chrono / 1000);
	    	if (verif < 0) {
	    		clear();
	    	}
	    	else{
	    		$('#compteur').text('Votre vélo est réservé pour ' + minutes + " minutes et " + seconds + " secondes");
	    	}
	    }
    }
    setInterval(compteur, 1000);
}


/* ------- modif fenetre < 1084px ------ */

if(window.innerWidth<1084) {
	$("#revenir").css({
		"display": "block"
	});

	$('#revenir').click(function(){
		$('#map').css({
			'display': 'block',
		}, 1000);							
		$('#formulaireReservation').css({
			'display' : 'none'
		});
	});
}