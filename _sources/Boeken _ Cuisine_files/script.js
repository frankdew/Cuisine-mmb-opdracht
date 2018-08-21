$(document).ready(function(){
  $('.aniview').AniView();  /* plugin aniview aanroepen door deze function call */

/************* SHOW EN HIDE HAMBURGER-MENU menu **************/  
  /* Bars van het hamburger-menu */
	$("nav .toggle").append('<div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>');

	$(".toggle").on("click", function(){ /* show- hide (toggle-slide) mobile menu */
			$("#menu").slideToggle(600);
	});

/************************** SEARCHBAR **********************/

  var $search = $("#search");  /* init */
  /* search bar in html plaatsen */
  $($search).append('<input type="text" id="searchBar" placeholder="Search.." name="search"><button id="searchIcon" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>');
  
  var searchIcon = document.getElementById("searchIcon"); /* init */

  if(!searchIcon) return false; /* geen searchIcon(id) van niet verder gaan */

  searchIcon.addEventListener("click", function(e){ /* melding, bij zoekopdracht, aan de user */
    e.preventDefault();
    alert("Helaas is de zoekfunctie van de site op het moment niet beschikbaar.");
  });
  
/*************** FOOTER ACCORDION IN MOBILE MENU ***********/
/************************ Init *****************************/
$('#accordion').append('<h3>Contact</h3><div><p>&#x260F;: 072 128 96 73</p><p>E-mail: info@cuisine-uitgeverij.com</p><p>Adres: Landstraat 110</p><p>1814 BC ALKMAAR</p></div><h3>Over ons</h3><div><p>Cuisine heeft een groot assortiment aan kookboeken, kook-workshops en live kook-webinars. Voor al uw prive of zakelijke aanvragen kunt u bij ons terecht, wij zijn u graag van dienst.</p></div>')

	$( function() {    /* De accordion van jQuery UI */
  $( "#accordion" ).accordion({
    	event: "click",  
      active: false,
      collapsible: true,
      heightStyle: "content"
    });
  });

/*********** IMAGE SWAP OP DE HOME BUTTON BIJ DE SUB-PAGINA'S **********/
  var imgPath = "../images/"; // Mapnaam waarin mijn images zitten.
  var imagesList = ["home.svg", "home-hover.svg", "home-click.svg"]; // de afbeeldingen.
  var preloadedImages = []; // Hier komen de nieuwe gepreloade images in.
  
  if(document.getElementById("thuis")){ // Is #thuis aanwezig? (object sniffing)
    var thuis = document.getElementById("thuis");
    
    function preloadImages(){
      for(var i=0; i<imagesList.length; i++){ // Door de imagesLijst. 
        preloadedImages[i] = new Image(); // Image constructor.
        preloadedImages[i].src = imgPath + imagesList[i];
      }
    }
    
    function swapImage(imgObject, srcPlaatje){
      imgObject.src = imgPath + srcPlaatje;
    }

    preloadImages();
    
    thuis.addEventListener('mouseover', function(){ /* bij 'mouseover' image 'home-hover.svg' */
      swapImage(this, "home-hover.svg");
    }, false);

      thuis.addEventListener("click", function(){ /* bij 'click' image 'home-hover.svg' */
      swapImage(this, "home-click.svg");
    }, false); 

    thuis.addEventListener("mouseout", function(){ /* bij 'mouseout' image 'home-hover.svg' */
      swapImage(this, "home.svg");
    }, false);  
  }

/****************** SLIDE-SHOW HOME PAGINA *********************/
  $("#homeBody").css({  /* verbergen van de horizontale scrollbar die de carousel krijgt */
    'overflow-y': 'scroll',
    'overflow-x': 'hidden'
  });

  jQuery("#theTarget").skippr({  /* skippr function call met de meegegeven extra opties  */

            transition: 'slide',  /* andere optie is fade, slide is hier beter */
            speed: 1500,    /* snelheid waarmee de 'images' wisselen */
            easing: 'easeOutQuart',  /* hier zijn ook de UI easings mogelijk */
            navType: 'block',  /* andere optie is 'bubbles', rondjes pagination */
            childrenElementType: 'div',
            arrows: true,
            autoPlay: false,
            autoPlayDuration: 5000,
            keyboardOnAlways: true,
            hidePrevious: false

        });

/*********** ASIDE FILTER EN CARDS VOOR DE BOEKEN PAGINA **********/
/******************************** Init ****************************/
  if(typeof boekObject == "undefined") return false; /* is boekOject typeof undefined? Dan niet verder gaan */
  if(!boekObject.boeken.length > 0) return false; /* Is de lengte van de items niet groter van 0? Dan niet verder gaan */


  $("#geenJs p").hide();  /* Fallback voor gebruiker zonder js geactiveerd verbergen */
  $("#geenJs p").after('<div id="boekenWrapper"></div>');  /* Initialiseren plek voor de cards */

  $asideMenu = "<aside>"; /* Filter opbouwen voor de boeken aan de zijkant/aside */
  $asideMenu += '<form><fieldset><legend>Filter</legend><div><label id="filterSchrijver">Schrijver</label></div>';
    $asideMenu += '<div>';
      $asideMenu += '<label>Beoordeling</label>';
      $asideMenu += '<div><input type="checkbox" name="b-sort" value="1" checked> 1 ster</div>';
      $asideMenu += '<div><input type="checkbox" name="b-sort" value="2" checked> 2 sterren</div>';
      $asideMenu += '<div><input type="checkbox" name="b-sort" value="3" checked> 3 sterren</div>';
      $asideMenu += '<div><input type="checkbox" name="b-sort" value="4" checked> 4 sterren</div>';
      $asideMenu += '<div><input type="checkbox" name="b-sort" value="5" checked> 5 sterren</div>';
    $asideMenu += '</div>';
  $asideMenu += '</fieldset></form></aside>';
  $("#boeken").append($asideMenu);  /* opgebouwde aside toevoegen aan html op de plaats van  id boeken */

  var boekenHoeveelheid = boekObject.boeken.length; /* hoeveel boeken zijn er, hoe groot array */
  var schrijvers = []; /* lege array om te vullen met de 'onderwerp' data */
  
  // Alle boeken neerzetten
  for(var i=0; i<boekenHoeveelheid; i++){  
    var string, url, id, title, img, description, beoordeling; /* initialiseren van de benodogde variables */
    

    url = boekObject.boeken[i].title.toLowerCase(); /* de title uit de database omzetten naar url */

    /* Schrijvers opslaan */
    var schrijverVinden = boekObject.boeken[i].schrijver;
    if(schrijvers.indexOf(schrijverVinden) == -1){ // Als het -1 is: dan kunnen we 'schrijverVinden' string niet vinden in de schrijvers array.
      schrijvers.push(schrijverVinden);
    }

    var verkorteTitel = boekObject.boeken[i].title; /* titels opzoeken */
    if(verkorteTitel.length > 40){  /* titel groter dan 40 karakters? */
      verkorteTitel = verkorteTitel.substring(0, 40) + "..."; /* Bij 40 karakters stoppen en ... */
    }

    var verkorteDescription = boekObject.boeken[i].description; /* omschrijvingen opzoeken */
    if(verkorteDescription.length > 85){ /* meer dan 100 karakters? */
      verkorteDescription = verkorteDescription.substring(0,85) + "..."; /* dan afkappen bij 85 */
    }

    /* opbouwen van de 'cards' */
    var card = '<a data-beoordeling="' + boekObject.boeken[i].beoordeling + '" data-schrijver="' + boekObject.boeken[i].schrijver + '" data-beoordeling-flag="1" data-schrijver-flag="1" href=' + boekObject.boeken[i].url + '.html'  + '>';
      card += '<h2>' + boekObject.boeken[i].title + '</h2>';
      card += '<img src="../images/' + boekObject.boeken[i].image + '" alt="">';
      card += '<p>' + verkorteDescription + '</p>';
      card += '<div class="beoordeling" aria-hidden="true">';        
      for(var j=0; j<5; j++){
        if(parseInt(boekObject.boeken[i].beoordeling) > j){
          card += '<span class="fa fa-star"></span>'; 
        } else {
          card += '<span class="fa fa-star-o"></span>'; 
        }
      }                               
      card += '</div>';
    card += '</a>';
    $("#boekenWrapper").append(card);
  } // Einde cards maken
  
  var checkboxes = "";
  for(schrijver of schrijvers){
    checkboxes += '<div><input type="checkbox" checked name="s-sort" value="' + schrijver + '">' + schrijver + '</div>';  
  }
  $("#filterSchrijver").after(checkboxes);
  
/******************************** Events ****************************/
  $("aside input:checkbox").click(function(){
    var checkbox = $(this);

    $("#boekenWrapper a").each(function(){
      if($(this).attr("data-beoordeling") == checkbox.val() && checkbox.is(":checked")){ 
        $(this).attr("data-beoordeling-flag", "1");
      } else if($(this).attr("data-beoordeling") == checkbox.val() && !checkbox.is(":checked")){
        $(this).attr("data-beoordeling-flag", "0");
      } else if($(this).attr("data-schrijver") == checkbox.val() && checkbox.is(":checked")){ 
        $(this).attr("data-schrijver-flag", "1");
      } else if($(this).attr("data-schrijver") == checkbox.val() && !checkbox.is(":checked")){
        $(this).attr("data-schrijver-flag", "0");
      }
      if($(this).attr("data-beoordeling-flag") == "0" || $(this).attr("data-schrijver-flag") == "0"){
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }); 


/***************** FOOTER ONDER AAN DE PAGINA ****************/
  // var docHeight = $(window).height();  /* footer onder aan de pagina laten ongeacht hoogte footer */
  // var footerPart = $("#footer");
  // var footerHeight = $(footerPart).height();
  // var footerTop = $(footerPart).position().top + footerHeight;

  //  if (footerTop < docHeight) {
  //   $(footerPart).css('margin-top', 10+ (docHeight - footerTop) + 'px');
  //  }
/******* TITEL-NAAM (van de pagina) IN ORANJE KLEUR ***********/
   var naam = $(".naam");
   $(naam).animate({ /* kleur van eerste woord ()'Cuisine') veranderen */
      "color"         : "rgba(234,161,26, 1)",
   }, 1500);  /* kleur met 'duration' veranderen */

   var titel = $(".paginatitel");
   $(titel).animate({ 
      "backgroundColor"   : "rgba(255,255,255, 0.5)", /* achtergrondkleur met 'duration' veranderen */
   }, 1300);

/*********************** TO TOP BUTTON *************************/
  $(window).scroll(function(){  /* wanneer er gescrold word  */
    $("#omhoogPijl").hide();    /* verberg de terug naar boven knop */
    if($(this).scrollTop() > 100){ /* Voorbij de 100px gescrold.. */
      $("#omhoogPijl").show();    /* laat erug naar boven knop zien */
    }else{
      $("#omhoogPijl").hide();  /* Anders verbergen */
    }
  });

  $("#omhoogPijl").on("click", function(){  /* Bij klik op pijl */
    $('html, body').animate({  /* animeer scroll naar boven */
      scrollTop: 0
    },500);   /* met een duration van 500 */
  });

/*********************** TO TOP BUTTON *************************/
/* Optie om animatie te verbergen */
  var canvasAnimatie = $("#animation_container");
  $(canvasAnimatie).on("click", function(){
    $(canvasAnimatie).hide();
  });


});


