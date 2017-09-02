exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "term"; ALTER SEQUENCE term_id_seq RESTART WITH 74;')
    .then(function () {
      var terms = [{
        id: 1,
        name: 'Abstraction',
      },
       {
        id: 2,
        name: 'Algorithm'
      },
      {
        id: 3,
        name: 'Abstraction'
      },{
        id: 4,
        name: 'Anti-pattern'
      },{
        id: 5,
        name: 'Artifacts'
      },{
        id: 6,
        name: 'Assembly'
      },{
        id: 7,
        name: 'Await (Async)'
      },{
        id: 8,
        name: 'Base64'
      },{
        id: 9,
        name: 'Bash'
      },{
        id: 10,
        name: 'BDD'
      },{
        id: 11,
        name: 'Breakpoint'
      },{
        id: 12,
        name: 'Build (dist)'
      },{
        id: 13,
        name: 'Call Stack'
      },{
        id: 14,
        name: 'CI/CD'
      },{
        id: 15,
        name: 'Closure'
      },{
        id: 16,
        name: 'Code Freeze'
      },{
        id: 17,
        name: 'Code Smell'
      },{
        id: 18,
        name: 'Constructor'
      },{
        id: 19,
        name: 'Convention Over Configuration'
      },{
        id: 20,
        name: 'Currying'
      },{
        id: 21,
        name: 'Debug'
      },{
        id: 22,
        name: 'Dependency Injection'
      },{
        id: 23,
        name: 'DRY'
      },{
        id: 24,
        name: 'Encapsulate'
      },{
        id: 25,
        name: 'ERD'
      },{
        id: 26,
        name: 'Event Bubbling'
      },{
        id: 27,
        name: 'Event Delegation'
      },{
        id: 28,
        name: 'Expression'
      },{
        id: 29,
        name: 'Float (Data-Type)'
      },{
        id: 30,
        name: 'Framework'
      },{
        id: 31,
        name: 'FTP'
      },{
        id: 32,
        name: 'Happy Path'
      },{
        id: 33,
        name: 'Hoisting'
      },{
        id: 34,
        name: 'Immutable'
      },{
        id: 35,
        name: 'Instance (OOP)'
      },{
        id: 36,
        name: 'GOAT(TOM BRADY)'
      },{
        id: 37,
        name: 'Integration Tests'
      },{
        id: 38,
        name: 'Interface (OOP)'
      },{
        id: 39,
        name: 'Interpolation'
      },{
        id: 40,
        name: 'JWT'
      },{
        id: 41,
        name: 'Kanban'
      },{
        id: 42,
        name: 'LAMBDA'
      },{
        id: 43,
        name: 'Linter'
      },{
        id: 44,
        name: 'Map-Reduce'
      },{
        id: 45,
        name: 'Method (functions)'
      },{
        id: 46,
        name: 'Middleware'
      },{
        id: 47,
        name: 'Mock (testing)'
      },{
        id: 48,
        name: 'Module Loader'
      },{
        id: 49,
        name: 'NoSQL'
      },{
        id: 50,
        name: 'Obfuscate'
      },{
        id: 51,
        name: 'Operator (JS)'
      },{
        id: 52,
        name: 'Parse'
      },{
        id: 53,
        name: 'Promise'
      },{
        id: 54,
        name: 'Race Condition'
      },{
        id: 55,
        name: 'Rebase'
      },{
        id: 56,
        name: 'Regression'
      },{
        id: 57,
        name: 'Sandbox'
      },{
        id: 58,
        name: 'Semver'
      },{
        id: 59,
        name: 'Shell'
      },{
        id: 60,
        name: 'SPA (App)'
      },{
        id: 61,
        name: 'Spaghetti Code'
      },{
        id: 62,
        name: 'Sprint'
      },{
        id: 63,
        name: 'Statically Typed'
      },{
        id: 64,
        name: 'TDD'
      },{
        id: 65,
        name: 'Trampoline'
      },{
        id: 66,
        name: 'Transaction (DB)'
      },{
        id: 67,
        name: 'Transpile'
      },{
        id: 68,
        name: 'Unit Tests'
      },{
        id: 69,
        name: 'UUID'
      },{
        id: 70,
        name: 'Velocity'
      },{
        id: 71,
        name: 'Wrapper'
      },{
        id: 72,
        name: 'Acceptence Tests'
      },{
        id: 73,
        name: 'Whats Up Buttholes (Kyle)'
      }];
      return knex('term').insert(terms);
    });
};
