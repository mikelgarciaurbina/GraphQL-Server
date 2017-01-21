import _ from 'lodash';
import path from 'path';
import Umzug from 'umzug';
import Sequelize from 'sequelize';
import { eachFileIn } from '../utils';

const Conn = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_password,
  {
    dialect: process.env.db_type,
    host: process.env.db_host,
  },
);

export default function(app) {
  app.models = app.models || {}; // eslint-disable-line no-param-reassign
  eachFileIn(path.join(__dirname, 'models'), (file) => {
    if (file.substr(file.length - 3) === '.js') {
      app.models[file.replace('.js', '')] = require('./models/'+file).default(Conn); // eslint-disable-line
    }
  });

  _.forEach(app.models, (model) => {
    model.createAssociations(app.models);
  });

  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      tableName: 'UserSequelizeMeta',
      sequelize: Conn,
    },
    migrations: {
      params: [Conn.getQueryInterface(), Conn.constructor],
      path: './db/migrations',
      pattern: /^\d+[\w-]+\.js$/,
    },
  });

  app.models._ready = new Promise((resolve) => { // eslint-disable-line
    umzug.pending().then((migrations) => {
      if (migrations.length === 0) {
        resolve();
      }
      migrations = migrations.map(migration => ( // eslint-disable-line no-param-reassign
        migration.file.replace(/\.js$/, '')
      ));
      umzug.execute({
        migrations,
        method: 'up',
      }).then(() => {
        resolve();
      });
    });
  });

  return app.models;
}
