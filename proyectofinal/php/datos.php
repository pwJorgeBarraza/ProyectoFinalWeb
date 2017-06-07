<?php
	require("utilerias.php");
	function valida(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		$c=GetSQLValueString(md5($_POST["clave"]),"text");
		$consulta=sprintf("select usuario,clave 
			               from usuarios 
			               where usuario=%s and clave=%s 
			               limit 1",$u,$c);
		$resultado=mysql_query($consulta);
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
		}
		$salidaJSON = array('respuesta' => $respuesta);
		print(json_encode($salidaJSON));
	}
	function guardar(){
		$respuesta=false;
		$conexion=conecta();
		$num=GetSQLValueString($_POST["noControl"],"text");
		$nom=GetSQLValueString($_POST["nombre"],"text");
		$ca=GetSQLValueString($_POST["carrera"],"text");
		$f=GetSQLValueString($_POST["fecha"],"text");
		$h=GetSQLValueString($_POST["hora"],"text");
		$cu=GetSQLValueString($_POST["cubiculo"],"int");
		$e=GetSQLValueString($_POST["estatus"],"text");
		$inserta=sprintf("insert into apartadoCubiculos values(default,%s,%s,%s,%s,%s,%s,%s)",$numerControl,$nombre,$carrera,$fecha,$hora,$cubiculo,$estatus);
			mysql_query($inserta);
			if(mysql_affected_rows()>0){ 
				$respuesta=true;
			}	
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function alta(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		$n=GetSQLValueString($_POST["nombre"],"text");
		$c=GetSQLValueString(md5($_POST["clave"]),"text");
		$d=GetSQLValueString($_POST["departamento"],"int");
		$v=GetSQLValueString($_POST["vigencia"],"int");
		//Buscar si existe
		$busca=sprintf("select usuario from usuarios where usuario=%s",$u);
		$resultadoBusca=mysql_query($busca);
		if(mysql_num_rows($resultadoBusca)==0){//Si no existe
			$inserta=sprintf("insert into usuarios values(default,%s,%s,%s,%d,%d)",$u,$n,$c,$d,$v);
			mysql_query($inserta);
			if(mysql_affected_rows()>0){ 
				$respuesta=true;
			}	
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function baja(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		$baja=sprintf("delete from usuarios where usuario=%s",$u);
		mysql_query($baja);
		if(mysql_affected_rows()>0){
			$respuesta=true;
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function cambios(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		$n=GetSQLValueString($_POST["nombre"],"text");
		$c=$_POST["clave"];
		$aplicarMD5=GetSQLValueString($_POST["aplicarMD5"],"text");
		if($aplicarMD5=="'s'"){
			$c=GetSQLValueString(md5($_POST["clave"]),"text");
		}else{
			$c=GetSQLValueString($_POST["clave"],"text");
		}
		$d=GetSQLValueString($_POST["departamento"],"int");
		$v=GetSQLValueString($_POST["vigencia"],"int");
		
		$cambios=sprintf("update usuarios set nombre=%s,clave=%s,departamento=%d,vigencia=%d where usuario=%s",$n,$c,$d,$v,$u);
		mysql_query($cambios);
		if(mysql_affected_rows()>0){ 
			$respuesta=true;
		}	
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function consultas(){
		$respuesta=false;
		$conexion=conecta();
		$consultas=sprintf("select * from usuarios order by usuario");
		$resultado=mysql_query($consultas);
		$renglones="<tr>";
		$renglones.="<th>Usuario</th>";
		$renglones.="<th>Nombre</th>";
		$renglones.="<th>Departamento</th>";
		$renglones.="<th>Vigencia</th>";
		$renglones.="</tr>";
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			while($registro=mysql_fetch_array($resultado)){
				$renglones.="<tr>";
				$renglones.="<td>".$registro["usuario"]."</td>";
				$renglones.="<td>".$registro["nombre"]."</td>";
				$renglones.="<td>".$registro["departamento"]."</td>";
				$renglones.="<td>".$registro["vigencia"]."</td>";
				$renglones.="</tr>";
			}
		}
		$salidaJSON = array('respuesta' => $respuesta,
							'renglones' => $renglones);
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









