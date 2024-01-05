const pg = require('pg')
const client = new pg.Client('process.env.DATABASE_URL || postgres://localhost/thing_tracker')

const seed = async() => {

    const SQL = `
    DROP TABLE IF EXISTS things;
    DROP TABLE IF EXISTS users;
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );

    CREATE TABLE things(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE,
      user_id INTEGER REFERENCES users(id)
    );

    INSERT INTO users (name) VALUES ('Moe');
    INSERT INTO users (name) VALUES ('Lucy');
    INSERT INTO users (name) VALUES ('John');
    INSERT INTO users (name) VALUES ('Jill');

    INSERT INTO things (name, user_id) VALUES(
      'foo',
      (SELECT id FROM users WHERE name = 'Moe')
    );

    INSERT INTO things (name, user_id) VALUES(
        'bar',
        (SELECT id FROM users WHERE name = 'Moe')
    );

    INSERT INTO things (name) VALUES ('buzz');
    INSERT INTO things (name) VALUES ('quq');
  `;

  await client.query(SQL)
  console.log("created and seeded db")
}

module.exports = {
    client,
    seed
}