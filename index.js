const express = require('express');
const app = express();
const port = 3333;
let entrata,uscita;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("compito.db");

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




app.post('/ticket', (req, res) => {
  let id = Math.random();
 entrata= Date.now();
  console.log(entrata);
    db.run(`INSERT INTO ticket (id, time_in) VALUES (?,?)`, id, entrata , (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "id": id
        }
        res.status(201).send(response);
    });
});




//con postman
app.put('/ticket/:id', (req, res) => {
     uscita = Date.now(); //modifica biglietto con specifico id
     const costo = ((uscita - entrata)/1000/60);
    db.run(`UPDATE ticket SET time_out = (?), prezzo = (?) WHERE id = (?)`, [uscita,costo,req.params.id],  (error, result) => { //aggiorna lo stato e calcola il prezzo
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(201).send(response);
    });
});





    app.get('/ticket/:id', (req, res) => { //seleziona un biglietto con uno specifico id 
    db.all(`SELECT * FROM ticket WHERE id= ?`, req.params.id, (error, rows) => {
        if(error){ //se errore crea questo oggetto
            console.log(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = { 
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});



//con postman
app.delete('/ticket/:id', (req, res) => {
    db.run(`DELETE FROM ticket WHERE id = ?`, req.params.id , (error, result) => { //cancella biglietto con id specificato
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(200).send(response);
    });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


   