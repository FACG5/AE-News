const test = require('tape');
const supertest = require('supertest');
const router = require('../src/handler');

test('Home routes', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Should Return 200');
      t.end();
    });
});

test('404 Error Page Test', (t) => {
  supertest(router)
    .get('/hello')
    .expect(404)
    .expect('Content-Type', 'text/html')
    .end((err) => {
      t.error(err);

      t.end();
    });
});

test('Test for get news from Api', (t) => {
  supertest(router)
    .post('/get')
    .send('eg')
    .expect(200)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, 'object', 'Response Should Be Array');
      t.equal(JSON.parse(res.text).articles.length, 20, 'length is 20');

      t.end();
    });
});

test('Test for get news from Api', (t) => {
  supertest(router)
    .post('/get')
    .send('dfdf')
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.equal(typeof res, 'object', 'Response Should Be Array');
      t.end();
    });
});

test('Test FOR POST without body ', (t) => {
  supertest(router)
    .post('/get')
    .expect(500)
    .end((err, res) => {
      t.error(err);

      t.equal(res.status, 500, 'Response Status is 403');
      t.equal(
        res.text,
        'Choose Country ! ',
        'Response Is Internal Server Error',
      );

      t.end();
    });
});