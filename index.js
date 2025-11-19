

const sqlite3 = require('sqlite3');


const db = new sqlite3.Database('./scholl.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {


    return console.error(err.message);


  } else {

    return console.log('Connected to the SQLite database.');
  }



});



const table = `CREATE TABLE student(id INTEGER PRIMARY KEY,  s_id, fristname , surname,  course)`;


db.run(table, (err) => {
  if (err) {

    return console.error(err.message);

  } else {

    return console.log('Table created.');
  }


}


)



let insert = `INSERT INTO student( s_id, fristname, surname, course) VALUES( '002', 'mane', 'doe', '?')`;
db.run(insert, (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    return console.log('Row inserted');
  }
});



let select = `SELECT * FROM student`;
db.all(select, (err, rows) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log(rows);
  }
});

const update = `UPDATE student SET course = 'web' WHERE s_id = '001'`;
db.run(update, (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    return console.log('Row updated');
  }
});


// const delet = `DELETE FROM student WHERE s_id = 's001'`;
// db.run(delet, (err) => {
//   if (err) {
//     return console.error(err.message);
//   } else {
//     return console.log('Row deleted');
//   }
// });