<?php
	require("utilerias.php");
	function guardar(){ 
		$respuesta=false;
		$conexion=conecta();
		$num=GetSQLValueString($_POST["noControl"],"int");
		$nom=GetSQLValueString($_POST["nombre"],"text");
		$ca=GetSQLValueString($_POST["carrera"],"text");
		$f=GetSQLValueString($_POST["fecha"],"text");
		$h=GetSQLValueString($_POST["hora"],"text");
		$cu=GetSQLValueString($_POST["cubiculo"],"int");
		$e=GetSQLValueString($_POST["estatus"],"text");
			$inserta=sprintf("insert into apartadocubiculos values(default,%d,%s,%s,%s,%s,%d,%s)",$num,$nom,$ca,$f,$h,$cu,$e);
				mysql_query($inserta);
				if(mysql_affected_rows()>0){
					$respuesta=true;
				}else{
					$respuesta=false;
				}
		$salidaJSON = array('respuesta' => $respuesta);
			print json_encode($salidaJSON);	
	}
		
	function eliminar(){
		$respuesta=false;
		$conexion=conecta();
		$num=GetSQLValueString($_POST["noControl"],"int");
		$elimina=sprintf("delete from apartadocubiculos where numeroControl=%d and estatus='reservado'",$num);
		mysql_query($elimina);
		if(mysql_affected_rows()>0){
			$respuesta=true;
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON); 
	}
	function liberar(){
		$respuesta =false;
		$conexion=conecta();
		$c=GetSQLValueString($_POST["cubiculo"],"int");
		$h=GetSQLValueString($_POST["hora"],"text");
		$e=GetSQLValueString($_POST["estatus"],"text");
		$libera=sprintf("update apartadocubiculos set estatus=%s where hora=%s and cubiculo=%d",$e,$h,$c);
		mysql_query($libera);
		if(mysql_affected_rows()>0){
			$respuesta=true;
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	/*function consultas(){
		$respuesta=false;
		$conexion=conecta();
		$h=GetSQLValueString($_POST["hora"],"text");
		$cu=GetSQLValueString($_POST["cubiculo"],"int");
		$consulta=sprintf("select numerocontrol from apartadocubiculos where hora=%s and cubiculo=%d",$h,$cu);
		$resultado=mysql_query($consulta);
		$numControl="";
		if(mysql_affected_rows($resultado)>0){
			$respuesta=true;
			if($registro=mysql_fetch_array($resultado)){
				$numControl = $registro["numeroControl"];
			}
		}else{
			$respuesta=false;
		}
		$salidaJSON = array('respuesta' => $respuesta),
							'numeroControl' => $numControl);
			print json_encode($salidaJSON);	
	}*/
	function consultas(){
		$respuesta =false;
		$conexion=conecta();
		$c=GetSQLValueString($_POST["cubiculo"],"int");
		$h=GetSQLValueString($_POST["hora"],"text");
		$consulta=sprintf("select * from apartadocubiculos where hora=%s and cubiculo=%d",$h,$c);
		$resultado=mysql_query($consulta);
		$numeroControl="";
		$nombre="";
		$carrera="";
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			if($registro=mysql_fetch_array($resultado)){
				$numeroControl       = $registro["numeroControl"];
				$nombre       = $registro["nombre"];
				$carrera       = $registro["carrera"];
			}
		}
		$salidaJSON = array('respuesta'   => $respuesta,
							'nombre'      => $nombre,
							'carrera'       => $carrera, 
							'numeroControl'    => $numeroControl);
		print json_encode($salidaJSON);
	}
	function cargaDatos(){
		$respuesta =false;
		$conexion=conecta();
		$consulta=sprintf("select * from apartadocubiculos");
		$resultado=mysql_query($consulta);
		$cubiculo="";
		$hora="";
		$estatus="";
		$arryCubiculos = Array();
		$arryHoras = Array();
		$arryEstatus = Array();
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			while($registro=mysql_fetch_array($resultado)){
				$cubiculo       = $registro["cubiculo"];
				$hora       = $registro["hora"];
				$estatus       = $registro["estatus"];
				$arryCubiculos[] = $cubiculo;
				$arryHoras[] = $hora;
				$arryEstatus[] = $estatus;
			}
		$jsonCubiculos = json_encode($arryCubiculos);
		$jsonHoras = json_encode($arryHoras);
		$jsonEstatus = json_encode($arryEstatus);
		}
		$salidaJSON = array('respuesta'   => $respuesta,
							'cubiculos'      => $jsonCubiculos,
							'horas'      => $jsonHoras,
							'estatus'      => $jsonEstatus);
		print json_encode($salidaJSON);
	}



//Menú principal
	$opcion=$_POST["opcion"];
	switch ($opcion) {
		case 'guardar':
			guardar();
			break;
		case 'eliminar':
			eliminar();
			break;	
		case 'liberar':
			liberar();
			break;
		case 'consultas':
			consultas();
			break;
		case 'cargarDatos':
			cargaDatos();
			break;
		default:
			# code...
			break;
	}
?>