var ipValue;
var socket;
var reintentos = 0;

var JG_H = 0, JG_T = 0, JG_BMP = 0, JG_HCHO = -0.1, JG_CO2 = 0, JG_CO = 100;
var gage, gaugeT, gaugeBMP, gaugeHCHO, gaugeCO2, gaugeCO;

/*No mostrar lecturas erroneas */
var nanT, nanH, nanPPM, nanAvr, nanBMP;

var socket = io();
					

  socket.on('connection', function(){
	console.log("Conectado");
	
	//Materialize.toast('Connected!', 800);
	$("#wifiStatus").html("ONLINE");
	$("#wifiStatus").css("color","green");
	
	$('#barProg').hide();
	
	reintentos = 0;
	//Materialize.toast('Reset reinterntos: ' + reintentos, 800);
  }); 
  
  socket.on('disconnect', function(){
	console.log("Desonectado");
	Materialize.toast('Disconnected from server', 800);
	$("#wifiStatus").html("OFFLINE");
	$("#wifiStatus").css("color","red");
	
	$('#barProg').hide();
	
	reintentos++;
	console.log("reintentando conexion: " + reintentos);
	
	if( reintentos <= 10){
		//mod();
	}else{
		console.log("10 reintentos fallidos");
	}
  });

 /* function onClose(evt)
  {
	console.log("Desonectado");
	Materialize.toast('Disconnected from server', 800);
	$("#wifiStatus").html("OFFLINE");
	$("#wifiStatus").css("color","red");
	
	$('#barProg').hide();
	
	reintentos++;
	console.log("reintentando conexion: " + reintentos);
	
	if( reintentos <= 10){
		mod();
	}else{
		console.log("10 reintentos fallidos");
	}
  }; */

  
	socket.on('switch', function(data){
		if(data.cmd == '0'){
			document.getElementById(data.id).checked = false;
			console.log("ID: " + data.id);
			console.log("CMD: " + data.cmd);
		}
		if(data.cmd == '1'){
			document.getElementById(data.id).checked = true;
			console.log("ID: " + data.id);
			console.log("CMD: " + data.cmd);
		}
	});
	
	socket.on('BMP', function(data){
			document.getElementById('valTempDHT').innerHTML = data.T;
			document.getElementById('valPatm').innerHTML = data.P;
			
			console.log("Temperatura: " + data.T + " *C");
			console.log("Presion Atm.: " + data.P + " hPa");
	});
	
	socket.on('clima_Af', function(data){			
		var rJSON = JSON.parse(data);
		console.log("Recive: " + rJSON.evento);
	});
	
	socket.on('clima_Aqui', function(data){			
		var rJSON = JSON.parse(data);
		console.log("Recive: " + rJSON.evento);
	});
	
	socket.on('clima_LivingRoom', function(data){			
		var rJSON = JSON.parse(data);
		console.log("Recive: " + rJSON.evento);
	});
	
	socket.on('BME', function(data){
			document.getElementById('valTempDHT').innerHTML = Number(data.T).toFixed(1);
			document.getElementById('valHumDHT').innerHTML = Number(data.H).toFixed(1);
			document.getElementById('valPatm').innerHTML = Number(data.P).toFixed(0);
			
			console.log("Temperatura: " + data.T + " *C");
			console.log("Humedad: " + data.H + " %");	
			console.log("Presion Atm.: " + data.P + " hPa");
	});
	
	socket.on('USB', function(data){
			/** Actualiza tablas **/
			document.getElementById('valTempDHT').innerHTML = Number(data.T).toFixed(1);
			document.getElementById('valHumDHT').innerHTML = Number(data.H).toFixed(1);
			document.getElementById('valPatm').innerHTML = Number(data.P).toFixed(0);
			
			/** Actualiza Gauges **/
			JG_T = Number(data.T).toFixed(0);
			gaugeT.refresh(JG_T);
			JG_H = Number(data.H).toFixed(0);
		    gage.refresh(JG_H);
			JG_BMP = Number(data.P).toFixed(0);
			gaugeBMP.refresh(JG_BMP);
			
			
			/** Imprime en Consola **/
			console.log("Temperatura: " + data.T + " *C");
			console.log("Humedad: " + data.H + " %");	
			console.log("Presion Atm.: " + data.P + " hPa");
	});
	
	socket.on('HAUS', function(data){
			document.getElementById('valTempDHT').innerHTML = Number(data.T).toFixed(1);
			document.getElementById('valHumDHT').innerHTML = Number(data.H).toFixed(1);
			document.getElementById('valPatm').innerHTML = Number(data.P).toFixed(0);
			
			document.getElementById('val_mgHCHO').innerHTML = Number(data.HCHO).toFixed(3);
			document.getElementById('val_ppmHCHO').innerHTML = Number(data.HCHO_ppm).toFixed(3);
			
			document.getElementById('val_CO2ppm').innerHTML = Number(data.CO2).toFixed(0);
			document.getElementById('val_CO2').innerHTML = Number((data.CO2)/10000).toFixed(3);
			
			document.getElementById('CO_ppm').innerHTML = Number((data.CO)).toFixed(0);
			
			/** Actualiza Gauges **/
			JG_T = Number(data.T).toFixed(1);
			gaugeT.refresh(JG_T);
			
			JG_H = Number(data.H).toFixed(1);
		    	gage.refresh(JG_H);
			
			JG_BMP = Number(data.P).toFixed(0);
			gaugeBMP.refresh(JG_BMP);
			
			JG_HCHO = Number(data.HCHO).toFixed(2);
			gaugeHCHO.refresh(JG_HCHO);
			
			JG_CO2 = Number(data.CO2).toFixed(2);
			gaugeCO2.refresh(JG_CO2);

			JG_CO = Number(data.CO).toFixed(0);
			gaugeCO.refresh(JG_CO);

			
			/** Imprime en Consola **/
			console.log("Temperatura: " + data.T + " *C");
			console.log("Humedad: " + data.H + " %");	
			console.log("Presion Atm.: " + data.P + " hPa");
			console.log("HCHO: " + data.HCHO + " mg/m3");
			console.log("HCHO: " + data.HCHO_ppm + " ppm");
			console.log("CO2: " + data.CO2 + " ppm");
			console.log("CO: " + data.CO + " ppm");
	});
	
	socket.on('DHT', function(data){
			document.getElementById('valTempDHT').innerHTML =  Number(data.T).toFixed(1);
			document.getElementById('valHumDHT').innerHTML =  Number(data.H).toFixed(1);
			
			console.log("Temperatura: " + data.T + " *C");
			console.log("Humedad: " + data.H + "%");	
	});
	socket.on('DHT_af', function(data){
			document.getElementById('tem_af').innerHTML = Number(data.T).toFixed(1);
			document.getElementById('hum_af').innerHTML = Number(data.H).toFixed(1);
			
			console.log("Temperatura: " + Number(data.T).toFixed(1) + " *C");
			console.log("Humedad: " + Number(data.H).toFixed(1) + "%");	
	});
	
	socket.on('CO2', function(data){
			document.getElementById('val_CO2').innerHTML = data.CO2;
			
			console.log("CO2: " + data.CO2 + " %");		
	});
	
	socket.on('O2', function(data){
			//document.getElementById('val_O2').innerHTML = data.O2;
			
			console.log("CO2: " + data.O2 + " %");		
	});
	
	socket.on('HCHO', function(data){
			document.getElementById('val_mgHCHO').innerHTML = data.HCHO;
			
			console.log("CO2: " + data.HCHO + " mg/m3");		
	});

    socket.on('ESP_SWITCH', function(data){
		var rJSON = JSON.parse(data);
		//console.log('Recibe: ' + rJSON.espID);		
			
		switch (rJSON.Estado){
			case '0': document.getElementById(rJSON.id).checked = false;
			break;
				
			case '1': document.getElementById(rJSON.id).checked = true;
			break;
		}
	});
	
	socket.on('FROM_ESP', function(data){
		var rJSON = JSON.stringify(data);
		console.log('Recibe FROM_ESP: ' + rJSON);
		
		var checkPin = false;
		if(data.Estado === 0){
			checkPin = false;
		}
		if(data.Estado === 1){
			checkPin = true;
		}
		
		if(data.espID == document.getElementById('d1_uid').value){
			console.log(data.espID);
			
			$("#D1_status").html("online");
			$("#D1_status").css("color","green");
			
			document.getElementById('toggle-1').checked =  checkPin;
			
			if(Number(data.Tem) != -127.00){
				document.getElementById('label_d1').hidden = false;
				document.getElementById('tem_D1').innerHTML = Number(data.Tem).toFixed(1);
			}
			if(Number(data.Tem) == -127.00){
				document.getElementById('label_d1').hidden = true;
			}
		}
		
		if(data.espID == document.getElementById('d2_uid').value){
			console.log(data.espID);
			//document.getElementById('tem_D2').innerHTML = data.Tem;
			document.getElementById('toggle-3').checked =  checkPin;
			
			$("#D2_status").html("online");
			$("#D2_status").css("color","green");
			
			if(Number(data.Tem) != -127.00){
				document.getElementById('label_d2').hidden = false;
				document.getElementById('tem_D2').innerHTML = data.Tem;
			}
			if(Number(data.Tem) == -127.00){
				document.getElementById('label_d2').hidden = true;
			}
		}
		
		if(data.espID == document.getElementById('d3_uid').value){
			console.log(data.espID);
			
			document.getElementById('toggle-5').checked =  checkPin;
			
			$("#D3_status").html("online");
			$("#D3_status").css("color","green");
			
			if(Number(data.Tem) != -127.00){
				document.getElementById('label_d3').hidden = false;
				document.getElementById('tem_D3').innerHTML = data.Tem;
			}
			if(Number(data.Tem) == -127.00){
				document.getElementById('label_d3').hidden = true;
			}		
		}
		
		if(data.espID == document.getElementById('d4_uid').value){
			console.log(data.espID);
			//document.getElementById('tem_D4').innerHTML = data.Tem;
			document.getElementById('toggle-7').checked =  checkPin;
			
			$("#D4_status").html("online");
			$("#D4_status").css("color","green");
			
			if((Number(data.Tem)) != -127.00){
				document.getElementById('label_d4').hidden = false;
				document.getElementById('tem_D4').innerHTML = Number(data.Tem);
			}
			if((Number(data.Tem)) == -127.00){
				document.getElementById('label_d4').hidden = true;
			}
		}
			
	});
	
	socket.on('TERMOSTATO', function(data){
		var rJSON = JSON.stringify(data);
		console.log('Recibe: ' + rJSON);	
		document.getElementById(data.id).innerHTML = data.termos;
		
		//slider_D3.noUiSlider.set(rJSON.termos);
	});
	
	socket.on('actualizar_D', function(data){
		var dato = JSON.parse(data);
		
		switch (dato.toggle){
			case 'toggle-1': 
			    document.getElementById('d1_name').value = dato.name;
				$('#d12').text(dato.name);
				
				localStorage.setItem('d12', dato.name);
				
				
				console.log(dato.toggle);
				console.log(dato.name);
				console.log(dato.uid);
			break;
			
			case 'toggle-3': 
				document.getElementById('d2_name').value = dato.name;
				$('#d22').text(dato.name);
			break;
			
			case 'toggle-5': 
				document.getElementById('d3_name').value = dato.name;
				$('#d3').text(dato.name);
				document.getElementById('hasTermos_d3').checked = dato.hasTermos;
				document.getElementById('hide_D3').hidden = dato.hasTermos;
				
			break;
			
			case 'toggle-7': 
				document.getElementById('d4_name').value = dato.name;
				$('#d42').text(dato.name);
				document.getElementById('hasTermos_d4').checked = dato.hasTermos;
				document.getElementById('hide_D4').hidden = dato.hasTermos;
			break;
		}
	});
	
	socket.on('act_Dev', function(data){
		console.log(data);
		var d1 = data[0];
		var d2 = data[1];
		var d3 = data[2];
		var d4 = data[3];
		
		document.getElementById('d1_name').value = d1.name;
		document.getElementById('d1_uid').value = d1.uid;
		$('#d12').text(d1.name);
		
		document.getElementById('d2_name').value = d2.name;
		document.getElementById('d2_uid').value = d2.uid;
		$('#d22').text(d2.name);
		
		document.getElementById('d3_name').value = d3.name;
		document.getElementById('d3_uid').value = d3.uid;
		$('#d3').text(d3.name);
		document.getElementById('hasTermos_d3').checked = d3.hasTermos;
		document.getElementById('hide_D3').hidden = d3.hasTermos;
		
		document.getElementById('d4_name').value = d4.name;
		document.getElementById('d4_uid').value = d4.uid;
		$('#d4').text(d4.name);
		document.getElementById('hasTermos_d4').checked = d4.hasTermos;
		document.getElementById('hide_D4').hidden = d4.hasTermos;
	});
	
	

