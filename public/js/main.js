
$("document").ready(function(){
	
//Materialize Modal Initializieren
//Alle Elemente mit dem Attribut class "modal-trigger" werden durch einen Klick ein Element mit dem Id "modalZahlen" zeigen.
let options = {endingTop: "25%",opacity: 0.0};
$('.modal').modal(options);
$('.sidenav').sidenav();
let options2 = {coverTrigger: false, hover: false};
$('.dropdown-trigger').dropdown(options2);

	
//Sudoku Tafel erzeugen	
//Eine Zeichenkette wird mit <tr> und <td> Elemente erstellt und danach zurückgegeben. 
//Je <td> Element hat durch die Attribute class und href, die Funktionalität um ein Modal Element anzurufen.
//Je nachdem wird die relative Position der <td> Elemente in der Tabelle verwendet um die richtige Styling 
//der Sudoku Tafel bzw. Soduku Blöcke hinzufügen.
function spielbrettGenerieren(){
	let spielbrettHtml = [];
	for (i=0; i<9; i++){
		spielbrettHtml.push("<tr>");
		for(ii=0; ii<9; ii++){			
			if((((ii+1)%3)!=0) && (((i+1)%3) != 0)){
				spielbrettHtml[i] += '<td class="modal-trigger" ></td>';
			} else if ((((i+1)%3) == 0) && (((ii+1)%3) == 0)){
				spielbrettHtml[i] += '<td style="border-right: 2px solid black;border-bottom: 2px solid black"></td>';
			} else if (((i+1)%3) == 0){
				spielbrettHtml[i] += '<td  style="border-bottom: 2px solid black"></td>';
			} else {
				spielbrettHtml[i] += '<td  style="border-right: 2px solid black"></td>';
			}
		}
		spielbrettHtml[i] += "</tr>";	
	}
	return spielbrettHtml.join("");
}

//Ein Spiel Muster wird mit Positionen und Zahlen übergegeben.
//Je Zahl wird zu eine bestimmte <td> Element hizugefügt.
function spielbrettAusfuellen(bestimmteZahlen){
	let spielbrettZellen = [];
	$("td").each(function(){
		spielbrettZellen.push($(this));
	});
	for (i=0; i<81; i++){
		spielbrettZellen[i][0].innerText = "";
	}		  
	for (eigenschaft in bestimmteZahlen){
		spielbrettZellen[eigenschaft][0].innerText = bestimmteZahlen[eigenschaft];
		zelleAusgefuellt++;
	}
	console.log(zelleAusgefuellt);
} 


let spielMuster1 = {
	"0": 1,	"4": 8,	"5": 5,	"6": 4, 	"7": 9,	"12": 1,	"15": 3,	"16": 7,	"18": 8,	"19": 6,
	"21": 3,	"23": 4, 	"27": 9,	"33": 7,	"34": 5,	"36": 5,	"37": 8,	"43": 6,	"44": 9,
	"46": 7,	"47": 1,	"53": 4,	"57": 9,	"59": 6,	"61": 4,	"62": 5,	"64": 2,	"65": 4,
	"68": 3,	"73": 5,	"74": 9,	"75": 2,	"76": 4,	"80": 3	
};

let spielMuster2 = {
	'0':"4",	'1':"1",	'4':"6",	'5':"5",	'8':"7",	'11':"6",	'14':"7",	'15':"4",	'16':"8",
	'18':"2",	'20':"7",	'21':"4",	'22':"9",	'26':"6",	'28':"6",	'31':"7",	'33':"1",	'36':"3",
	'38':"1",	'39':"5",	'43':"7",	'44':"2",	'46':"9",	'49':"4",	'50':"2",	'51':"3",	'53':"8",
	'54':"1",	'56':"8",	'57':"6",	'61':"2",	'62':"9",	'64':"2",	'67':"1",	'68':"8",	'69':"6",
	'70':"4",	'72':"6",	'75':"3",	'79':"1"
};

var spielMuster3 = {
	'0':"4",	'7':"8",	'8':"2",	'11':"9",	'12':"4",	'14':"8",	'18':"7",	'23':"5",	'29':"6",
	'30':"3",	'31':"7",	'33':"8",	'37':"3",	'43':"4",	'44':"7",	'46':"9",	'48':"1",	'50':"4",
	'54':"6",	'56':"3",	'60':"5",	'62':"8",	'63':"1",	'68':"3",	'70':"7",	'76':"2"
};

let spielMuster1Loesung = {
	"1":	3,	"2":	2,	"3":	7,	"8":	6,	"9":	4,	"10":	9,	"11":	5,	"13":	6,	"14":	2,
	"17":	8,	"20":	7,	"22":	9,	"24":	5,	"25":	2,	"26":	1,	"28":	4,	"29":	6,	"30":	8,
	"31":	3,	"32":	1,	"35":	2,	"38":	3,	"39":	4,	"40":	2,	"41":	7,	"42":	1,	"45":	2,
	"48":	6,	"49":	5,	"50":	9,	"51":	8,	"52":	3,	"54":	3,	"55":	1,	"56":	8,	"58":	7,
	"60":	2,	"63":	6,	"66":	5,	"67":	1,	"69":	9,	"70":	8,	"71":	7,	"72":	7,	"77":	8,
	"78":	6,	"79":	1
};

let spielMuster2Loesung = {
	'2':"3",	'3':"8",	'6':"2",	'7':"9",	'9':"9",	'10':"5",	'12':"2",	'13':"3",	'17':"1",
	'19':"8",	'24':"5",	'25':"3",	'27':"8",	'29':"2",	'30':"9",	'32':"3",	'34':"5",	'35':"4",
	'37':"4",	'40':"8",	'41':"6",	'42':"9",	'45':"7",	'47':"5",	'48':"1",	'52':"6",	'55':"3",
	'58':"5",	'59':"4",	'60':"7",	'63':"5",	'65':"9",	'66':"7",	'71':"3",	'73':"7",	'74':"4",
	'76':"2",	'77':"9",	'78':"8",	'80':"5"
};

let spielMuster3Loesung = {
	'1':"6",	'2':"5",	'3':"7",	'4':"1",	'5':"9",	'6':"3",	'9':"3",	'10':"2",	'13':"6",
	'15':"7",	'16':"1",	'17':"5",	'19':"1",	'20':"8",	'21':"2",	'22':"3",	'24':"9",	'25':"6",
	'26':"4",	'27':"5",	'28':"4",	'32':"2",	'34':"9",	'35':"1",	'36':"8",	'38':"1",	'39':"5",
	'40':"9",	'41':"6",	'42':"2",	'45':"2",	'47':"7",	'49':"8",	'51':"6",	'52':"5",	'53':"3",
	'55':"7",	'57':"9",	'58':"4",	'59':"1",	'61':"2",	'64':"8",	'65':"2",	'66':"6",	'67':"5",
	'69':"4",	'71':"9",	'72':"9",	'73':"5",	'74':"4",	'75':"8",	'77':"7",	'78':"1",	'79':"3",
	'80':"6"
};



function zeitZeigen(){
	let minuten;
	let sekunden;
	let zeitJetzt;
  
  zeitJetzt = new Date();
  zeitJetzt = zeitJetzt.getTime() - startZeit.getTime();
  zeitJetzt = new Date(zeitJetzt);
  minuten = zeitJetzt.getMinutes();
  sekunden = zeitJetzt.getSeconds();
  document.getElementById("timer").innerText = "Laufzeit: 00:"+
											  (minuten<10 ? "0"+minuten : minuten) 
											  +":"+  
											  (sekunden<10 ? "0"+sekunden : sekunden);
} 



function spielStarten(){
	startZeit = new Date();
	stopuhr = window.setInterval(zeitZeigen, 1000);
	zelleAusgefuellt = 0;
	aktuellZelle = "";
	  switch (spielSchwierigkeit){
		case "Einfach": 
			spielbrettAusfuellen(spielMuster1);
			break;
		case "Normal":
			spielbrettAusfuellen(spielMuster2);
			break;
		case "Schwer":
			spielbrettAusfuellen(spielMuster3);
			break;
		default: 
			spielbrettAusfuellen(spielMuster1);
			$("#schwirigkeit").html('<i class="material-icons right">arrow_drop_down</i>Einfach');
			spielSchwierigkeit = "Einfach";
			console.log("entrou no lugar errado");
	} 
	
	$("td").each(function(){
		if ( $(this).text() == "" ){			
			$(this).attr("href","#modalZahlen");
			$(this).attr("class","modal-trigger");
			$(this).on("click", function(e){
				aktuellZelle = e.currentTarget;	
			});			
		}		
	});
	
	
	
	$(".zahl").on("click", function(e){
				if(aktuellZelle.innerText == ""){
					zelleAusgefuellt++;
					console.log(zelleAusgefuellt);
				}
				aktuellZelle.innerText = e.currentTarget.innerText;
				aktuellZelle.style.fontWeight = "bold";
				aktuellZelle.style.fontSize = "25px";
				$('#modalZahlen').modal('close');				
				if(zelleAusgefuellt == 81){
					spielendValidieren();
				}
	});
	
	$("#loeschen").on("click", function(){		
		if(aktuellZelle.innerText != ""){
			zelleAusgefuellt--;	
		}	
		letztZelle = aktuellZelle;					
		aktuellZelle.innerText = "";		
		console.log(zelleAusgefuellt);
	});												 
	
	$("#sudokuBrett").css("cursor","pointer");
	$("#starten").css("display", "none");
	$("#schwirigkeit").attr("disabled", "true");
	$("#neustarten").css("display", "normal");
}

//Spiel Validieren
function spielendValidieren(){
	
	let temp = [];
	let alleTds = [];
	$("td").each(function(i){
		temp.push($(this));	
		alleTds[i] = temp[i][0].innerText;
	});
	
	//Zeile vorbereitung
	temp = [];
	var alleZeile = [];
	for(let i=0; i<9; i++){
		for(u=0; u<9; u++){
			temp[u] = alleTds.shift();
		}
		alleZeile.push(temp);
		temp = [];
	}
	
	//Spalten vorbereitung
	temp = [];
	var alleSpalten = [];
	for(let i=0; i<9; i++){
		for(u=0; u<9; u++){
			temp[u] = alleZeile[u][i];
		}
		alleSpalten.push(temp);
		temp = [];
	}
	
	//Block vorbereitung	
	let temp1 = [];
	let alleBlocken = [];
	let blockIndex2 = 0;
	let blockIndex = 0;
	for(a=0; a<3; a++){
		for(b=0; b<3; b++){
			for(c=(0+blockIndex2+a); c<(3+blockIndex2+a); c++) {
				for(d=(0+blockIndex+b); d<(3+blockIndex+b); d++) {
					
					temp1.push(alleZeile[c][d]);
				}
			}
			alleBlocken.push(temp1);
			temp1 = [];	
			blockIndex += 2;	
		}	
		blockIndex = 0;
		blockIndex2	+= 2;		
	} 
	
	
	
	let valZ = [];
	valZ = validierungElementErzeugen(alleZeile, "Zeile");	
	
	let valS = [];
	valS = validierungElementErzeugen(alleSpalten, "Spalten");	
	
	let valB = [];
	valB = validierungElementErzeugen(alleBlocken, "Block");	
	
	spielEndCheck(valZ, valS, valB);	
};

//Die Funktion nimmt ein Array mit <td> Elemente entgegen und prüft, ob es hinein kein Element mit gleichem Wert gibt.
//Falls nein wird den Boolean Wert false zurückgegeben. Sonst wird true zurückgegeben.  
function sudokuElementChecken(sudokuElement){
		for (i=0; i<sudokuElement.length; i++){		
			 for(u=(i+1); u<sudokuElement.length; u++){
				if (sudokuElement[i] == sudokuElement[u]){
					return false;
				}
			} 
		}
		return true;
};

//Die Funktion nimmt eine Liste von Arrays entgegen, die die Zeile, Spalten oder Blöcke des Sudoku Tafels darstellen.
//Je Array dieser List wird geprüft/gecheckt und zu der validierungElement Array hinzugefügt.
//Letztlich wird das Array zurückgegeben.
//PS: elementArt wird nur als hilfmittel des console.logs benutzt.
function validierungElementErzeugen(elementeListe, elementArt){
	let validierungElement = [];
	for (let z=0; z<9; z++){	
		validierungElement.push(sudokuElementChecken(elementeListe[z]));
		console.log(elementArt+" "+(z+1)+" ist "+validierungElement[z]);
		
	}
	return validierungElement;
}



//
function spielEndCheck(valZ, valS, valB){
	let meldungH4 = "Gratulieren! Sie haben das Spiel gewonen!";
	let meldungP = "Ihre Ergebnis gehört jetzt zu der Rangliste.\n Sie haben zum Lösen des Sudokus ";
	+document.getElementById("timer").innerText.substr(10)+" benötigt";
	for(let x = 0; x<9; x++){
		if ((valZ[x] == false) || (valS[x] == false) || (valB[x] == false)){
			meldungH4 = "Leider ist Ihre Lösung nicht korrekt.";
			meldungP = "Bitte versuchen Sie es noch einmal.";
		}
	}
	if (meldungP != "Bitte versuchen Sie es noch einmal."){
		$("#inputfieldEreignis").append('<input id="nameSpieler" type="text">');
		$("#inputfieldEreignis").append('<label for="nameSpieler">Name</label>');
		$("#modalSpielEreignis").append('<div class="modal-footer teal lighten-2 white-text"><a id="modalSpielEreignisButton" href="#!" class="modal-action modal-close waves-effect white teal-text waves-blue btn-flat">OK</a></div>');
		$("#modalSpielEreignisButton").on("click", function(){
			let nameSpieler = $("#nameSpieler").val();
			let laufzeit = document.getElementById("timer").innerText.substr(10);
			let schwirigkeitgrad = spielSchwierigkeit;
			$.post('/ranglisteDBPost',JSON.stringify({"name": nameSpieler, "zeit": laufzeit, "schwierigkeit": schwirigkeitgrad }),"json");
			$("td").each(function(){			
				$(this).removeAttr("href");
				$(this).removeClass("modal-trigger");	
				$(this).css("fontWeight", "normal");
				$(this).css("fontSize", "22px");	
			});
		});
	}
	
	let options = {
		onOpenStart: function(){
			console.log(meldungH4);
			$("#modalSpielEreignisH4").text(meldungH4);
			$("#modalSpielEreignisP").text(meldungP);
			window.clearInterval(stopuhr);
		},
		endingTop: "30%",
	
	};
	$('.modal').modal("destroy");
	let optio = {endingTop: "25%",opacity: 0.0};
	$('.modal').modal(optio);
	$("#modalSpielEreignis").modal(options);
	$("#modalSpielEreignis").modal("open");
};



var aktuellZelle = "";
var startZeit;
var stopuhr;
var zelleAusgefuellt = 0;
var spielSchwierigkeit = "";									   


$("#schwirigkeit").attr("disabled", "true");
$("#sudokuBrett").append(spielbrettGenerieren());
spielbrettAusfuellen(spielMuster1);
$("#schwierigkeitdropdown li").on("click", function(e){
	spielSchwierigkeit = "";
	spielSchwierigkeit = e.currentTarget.textContent;
	console.log(spielSchwierigkeit.length+spielSchwierigkeit);
	$("#schwirigkeit").html('<i class="material-icons right">arrow_drop_down</i>'+spielSchwierigkeit);
});

$("#starten").on("click", function(){
	spielStarten();
	$("#neustarten").css("display", "inline");
});
$("#neustarten").on("click", function(){
	$("#neustarten").css("display", "none");
	$("#starten").css("display", "inline");
	$("#schwirigkeit").removeAttr("disabled");
	$("#schwirigkeit").html('<i class="material-icons right">arrow_drop_down</i>Schwierigkeit');
	$("td").each(function(){			
			$(this).removeAttr("href");
			$(this).removeClass("modal-trigger");	
			$(this).css("fontWeight", "normal");
			$(this).css("fontSize", "22px");	
	});
	window.clearInterval(stopuhr);
	document.getElementById("timer").innerText = "Laufzeit: 00:00:00";
});

$("#schwirigkeit").removeAttr("disabled");
}); //Document Ready
