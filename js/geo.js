/* 
 * Cinco saltos  			Latitud: -38.845 Longitud: -68.069   	Altura :282     http://anterior.inta.gov.ar/altovalle/cincosaltos/downld02.txt
 * Contralmirante Guerrico		Latitud: -39.017 Longitud: -67.667	Altura: 242Mts  http://anterior.inta.gov.ar/altovalle/met/downld02.txt
 * Picún Leufú                          Latitud: -39.536 Longitud: -69.298	Altura: 393Mts  http://anterior.inta.gov.ar/altovalle/picunleufu/downld02.txt
 * Coronel Belisle			Latitud: -39.197 Longitud: -65.894	Altura: 128Mts  http://anterior.inta.gov.ar/altovalle/belisle/downld02.txt
 * Luís Beltrán                         Latitud: -39.317 Longitud: -65.75	Altura: 128Mts  http://anterior.inta.gov.ar/altovalle/lube/downld02.txt
 * Pomona				Latitud: -39.478 Longitud: -65.653	Altura: 127Mts  http://anterior.inta.gov.ar/altovalle/pomona/downld08.txt
 * Villa Regina                         Latitud: -39.126 Longitud: -67.106	Altura: 158Mts  http://anterior.inta.gov.ar/altovalle/regina/downld02.txt
 *NA  C. A. Cordero			Latitud: -38.74  Longitud: -68.11	Altura: 297Mts
 * San Patricio del Chañar		Latitud: -38.57  Longitud: -68.36	Altura: 334Mts  http://anterior.inta.gov.ar/altovalle/sanpatricio/downld02.txt
 */
var ema= new Array(7);
for (var i = 0; i < 7; i++) {
    ema[i] = new Array(6);
}
   ema[0][0] ='Cinco Saltos';
   ema[0][1] =-38.845;
   ema[0][2] =-68.069;
   ema[0][3] =282;
   ema[0][4] ='http://anterior.inta.gov.ar/altovalle/cincosaltos/downld02.txt';
   
   ema[1][0] ='Cnte Guerrico';
   ema[1][1] =-39.026;
   ema[1][2] =-67.737;
   ema[1][3] =242;
   ema[1][4] ='http://anterior.inta.gov.ar/altovalle/met/downld02.txt';
   
   ema[2][0] ='Picún Leufú  ';
   ema[2][1] =-39.536;
   ema[2][2] =-69.298;
   ema[2][3] =393;
   ema[2][4] ='http://anterior.inta.gov.ar/altovalle/picunleufu/downld02.txt';

   ema[3][0] ='Cnel. Belisle';
   ema[3][1] =-39.197;
   ema[3][2] =-65.894;
   ema[3][3] =128;
   ema[3][4] ='http://anterior.inta.gov.ar/altovalle/belisle/downld02.txt';
   
   ema[4][0] ='Pomona';
   ema[4][1] =-39.478;
   ema[4][2] =-65.653;
   ema[4][3] =127;
   ema[4][4] ='http://anterior.inta.gov.ar/altovalle/pomona/downld08.txt';
   
   ema[5][0] ='Villa Regina';
   ema[5][1] =-39.126;
   ema[5][2] =-67.106;
   ema[5][3] =158;
   ema[5][4] ='http://anterior.inta.gov.ar/altovalle/regina/downld02.txt';   
 
   ema[6][0] ='San P.Chañar';
   ema[6][1] =-38.57;
   ema[6][2] =-68.36;
   ema[6][3] =334;
   ema[6][4] ='http://anterior.inta.gov.ar/altovalle/sanpatricio/downld02.txt';
  

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
//	if (d>1) return Math.round(d)+"km";
//	else if (d<=1) return Math.round(d*1000)+"m";
	return d;
}
var menorDistancia= new Array(7);
function ordenGPS(position){
       // calculo la distancia de c/u de las EMA y lo guardo en MenorDistancia
       for (var i = 0; i < 7; i++) {
                //
                ema[i][5] = distance(ema[i][1],ema[i][2],-38.57,-68.36);
                //ema[i][5] = distance(ema[i][1],ema[i][2],position.coords.latitude,position.coords.longitude);
       }
        ema.sort(function(a,b) {
                            return a[5]- b[5];
                });
//       for (var i = 0; i < 7; i++) {         
//         $("<option value='"+(i+1)+"'>"+ema[i][0]+"</option>").appendTo("#esta"); 
//       }
       //$("#esta option[value=1]").attr("selected",true);

       document.getElementById('estaciones').innerHTML = ema;         
}

    

  var onSuccessGPS = function(position) {
               //   var distancia=distance(ema[1][1],ema[1][2],position.coords.latitude,position.coords.longitude)
//                    alert('Latitude: ' + position.coords.latitude + '\n' +
//                    'Longitude: ' + position.coords.longitude + '\n'+
//                    'Distancia: '+distancia+' km \n') ;
                    document.getElementById('gps').className = 'estado ok';
                    for (var i = 0; i < 7; i++) {
                        // ema[i][5] = distance(ema[i][1],ema[i][2],-38.57,-68.36);
                        ema[i][5] = distance(ema[i][1],ema[i][2],position.coords.latitude,position.coords.longitude);
                    }
                    ema.sort(function(a,b) {
                                        return a[5]- b[5];
                            });
                  // document.getElementById('estaciones').innerHTML = ema;  
                  // document.getElementById('resul').innerHTML = 'lat:'+position.coords.latitude+'<br/>Long:'+position.coords.longitude;
                  
                   for (var i = 0; i < 7; i++) { 
                       var j=i;
                      $("<option value='"+j+"'>"+ema[i][0]+"(Dist:"+ema[i][5] +" km) </option>").appendTo("#select-choice-a");
                      var myselect = $("#select-choice-a");
                      myselect.selectmenu('refresh');
                    }
                   $("#esta option[value=0]").attr("selected",true);
                   var myselect = $("#select-choice-a");
                    myselect.selectmenu('refresh');

//                    select = document.getElementById('select-choice-a');
//                    for (var i = 0; i<=7; i++){
//                        var opt = document.createElement('option');
//                        opt.value = i+2;
//                        opt.innerHTML = ema[i][0];
//                        select.appendChild(opt);
//                    }


    }
            // onError Callback receives a PositionError object
            //
    function onErrorGPS(error) {
//                        alert('code: ' + error.code + '\n' +
//                        'message: ' + error.message + '\n');
                         document.getElementById('gps').className = 'estado no';
                         //document.getElementById('estaciones').innerHTML = ema;
                        select = document.getElementById('esta');

                     for (var i = 0; i < 7; i++) { 
                       var j=i;
                      $("<option value='"+j+"'>"+ema[i][0]+"(Dist:"+round(ema[i][5]) +" km) </option>").appendTo("#select-choice-a");
                      var myselect = $("#select-choice-a");
                      myselect.selectmenu('refresh');
                    }
                   $("#esta option[value=0]").attr("selected",true);
                   var myselect = $("#select-choice-a");
                    myselect.selectmenu('refresh');
    }
    