socket.on('message', function(data){
	console.log("Mensaje del servidor: ");
	console.log(data);
	
	//Materialize.toast('server: sent message', 500);
	
	
		
	var str = data;
	if (str.charAt(0) === 'H'){
		var JG_Htemp = (str.slice(1,6));
		JG_H = parseFloat(JG_Htemp);
		gage.refresh(JG_H);
		
		if (JG_Htemp <= 100 && JG_Htemp >= 0){
			document.getElementById('valHumDHT').innerHTML = JG_H.toFixed();
			console.log("Humedad: "+ str.slice(1,6) + " %");
		}
	}
	//delay(50);
	if (str.charAt(0) === 'T'){
		var JG_Ttemp = (str.slice(1,6));
		JG_T = parseFloat(JG_Ttemp);
		gaugeT.refresh(JG_T);
		
		if (JG_Ttemp < 55 && JG_Ttemp > -10){
			document.getElementById('valTempDHT').innerHTML = JG_T.toFixed(1);
			console.log("Temperatura: "+ JG_Ttemp + " C");
		}
		
		
	}
	//delay(50);
	if (str.charAt(0) === 'B'){
		var strBMP = str.slice(1,9);
		
		if( strBMP > 800 && strBMP < 1100){
			JG_BMP = parseFloat(strBMP);
			gaugeBMP.refresh(JG_BMP);
			
			document.getElementById('valPatm').innerHTML = JG_BMP.toFixed();
			console.log("Presion Atmosferica: "+ str.slice(1,9) + " hPa");
		}
	}
	//delay(50);
	if (str.charAt(0) === 'P'){
		var mgHCHO =  str.slice(1,6);
		var mgHC = parseFloat(mgHCHO);
		
		if(mgHC >= 0.00 && mgHC < 10.00){
			var ppmFor = 0.000;
			ppmFor = (mgHC)*(24.500/30.00);
			
			//actualiza el grafico en mg/m3
			JG_HCHO = (mgHC);
			gaugeHCHO.refresh(JG_HCHO);
			
			//muestra datos en ppm
			document.getElementById('val_ppmHCHO').innerHTML = ppmFor.toFixed(3);
			console.log("HCHO: "+ ppmFor + " ppm");
			
			//muestra datos en Mg/m3
			document.getElementById('val_mgHCHO').innerHTML = mgHC.toFixed(3);
			console.log("HCHO: "+ mgHC + " mg/m3");
		}
	}
	
	/*if (str.charAt(0) === 'M'){
		document.getElementById('val_mgHCHO').innerHTML = str.slice(1,6);
		console.log("HCHO: "+ str.slice(1,6) + " mg/m3");
	}*/
	//delay(50);
	
	if (str.charAt(0) === 'C'){
		var strCO2 = str.slice(1,6);
		var ppmCO2 = strCO2*10000;
		JG_CO2 = ppmCO2;
		gaugeCO2.refresh(JG_CO2);
		
		if(strCO2 >= 0.0 && strCO2 < 5.0){
			document.getElementById('val_CO2').innerHTML = strCO2;
			document.getElementById('val_CO2ppm').innerHTML = ppmCO2.toFixed();
			console.log("CO2: "+ str.slice(1,6) + " %");
			console.log("CO2: "+ ppmCO2.toFixed() + " ppm");
		}
	}
	
	if(str.charAt(0) === '1' || '2' || '3' || '4' || '5' ||'6'){
		switch (data){
			//toggle-1
			case '120': document.getElementById('toggle-1').checked = false;
			break;
			
			case '121': document.getElementById('toggle-1').checked = true;
			break;
			
			//toggle-2
			case '130': document.getElementById('toggle-2').checked = false;
			break;
			
			case '131': document.getElementById('toggle-2').checked = true;
			break;
			
			//toggle-3
			case '220': document.getElementById('toggle-3').checked = false;
			break;
			
			case '221': document.getElementById('toggle-3').checked = true;
			break;
			
			//toggle-4
			case '230': document.getElementById('toggle-4').checked = false;
			break;
			
			case '231': document.getElementById('toggle-4').checked = true;
			break;
			
			//toggle-5
			case '320': document.getElementById('toggle-5').checked = false;
			console.log("Toggle 5 off");
			break;
			
			case '321': document.getElementById('toggle-5').checked = true;
			console.log("Toggle 5 on");
			break;
			
			//toggle-6
			case '330': document.getElementById('toggle-6').checked = false;
			break;
			
			case '331': document.getElementById('toggle-6').checked = true;
			break;
			
			//toggle-7
			case '420': document.getElementById('toggle-7').checked = false;
			console.log("Toggle 7 off");
			break;
			
			case '421': document.getElementById('toggle-7').checked = true;
			console.log("Toggle 7 on");
			break;
			
			//toggle-8
			case '430': document.getElementById('toggle-8').checked = false;
			break;
			
			case '431': document.getElementById('toggle-8').checked = true;
			break;
			
			/*//toggle-9
			case '520': document.getElementById('toggle-9').checked = false;
			break;
			
			case '521': document.getElementById('toggle-9').checked = true;
			break;
			
			//toggle-10
			case '530': document.getElementById('toggle-10').checked = false;
			break;
			
			case '531': document.getElementById('toggle-10').checked = true;
			break; */
			
			
		}//final switch case
	}
	
  });


	
