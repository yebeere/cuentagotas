/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var humedad;
var temperatura;
var viento;
var lluvia;
var fecha;
var hora;
var mensaje = new Array();
mensaje['rojo'] = 'Condiciones de Aplicaci�n NO Apropiadas';
mensaje['amarillo'] = 'Condiciones de Aplicaci�n RESTRINGIDA';
mensaje['verde'] = 'Condiciones de Aplicaci�n Apropiadas';



function llamar(url) {
    var xmlhttp = new XMLHttpRequest();
    //url = 'wap.htm';
    console.log(url);

    xmlhttp.open('GET', url, false);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.setRequestHeader('Pragma', 'no-cache');
    xmlhttp.send();
    //alert('envio'+xmlhttp.responseText);
    //document.getElementById("contenido").innerHTML = xmlhttp.responseText
    contenido = xmlhttp.responseText;

    return contenido;
}
function actualizar(color) {
    document.getElementById('semaforo').className = 'semaforo ' + color;
    document.getElementById('mensaje').innerHTML = mensaje[color] + '.';
    document.getElementById('datos').innerHTML = '(T:' + temperatura +
            '�C, H:' + humedad + '%, V:' + viento + 'km/h, pp:' + lluvia + 'mm.)';
}


function buscardatos() {

    parser(llamar('wap.htm'));
    //alert(semaforo());

    color = semaforo();

    actualizar(color);

    return true;
}

function parser(contenido) {
    ini = contenido.indexOf("T:");
    temperatura = contenido.slice(ini + 7, ini + 30);
    ini = temperatura.indexOf('</font>');
    temperatura = parseFloat(temperatura.slice(0, ini - 3));
    //alert ('Temperatura:'+temperatura);

    ini = contenido.indexOf("H:");
    humedad = contenido.slice(ini + 7, ini + 30);
    ini = humedad.indexOf('</font>');
    humedad = parseFloat(humedad.slice(0, ini - 2));
    //alert ('Humedad:'+humedad);

    ini = contenido.indexOf("V:");
    viento = contenido.slice(ini + 11, ini + 30);
    ini = viento.indexOf('</font>');
    viento = parseFloat(viento.slice(0, ini - 5));
    //alert ('Viento:'+viento);

    ini = contenido.indexOf("Lluvia:");
    lluvia = contenido.slice(ini + 12, ini + 30);
    ini = lluvia.indexOf('</font>');
    lluvia = parseFloat(lluvia.slice(0, ini - 3));
    //alert ('Lluvia:'+lluvia);
    //forzar por humedad
    //humedad=90;
}


function buscardatosHistoricos() {
    //http://anterior.inta.gov.ar/altovalle/met/downld02.txt
    parserHistorico(llamar('http://anterior.inta.gov.ar/altovalle/met/downld02.txt'));
    //alert(semaforo());
    //alert('Temperatura='+temperatura+'\n Humedad='+humedad);
    document.getElementById('main').style.display = 'block';
    document.getElementById('main').innerHTML = 'Fecha: '+fecha+'<br/>Hora: '+hora+'<br>T: ' + temperatura +
            'ºC <br/>H: ' + humedad + '%<br/>V: ' + viento + 'km/h<br/>pp: ' + lluvia + 'mm';
    //color = semaforo();

    //actualizar(color);

    return true;
}


function parserHistoricolinea(filas, numero) {
    ultimaconblancos = filas[numero].split(' ');
    //console.log(ultimaconblancos);
    //console.log(ultimaconblancos.length);
    ultima = new Array();
    for (i = 0; i < ultimaconblancos.length; i++) {
        //console.log(ultimaconblancos[i]);
        if (ultimaconblancos[i] != '') {

            ultima.push(ultimaconblancos[i]);
        }
    }
    //console.log(ultima);
    return ultima;
}






function parserHistorico(contenido) {
    filas = contenido.split('\n');
    //console.log(filas);
    //console.log(filas.length);
    if(filas.length<25){
        return true;
    }
    numerofila = filas.length - 2
    ultima = parserHistoricolinea(filas, numerofila)
    fecha=ultima[0];
    hora=ultima[1];
    temperatura = parseFloat(ultima[2]);
    humedad = parseFloat(ultima[5]);
    viento = parseFloat(ultima[10]);
    lluvia = parseFloat(ultima[17])*100;

    for (j = 1; j < 18; j++) {
        ultima = parserHistoricolinea(filas, numerofila - j);
        //console.log(ultima[17]);
        lluvia += parseFloat(ultima[17])*100;
    }

    lluvia = lluvia/100;
}






/*ini = contenido.indexOf("T:");
 temperatura = contenido.slice(ini + 7, ini + 30);
 ini = temperatura.indexOf('</font>');
 temperatura = parseFloat(temperatura.slice(0, ini - 3));
 //alert ('Temperatura:'+temperatura);
 
 ini = contenido.indexOf("H:");
 humedad = contenido.slice(ini + 7, ini + 30);
 ini = humedad.indexOf('</font>');
 humedad = parseFloat(humedad.slice(0, ini - 2));
 //alert ('Humedad:'+humedad);
 
 ini = contenido.indexOf("V:");
 viento = contenido.slice(ini + 11, ini + 30);
 ini = viento.indexOf('</font>');
 viento = parseFloat(viento.slice(0, ini - 5));
 //alert ('Viento:'+viento);
 
 ini = contenido.indexOf("Lluvia:");
 lluvia = contenido.slice(ini + 12, ini + 30);
 ini = lluvia.indexOf('</font>');
 lluvia = parseFloat(lluvia.slice(0, ini - 3));
 //alert ('Lluvia:'+lluvia);
 //forzar por humedad
 //humedad=90;
 */


/**
 * Par�metro            Verde               Amarillo            Rojo
 Viento (km/h)           v < 14,4        14,4 >= v < 18          18 =< v
 Temperatura (�C)        t < 25          25 >= t < 28 ||         28 =< t ||
                                            5< t <=10              5 > t
 Humedad (%)             35 < h < 85     30 < h =< 35 ||         h =< 30 ||
 85 =< h < 90            90 >= h
 Acumulaci�n de Agua (mm)aa < 0,2                                0,2 =< aa
 
 * 
 * @returns {undefined}
 */
function semaforo() {
    valor = 'verde';

    if (viento >= 14.4) {
        if (viento < 18) {
            valor = 'amarillo';
        } else {
            valor = 'rojo';
        }
    }

    if ((temperatura <= 10 || temperatura >= 25) && valor !== 'rojo') {
        if (temperatura <= 5 || temperatura >= 28) {
            valor = 'rojo';
        } else {
            valor = 'amarillo';
        }
    }

    if ((humedad <= 35 || humedad >= 85) && valor !== 'rojo') {
        if (humedad <= 30 || humedad >= 90) {
            valor = 'rojo';
        } else {
            valor = 'amarillo';
        }
    }

    if (lluvia >= 0.2 && valor !== 'rojo') {
        valor = 'rojo';
    }
    return valor;

}



