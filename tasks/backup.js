const environment = 'production'

const config = require('../knexfile.js')[environment]
const db = require('knex')(config)
const fs = require('fs')

dumpDatabaseTo(`backups/studybook-dump-${Date.now()}.json`)

function dumpDatabaseTo(path) {
  return Promise.all([
    db('book'),
    db('term'),
    db('term_topic'),
    db('topic'),
    db('question'),
    db('question_term'),
    db('question_topic'),
  ]).then(([
    book,
    term,
    term_topic,
    topic,
    question,
    question_term,
    question_topic
  ]) => {
    const results = {
      book,
      term,
      term_topic,
      topic,
      question,
      question_term,
      question_topic
    }
    return fs.writeFile(path, JSON.stringify(results), 'utf-8', (err, result) => {
      if (err) {
        console.log(`ERROR:`, err)
        return Promise.reject(err)
      }

      console.log(`Result:`)
      for (const table in results) {
        console.log(table, results[table].length)
      }

      process.exit(0)
    })
  })
}