$( document ).ready(function() {	

	//Para modal
	//$('.modal').modal();
	$('select').material_select();
	$('.collapsible').collapsible();
	
	//Termostato Device 3
	var slider_D3 = document.getElementById('d3_slider');
	noUiSlider.create(slider_D3, {
		start: [25],
		connect: true,
		range: {
			'min': 15,
			'max': 35
		}
	});
	var setValD3 = document.getElementById('d3_Set');
	slider_D3.noUiSlider.on('change', function( values, handle ) {
		var tweet = {'id': 'd3_Set', 'espID': $('#d3_uid').val(), 'termos': Number(values[handle]).toFixed(0)};
		socket.emit('TERMOSTATO', JSON.stringify(tweet) );
		console.log(tweet);
	});
	slider_D3.noUiSlider.on('update', function( values, handle ) {
		setValD3.innerHTML = Number(values[handle]).toFixed(0);
		//console.log(values[handle]);
	});
	
	//Termostato Device 4
	var slider_D4 = document.getElementById('d4_slider');
	noUiSlider.create(slider_D4, {
		start: [25],
		connect: true,
		range: {
			'min': 15,
			'max': 35
		}
	});
	var setValD4 = document.getElementById('d4_Set');
	slider_D4.noUiSlider.on('change', function( values, handle ) {
		var tweet = {'id': 'd4_Set', 'espID': $('#d4_uid').val(), 'termos': Number(values[handle]).toFixed(0)};
		socket.emit('TERMOSTATO', JSON.stringify(tweet) );
		console.log(tweet);
	});
	slider_D4.noUiSlider.on('update', function( values, handle ) {
		setValD4.innerHTML = Number(values[handle]).toFixed(0);
		//console.log(values[handle]);
	});
	 

    gage = new JustGage({
		id: "gageH",
		value: JG_H,
		min: 0,
		max: 100,
		title: "Humidity",
		label: "% HR",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		//percents: true,
		decimals: true,
		customSectors: [{
			color : "#F5ECCE",
			lo : 0,
			hi : 49
			},{
			color : "#81F781",
			lo : 50,
			hi : 70
			},{
			color : "#2E9AFE",
			lo : 71,
			hi : 100
		}],
	});
	
	gaugeT = new JustGage({
		id: "gaugeT",
		value: JG_T,
		min: -10,
		max: 50,
		title: "Temperature",
		label: "°C",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		decimals: true,
		customSectors: [{
			color : "#0040FF",
			lo : -10,
			hi : 17
			},{
			color : "#81F781",
			lo : 18,
			hi : 30
			},{
			color : "#2E9AFE",
			lo : 31,
			hi : 50
		}],
	});
	
	gaugeBMP = new JustGage({
		id: "gaugeBMP",
		value: JG_BMP,
		min: 700,
		max: 1100,
		title: "Amospheric Pres.",
		label: "hPa",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		customSectors: [{
			color : "#0040FF",
			lo : -10,
			hi : 17
			},{
			color : "#81F781",
			lo : 1000,
			hi : 1030
			},{
			color : "#2E9AFE",
			lo : 31,
			hi : 50
		}],
	});
	
	gaugeHCHO = new JustGage({
		id: "gaugeHCHO",
		value: JG_HCHO,
		min: -0.10,
		max: 1.10,
		title: "HCHO",
		label: "mg/m3",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		decimals: true,
		customSectors: [{
			color : "#81F781",
			lo : -1,
			hi : 0.08
			},{
			color : "#2E9AFE",
			lo : 0.09,
			hi : 1.10
		}],
	});
	
	gaugeCO2 = new JustGage({
		id: "gaugeCO2",
		value: JG_CO2,
		min: 0,
		max: 10000,
		title: "CO2",
		label: "ppm",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		customSectors: [{
			color : "#00FF7F", //spring green
			lo : 360,
			hi : 410
			},{
			color : "#228B22", //forest green
			lo : 420,
			hi : 2500
			},{
			color : "#1E90FF", //dodger blue
			lo : 2501,
			hi : 5000
			},{
			color : "#DAA520", //yellow
			lo : 5001,
			hi : 10000
			},{
			color : "#FF0000", //red
			lo : 10001,
			hi : 50000	
		}],
	});

	gaugeCO = new JustGage({
		id: "gaugeCO",
		value: JG_CO,
		min: 0,
		max: 100,
		title: "CO",
		label: "ppm",
		relativeGaugeSize: true,
		donut: false,
		levelColorsGradient: false,
		customSectors: [{
			color : "#00FF7F", //spring green
			lo : 0,
			hi : 10
			},{
			color : "#228B22", //forest green
			lo : 420,
			hi : 2500
			},{
			color : "#1E90FF", //dodger blue
			lo : 11,
			hi : 20
			},{
			color : "#DAA520", //yellow
			lo : 21,
			hi : 30
			},{
			color : "#FF0000", //red
			lo : 30,
			hi : 5000	
		}],
	});
	
	

	$('#barProg').hide();
	
	$('.timepicker').wickedpicker();
	
	applySettings();
	
	//Dispositivo 1
	$('#toggle-1').change(function() {
		
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-1').checked == true){
		    var tweet = {'id': this.id, 'espID': $('#d1_uid').val(), 'Pin': '0', 'Estado': '1'};
			socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	   if(document.getElementById('toggle-1').checked == false){
		    var tweet = {'id': this.id,  'espID': $('#d1_uid').val(), 'Pin': '0', 'Estado': '0'};
		    socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
    });

	$('#toggle-2').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-2').checked == true){
		  socket.send('N,1,3,1');
		  socket.emit('lightON', {id: this.id, cmd: '1'});
		  console.log("toggle-2 ON");	
	   }
	   if(document.getElementById('toggle-2').checked == false){
		   socket.send('N,1,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-2 OFF");	
	   }
    });
	
	
	//Dispositivo 2
	$('#toggle-3').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-3').checked == true){
			var tweet = {'id': this.id, 'espID': $('#d2_uid').val(), 'Pin': '0', 'Estado': '1'};
			socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	   if(document.getElementById('toggle-3').checked == false){
		    var tweet = {'id': this.id,  'espID': $('#d2_uid').val(), 'Pin': '0', 'Estado': '0'};
		    socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	 });

	$('#toggle-4').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-4').checked == true){
		   socket.send('N,2,3,1');
		   socket.emit('lightON', {id: this.id, cmd: '1'});
		   console.log("toggle-4 ON");
	   }
	   if(document.getElementById('toggle-4').checked == false){
		   socket.send('N,2,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-4 OFF");
	   }
	 }); 
	 
	 
	 //Dispositivo 3
	$('#toggle-5').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-5').checked == true){
			var tweet = {'id': this.id, 'espID': $('#d3_uid').val(), 'Pin': '0', 'Estado': '1'};
			socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	   if(document.getElementById('toggle-5').checked == false){
		    var tweet = {'id': this.id,  'espID': $('#d3_uid').val(), 'Pin': '0', 'Estado': '0'};
		    socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	 });

	$('#toggle-6').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-6').checked == true){
		   socket.send('N,3,3,1');
		   socket.emit('lightON', {id: this.id, cmd: '1'});
		   console.log("toggle-6 ON");
	   }
	   if(document.getElementById('toggle-6').checked == false){
		   socket.send('N,3,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-6 OFF");
	   }
	 }); 
	 
	 //Dispositivo 4
	$('#toggle-7').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-7').checked == true){
			var tweet = {'id': this.id, 'espID': $('#d4_uid').val(), 'Pin': '0', 'Estado': '1'};
			socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	   if(document.getElementById('toggle-7').checked == false){
		    var tweet = {'id': this.id,  'espID': $('#d4_uid').val(), 'Pin': '0', 'Estado': '0'};
		    socket.emit('ESP_SWITCH', JSON.stringify(tweet));
			console.log(tweet);
	   }
	 });

	$('#toggle-8').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-8').checked == true){
		   socket.send('N,4,3,1');
		   socket.emit('lightON', {id: this.id, cmd: '1'});
		   console.log("toggle-8 ON");
	   }
	   if(document.getElementById('toggle-8').checked == false){
		   socket.send('N,4,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-8 OFF");
	   }
	 }); 
	 
	 //Dispositivo 5
	$('#toggle-9').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-9').checked == true){
			socket.send('N,5,2,1');
			socket.emit('lightON', {id: this.id, cmd: '1'});
			console.log("toggle-9 ON");
	   }
	   if(document.getElementById('toggle-9').checked == false){
		   socket.send('N,5,2,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-9 OFF");
	   }
	 });

	$('#toggle-10').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-10').checked == true){
		   socket.send('N,5,3,1');
		   socket.emit('lightON', {id: this.id, cmd: '1'});
		   console.log("toggle-10 ON");
	   }
	   if(document.getElementById('toggle-10').checked == false){
		   socket.send('N,5,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-10 OFF");
	   }
	 });
	 
	 //Dispositivo 6
	$('#toggle-11').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-11').checked == true){
			socket.send('N,6,2,1');
			socket.emit('lightON', {id: this.id, cmd: '1'});
			console.log("toggle-11 ON");
	   }
	   if(document.getElementById('toggle-11').checked == false){
		   socket.send('N,6,2,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-11 OFF");
	   }
	 });

	$('#toggle-12').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-12').checked == true){
		   socket.send('N,6,3,1');
		   socket.emit('lightON', {id: this.id, cmd: '1'});
		   console.log("toggle-12 ON");
	   }
	   if(document.getElementById('toggle-12').checked == false){
		   socket.send('N,6,3,0');
		   socket.emit('lightON', {id: this.id, cmd: '0'});
		   console.log("toggle-12 OFF");
	   }
	 });
	 
	 /**** Estable Tema de colores  ****/
	 $('#toggle-Theme').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
	   if(document.getElementById('toggle-Theme').checked == true){
		   $('[name="colorTheme"]').addClass('blue-grey darken-1 white-text');
		   console.log("tema oscuro");
		   //pref_Usuario();
		var tema = 1;
		localStorage.setItem('temaColor', tema);
		Materialize.toast('preference saved', 800);
		console.log("valor: " + tema);
	   }
	   if(document.getElementById('toggle-Theme').checked == false){
		  $('[name = "colorTheme"]').removeClass('blue-grey darken-1 white-text');
		  console.log("tema claro");
		  //pref_Usuario();
		var tema = 0;
		localStorage.setItem('temaColor', tema);
		Materialize.toast('preference saved', 800);
		console.log("valor: " + tema);
	   }
	 });
	 /**** Final Estable Tema de colores  ****/
	 

	 
	    $('#autoCon').change(function(){
				//(this).prop('checked');
				if(this.checked == true && document.getElementById('device_address').value != 'ws://youraddress.com:81/' ){
					mod();
					localStorage.setItem('autoConectar', 1);
					console.log("auto Conectar...");
				}
				else{
					localStorage.setItem('autoConectar', 0);
				}
		});
		
	
		
	
});

