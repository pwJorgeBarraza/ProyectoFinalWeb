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
					
				}
		}
		$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);	
	}
		
	function eliminar(){
		$respuesta=false;
		$conexion=conecta();
		$num=GetSQLValueString($_POST["noControl"],"int");
		$elimina=sprintf("delete from cubiculos where noControl=%d",$num);
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
		$libera=sprintf("update cubiculos set estatus=%s where hora=%s and cubiculo=%d",$e,$h,$c);
		mysql_query($libera);
		if(mysql_affected_rows()>0){
			$respuesta=true;
		}
		$salidaJSON = array('respuesta' => $respuesta );
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
		default:
			# code...
			break;
	}
?>