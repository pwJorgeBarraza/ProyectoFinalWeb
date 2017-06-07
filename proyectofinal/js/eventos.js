var iniciaApp = function(){
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
					   alert("fsdfsdf")
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
			}else{
				alert("El cubículo ya está registrado :(");
			}
		});
		guardarCubiculo.fail(function(jqError,textStatus){

		});
	}

	//Eventos Click
	$("#btnGuardar").on("click",guarda);
}
$(document).ready(iniciaApp);