function setSettings() {
	
	if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
		var dir_IP = document.getElementById('device_address').value;
		localStorage.setItem('ult_IP', dir_IP);
		Materialize.toast('IP saved', 500);
		
	} else {
    // Sorry! No Web Storage support..
		Materialize.toast('No Web Storage support..', 4000);
	}
	
}

function applySettings() {
	
	if (typeof(Storage) !== "undefined") {	
		if(localStorage.getItem('ult_IP') !=null) {
    		// Code for localStorage/sessionStorage.
			//document.getElementById('device_address').value = localStorage.ult_IP;
			Materialize.toast('loading last IP', 800);
			
			
		} else {
    		// Sorry! No Web Storage support..
			localStorage.setItem('ult_IP', 'ws://youraddress.com:81/');
			Materialize.toast('Set Server address', 1000);
			//document.getElementById('device_address').value = localStorage.ult_IP;
		}
		
		if(localStorage.getItem('temaColor') !=null) {
    		// Code for localStorage/sessionStorage.
			if(localStorage.temaColor == 1){
				$('[name="colorTheme"]').addClass('blue-grey darken-1 white-text');
				document.getElementById('toggle-Theme').checked = true;
				Materialize.toast('carga tema', 800);
			}
			else if(localStorage.temaColor == 0){
				$('[name = "colorTheme"]').removeClass('blue-grey darken-1 white-text');
				document.getElementById('toggle-Theme').checked = false;
				Materialize.toast('carga tema', 800);
			}
		} else {
    		// Sorry! No Web Storage support..
			$('[name = "colorTheme"]').removeClass('blue-grey darken-1 white-text');
			var tema = 0;
			localStorage.setItem('temaColor', tema);
			Materialize.toast('Set default theme', 800);
			document.getElementById('toggle-Theme').checked = false;
		}
		
		if(localStorage.getItem('autoConectar') != null){
			if(localStorage.getItem('autoConectar') == 1){
				mod();
				//$('#autoCon').checked == true;
				//document.getElementById('autoCon').checked = true;
				console.log("auto Conectar...guardado");
			}else{
				//$('#autoCon').checked == false;
			}
		} else{
			
		}
		
		
		
	} else {
    // Sorry! No Web Storage support..
		Materialize.toast('No Web Storage support..', 4000);
	}
	
	
};

