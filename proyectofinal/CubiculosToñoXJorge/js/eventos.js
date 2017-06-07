var iniciaApp = function(){
	var entra=function(){
		$("#txtNoControl").focus();
		var fecha = new Date().toJSON().slice(0,10);
		document.getElementById('txtFecha').value=fecha;
		document.getElementById('txtHora').value=$("#td7").val();
	}
	var limpia=function(){
		document.getElementById('txtFecha').value=" ";
		document.getElementById('txtHora').value=" ";
		document.getElementById('txtNombre').value=" ";
		document.getElementById('txtNumeroControl').value=" ";
		document.getElementById('txtCubiculo').value=" ";
		document.getElementById('txtCarrera').value=" ";

	}
	var guarda=function(){
		var noControl=$("#txtNumeroControl").val(); 
		var nombre=$("#txtNombre").val();
		var carrera=$("#txtCarrera").val();
		var fecha=$("#txtFecha").val();
		var hora=$("#txtHora").val();
		var cubiculo=$("#txtCubiculo").val();
		var estatus="reservado";
		var parametros="opcion=guardar"+
					   "&noControl="+noControl+
					   "&nombre="+nombre+
					   "&carrera="+carrera+
					   "&fecha="+fecha+
					   "&hora="+hora+
					   "&cubiculo="+cubiculo+ 
					   "&estatus="+estatus+	 	
					   "&id="+Math.random();
		var guardarCubiculo=$.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});
		guardarCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo Asignado");
				//document.getElementById('TD7').style.background="red";
				limpia();

			}else{
				alert("El cubículo ya está registrado :(");
				limpia();
			}
		});
		guardarCubiculo.fail(function(jqError,textStatus){

		});
	}

	var elimina = function(){
		var noControl=$("#txtNoControl").val(); 
		var parametros="opcion=eliminar"+
					   "&noControl="+noControl+
					   "&id="+Math.random();
		var eliminaCubiculo=$.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});
		eliminaCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo eliminado");
				limpia();		
			}else{
				alert("El No. de control no existe o no se pudo eliminar");
				limpia();
			}
		});
		eliminaCubiculo.fail(function(jqError,textStatus){

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
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});
		liberaCubiculo.done(function(data){
			if(data.respuesta==true){
				alert("Cubículo liberado");
				limpia();		
			}else{
				alert("El cubiculo está libre");
			}
		});
		liberaCubiculo.fail(function(jqError,textStatus){

		});
	}

	//Sección de declaración de eventos
	$(".btn-default").on("click",entra);
	$("#btnGuardar").on("click",guarda);
	$("#btnEliminar").on("click",elimina);
	$("#btnLiberar").on("click",libera);

	
}
$(document).ready(iniciaApp);