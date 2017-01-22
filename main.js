import express from 'express';
import { graphql } from 'graphql';
import BodyParser from 'body-parser';
import application from './app';

const APP_PORT = process.env.port;

const app = express();

app.use(BodyParser.json({ limit: '10mb' }));
app.use(BodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/public', express.static('public'));

app.post('/graphql', (req, res) => {
  application.services.authorization.auth(req.headers.authorization).then((currentUser) => {
    graphql(application.schema, req.body.query, req.body.source, currentUser, req.body.variables).then((result) => {
      res.send({ data: result });
    });
  });
});

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`); // eslint-disable-line no-console
});