function guardaEdit(ele){
      Materialize.toast('enter', 800);
      
	  var te_agarre = ele.id;
	  console.log("ejecutado por: " + ele.id);
	  //var guardaID = te_agarre;
	  
	  if (typeof(Storage) !== "undefined") {	
    		//var gD4 = document.getElementById('devic4').value;
			//var gD4 = $('#d42').text();	
			var guardaID = document.getElementById(ele.id).textContent;
		    localStorage.setItem(te_agarre, guardaID);
			Materialize.toast('saved', 800);
			
			console.log(guardaID);
		
		} else {
    			// Sorry! No Web Storage support..
				Materialize.toast('No Web Storage support..', 4000);
			}	
};

function reloj(){
	var fecha = new Date(); // for now
	
	var ano = fecha.getFullYear();
	var mes = fecha.getMonth() + 1;
	var dia = fecha.getDate();
	var hora = fecha.getHours();
	var minutos = fecha.getMinutes();
	var segundos = fecha.getSeconds();
	
	console.log("Fecha y Hora:" + ano + mes + dia + hora + minutos + segundos);
	var enviaFecha = (ano + mes + dia + hora + minutos + segundos);
	socket.send('RTC,'+ ano + "," + mes + "," + dia + "," + hora + "," + minutos + "," + segundos);
	
	console.log('RTC,'+ ano + ","  + mes + ","  + dia + "," + hora + "," + minutos + "," + segundos);
	
	//document.getElementById('la_Hora').value = "ano";
	$('#la_Fecha').text(ano + "-" + mes + "-" + "-" + dia);
	$('#la_Hora').text(hora + ":" + minutos + ":" + segundos);
};

function pref_Usuario(){
	if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
		var tema = document.getElementById('toggle-Theme').checked;
		localStorage.setItem('temaColor', tema);
		Materialize.toast('preference saved', 800);
		console.log("valor: " + tema);
	} else {
    // Sorry! No Web Storage support..
		Materialize.toast('No Web Storage support..', 4000);
	}
		
};

function customLabels(){
	if (typeof(Storage) !== "undefined") {	
		
		if(localStorage.getItem('editD42') !=null) {
    		// Code for localStorage/sessionStorage.
				//document.getElementById('devic4').value = localStorage.getItem('editD42');
				$('#d12').text(localStorage.getItem('d12'));
				Materialize.toast('carga nombre', 800);
	
		} else {
    		// Sorry! No Web Storage support.
			localStorage.setItem('editD42', 'Outside');
			Materialize.toast('Set default', 800);
			//document.getElementById('devic4').value 
		    $('#d42').text(localStorage.getItem('editD42'));
		}
	
	} else {
    // Sorry! No Web Storage support..
		Materialize.toast('No Web Storage support..', 4000);
	}
};

	

	

