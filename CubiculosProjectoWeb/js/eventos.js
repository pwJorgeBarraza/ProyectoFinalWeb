var iniciaApp = function(){
	var selecccionado; //Ultimo boton seleccionado
	
	/*var entra=function(){
		$("#txtNoControl").focus();
		var fecha = new Date().toJSON().slice(0,10);
		document.getElementById('txtFecha').value=fecha;
		document.getElementById('txtHora').value=$("#td7").val();
	}*/

	var guarda=function(){
		var noControl=$("#txtNumeroControl").val(); 
		var nombre=$("#txtNombre").val();
		var carrera=$("#txtCarrera").val();
		var fecha=$("#txtFecha").val();
		var hora=$("#txtHora").val();
		var cubiculo=$("#txtCubiculo").val();
		var estatus="reservado";
		var id=1;
		var parametros="opcion=guardar"+
					   "&noControl="+noControl+
					   "&nombre="+nombre+
					   "&carrera="+carrera+
					   "&fecha="+fecha+
					   "&hora="+hora+
					   "&cubiculo="+cubiculo+ 
					   "&estatus="+estatus+	 	
					   //"&id="+Math.random();
					   "&id="+id;
		var guardarCubiculo=$.ajax({
			method:"POST",
			url:"http://localhost:8080/CubiculosProjectoWeb/php/datos.php",
			data:parametros,
			dataType:"json"
		});
		guardarCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo Asignado Correctamente!");
				if (selecccionado.indexOf("R") !=-1) {
					//es boton PDF no hacer nada
				}else{
					document.getElementById(selecccionado).style.background='#DF2828';
				}
				limpia();
			}else{
				alert("Error al asignar cubiculo...");
				//limpia();
			}
		});
		guardarCubiculo.fail(function(jqError,textStatus){
			alert("Ups, ha ocurrido un error :S");
		});
	}

	var limpia=function(){
		document.getElementById('txtCubiculo').value="";
		document.getElementById('txtCarrera').value="";
		document.getElementById('txtFecha').value="";
		document.getElementById('txtHora').value="";
		document.getElementById('txtNombre').value="";
		document.getElementById('txtNumeroControl').value="";
	}

	var elimina = function(){
		var noControl=$("#txtNumeroControl").val(); 
		var parametros="opcion=eliminar"+
					   "&noControl="+noControl+
					   "&id="+Math.random();
		var eliminaCubiculo=$.ajax({
			method:"POST",
			url:"http://localhost:8080/CubiculosProjectoWeb/php/datos.php",
			data:parametros,
			dataType:"json"
		});
		eliminaCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo eliminado");
				if (selecccionado.indexOf("R") !=-1) {
					//es boton PDF no hacer nada
				}else{
					document.getElementById(selecccionado).style.backgroundColor="";
				}
				limpia();		
			}else{
				alert("No se encuentra el Num. de control o no se puede eliminar");
				limpia();
			}
		});
		eliminaCubiculo.fail(function(jqError,textStatus){
			alert("Error al eliminar...");
		});
	}

	var libera = function(){
		var hora=$("#txtHora").val();
		var cubiculo=$("#txtCubiculo").val();
		var estatus="liberado";
		var parametros="opcion=liberar"+
					   "&cubiculo="+cubiculo+
					   "&hora="+hora+
					   "&estatus="+estatus+
					   "&id="+Math.random();
		var liberaCubiculo=$.ajax({
			method:"POST",
			url:"http://localhost:8080/CubiculosProjectoWeb/php/datos.php",
			data:parametros,
			dataType:"json"
		});
		liberaCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo liberado");
				if (selecccionado.indexOf("R") !=-1) {
					//otros botones
				}else{
					document.getElementById(selecccionado).style.background='#2DD1E3';
				}
				limpia();		
			}else{
				alert("El cubiculo está libre");
			}
		});
		liberaCubiculo.fail(function(jqError,textStatus){
			alert("Error al liberar cubiculo");
		});
	}

	var consulta = function(){
		var hora=$("#txtHora").val();
		var cubiculo=$("#txtCubiculo").val();
		var parametros="opcion=consultas"+
					   "&hora="+hora+
					   "&cubiculo="+cubiculo+
					   "&id="+Math.random(); 
		var consultaCubiculo=$.ajax({
			method:"POST",
			url:"http://localhost:8080/CubiculosProjectoWeb/php/datos.php",
			data:parametros,
			dataType:"json"
		});
		consultaCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo encontrado");
				$("#txtNumeroControl").val(data.numeroControl);
				$("#txtNombre").val(data.nombre);
				$("#txtCarrera").val(data.carrera);
			}else{
				alert("No se encuentra informacion del cubiculo seleccionado");
			}
		});
		consultaCubiculo.fail(function(jqError,textStatus){
			alert("Error al consultar cubiculo...");
		});
	}

	var cargarDatos = function(){
		var parametros="opcion=cargarDatos"+
					   "&id="+Math.random(); 
		var consultaCubiculo=$.ajax({
			method:"POST",
			url:"http://localhost:8080/CubiculosProjectoWeb/php/datos.php",
			data:parametros,
			dataType:"json"
		});
		consultaCubiculo.done(function(data){
			if(data.respuesta==true){
				//alert("Datos cargados correctamente!");
				var arrayCubiculos = JSON.parse(data.cubiculos);
				var arrayhoras = JSON.parse(data.horas);
				var arrayestatus = JSON.parse(data.estatus);
				for(var i = 0; i < arrayCubiculos.length; i++) {
    				var cubi = arrayCubiculos[i];
    				var hora = arrayhoras[i];
    				var estatus = arrayestatus[i];
    				var horaCorta = hora.substring(0,2);
    				if(cubi<10){
    					cubi="0"+cubi;
    				}
    				var horaRecortada="";
    				var id="";
    				if(horaCorta<10){
    					horaRecortada = horaCorta.substring(1,2);
    				}else{
    					horaRecortada = horaCorta;
    				}
    				var horaFinal="";
    				if(horaRecortada==7){
    					horaFinal=1;
    				}else if(horaRecortada==8){
    					horaFinal=2;
    				}else if(horaRecortada==9){
    					horaFinal=3;
    				}else if(horaRecortada==10){
    					horaFinal=4;
    				}else if(horaRecortada==11){
    					horaFinal=5;
    				}else if(horaRecortada==12){
    					horaFinal=6;
    				}else if(horaRecortada==13){
    					horaFinal=7;
    				}else if(horaRecortada==14){
    					horaFinal=8;
    				}else if(horaRecortada==15){
    					horaFinal=9;
    				}else if(horaRecortada==16){
    					horaFinal=10;
    				}else if(horaRecortada==17){
    					horaFinal=11;
    				}
    				id = "c"+cubi+"h"+horaFinal;
    				if(estatus == "reservado"){
    					document.getElementById(id).style.background='#DF2828';
    				}else{
    					document.getElementById(id).style.background='#2DD1E3';
    				}
				}
				//$("#txtNumeroControl").val(data.numeroControl);
			}else{
				alert("No hay datos guardados actualmente");
			}
		});
		consultaCubiculo.fail(function(jqError,textStatus){
			alert("Error al consultar datos de carga...");
		});
	}

	//Sección de declaración de eventos
	//$(".btn-default").on("click",entra);
	$("#btnGuardar").on("click",guarda);
	$("#btnEliminar").on("click",elimina);
	$("#btnLiberar").on("click",libera);

	//Funcion para detectar el ID de cada button
	$("button").click(function() {
    //alert(this.id);
    if (this.id.indexOf("btn") !=-1) {
			//no es un cubiculo... no hacer nada
		}else{
			selecccionado=this.id;
		}
    var cubiculoSeleccionado=selecccionado.substring(1,3);
    var horaSeleccionada=selecccionado.substring(4,6);
    var HoraFinal;
    if(horaSeleccionada == 1){
    	HoraFinal = "07:00";
    }else if(horaSeleccionada == 2){
    	HoraFinal = "08:00";
    }else if(horaSeleccionada == 3){
    	HoraFinal = "09:00";
    }else if(horaSeleccionada == 4){
    	HoraFinal = "10:00";
    }else if(horaSeleccionada == 5){
    	HoraFinal = "11:00";
    }else if(horaSeleccionada == 6){
    	HoraFinal = "12:00";
    }else if(horaSeleccionada == 7){
    	HoraFinal = "13:00";
    }else if(horaSeleccionada == 8){
    	HoraFinal = "14:00";
    }else if(horaSeleccionada == 9){
    	HoraFinal = "15:00";
    }else if(horaSeleccionada == 10){
    	HoraFinal = "16:00";
    }else if(horaSeleccionada == 11){
    	HoraFinal = "17:00";
    }
   	document.getElementById('txtCubiculo').value=cubiculoSeleccionado;
   	document.getElementById('txtHora').value=HoraFinal;
   	//$("#txtCubiculoYHora").text("Cubiculo: "+cubiculoSeleccionado+" Hora: "+HoraFinal);
   	var today = new Date();
   	$("#fechaHeader").text(today);
   	if (this.id.indexOf("btn") ==-1) {
			consulta();
		}
		cargarDatos();
});
	
}
$(document).ready(iniciaApp);