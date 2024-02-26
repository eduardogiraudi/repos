<?php  
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
// questo script esegue una query sul database scelto recuperando i dati relativi a una specifica entità
// (per esempio, un film, un libro, un disco, ecc.)
// e non è adatto ai casi in cui i risultati attesi sono più di uno.
// La richiesta Ajax indirizzata a questo script deve sempre contenere il parametro id 
// con un valore che esiste effettivamente nel database
// L'url chiamato quindi dovrà avere sempre lo schema:
// fetch("http://localhost:numero_porta/.../DB2JSON.php?id="+ props.idrisorsa)
// (vedere esempio sul sito)
$nome = $_REQUEST["protagonista_nome"]; 


// 0. parametri di connessione al database server per XAMPP
// (per MAMP, si deve cambiare $password = ""; in $password = "root";)
$host = "localhost";
$username = "root";
$password = "root";
// 1. scrivete il nome del vostro database dove ci sono i puntini
$db = "fiabe";

// si effettua la connessione con il database server
$conn = new mysqli($host, $username, $password, $db);	 																						 
// 2. copiare qui sotto la query che si vuole eseguire (di qualsiasi tipo, anche un JOIN)
// *** deve essere una query che estrae una sola riga! provatela prima con phpMyAdmin *** 
// nella clausola WHERE sostituire il valore specifico usato per interrogare il DB con la variabile $id
// (se la query non funzionasse, provare a mettere gli apici: '$id')
// Per esempio se la query è SELECT * FROM libri WHERE id_autore = "2"
// la query diventerà "SELECT * FROM libri WHERE id_autore = $id" 
// La query deve essere tra virgolette e al fondo dovete mettere il ;
//$sql = "SELECT `proiezione_film_IMDB`, SUM(`numero_posti_prenotati`) AS `numero-totale-prenotazioni` FROM `prenotazione` GROUP BY(`proiezione_film_IMDB`)";
//"SELECT `proiezione_film_IMDB`, SUM(`numero_posti_prenotati`) AS `numero-totale-prenotazioni` FROM `prenotazione` WHERE `proiezione_film_IMDB` = '$id'";
$sql="SELECT `fiabe`.`titolo`, `fiabe`.`anno`, `fiabe`.`protagonista_nome`,`autore`.`nome`,`autore`.`cognome`
FROM `fiabe`
JOIN `autore` ON `fiabe`.`autore_cognome` = `autore`.`cognome`
WHERE `fiabe`.`protagonista_nome`='$nome'";

// *** non modificare nulla da qui in poi ***        
// si esegue la query sulla connessione
$result = $conn->query($sql);
$result = $result->fetch_assoc();
// si prelevano i dati dalla tabella dei risultati (contiene una sola riga)
// campo per campo, la riga viene collocata in altrettanti elementi dell'array
// $rows = array(); 
// while ($row = $result->fetch_assoc()) {
//     // ogni riga viene aggiunta all'array delle righe
//     $rows[] = $row;
// }
// si converte in JSON l'array associativo creato e lo si stampa perché il client lo riceva
// i nomi dei campi nel JSON saranno gli stessi del database
echo json_encode($result);


?>