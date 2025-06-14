const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function openDb() {
  return open({
    filename: path.join(__dirname, 'questions.db'),
    driver: sqlite3.Database
  });
}

async function getQuestions() {
  const db = await openDb();
  return db.all('SELECT * FROM questions');
}

module.exports = { getQuestions };
