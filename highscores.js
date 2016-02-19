var db = openDatabase('highscores', '1.0', 'highscorez', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS hscores (id integer primary key autoincrement, name, score)');
  

});

function addhighscore(inputName, inputScore){ 



db.transaction(function(tx) {
  tx.executeSql('INSERT INTO hscores(name,score) VALUES (?,?)',[inputName,inputScore], function(tx, results) {
    	var highRow=document.createElement("tr");
          //var id=document.createElement("td");
          var name=document.createElement("td");
          var score=document.createElement("td");
          //id.textContent=results.insertId;
          name.textContent=inputName;
          score.textContent=inputScore;
          highRow.setAttribute("id","c"+results.insertId);
          //highRow.appendChild(id);
          highRow.appendChild(name);
          highRow.appendChild(score);
          //Add the row to the table
          document.getElementById("highscores").appendChild(highRow);
          
  });
});

}




function listhighscores(){

	db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM hscores', [], function(tx, results) {
          var len=results.rows.length;
          var i;
          for(i=0; i<len; i++) {
            //Create the row and its cells
            var highRow=document.createElement("tr");
          //var id=document.createElement("td");
          var name=document.createElement("td");
          var score=document.createElement("td");
            //Set values coming from the database
           // id.textContent=results.rows.item(i).id;
            name.textContent=results.rows.item(i).name;
            score.textContent=results.rows.item(i).score;
            
            
            //Add cells to the row
           // highRow.setAttribute("id","c"+results.rows.item(i).id);
          // highRow.appendChild(id);
          highRow.appendChild(name);
          highRow.appendChild(score);
            //Add the row to the table
            document.getElementById("highscores").appendChild(highRow);
          }
        });
      });



}

window.addEventListener("load", listhighscores, true);