

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "question"; ALTER SEQUENCE question_id_seq RESTART WITH 3;')
    .then(function () {
      var questions = [{
        id: 1,
        title: `Tell me about a single-page application you've written or worked on`,
        answer: ``
      },
       {
        id: 2,
        title: `What are Unit Tests used for?`,
        answer: `Unit Tests are testing each unit of code (the individual function or task)`
      }];
      return knex('question').insert(questions);
    });
};
