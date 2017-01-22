import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const eachFileIn = function(folderPath, callback, foldersOnly = false) {
  const folderExist = fs.existsSync(folderPath);
  if (folderExist) {
    fs.readdirSync(folderPath).forEach((file) => {
      const isFolder = fs.statSync(path.join(folderPath, file)).isDirectory();
      const fullpath = `${folderPath}/${file}`;
      if (foldersOnly === isFolder) {
        callback(file, fullpath);
      }
    });
  }
};

const loadGraph = function(app, dirname = __dirname) {
  app.graphs = app.graphs || {}; // eslint-disable-line no-param-reassign
  eachFileIn(dirname, (folder, folderFullpath) => {
    app.graphs[folder] = app.graphs[folder] || {}; // eslint-disable-line no-param-reassign
    ['type'].forEach((type) => {
      if (fs.existsSync(`${folderFullpath}/${type}.js`)) {
        app.graphs[folder][type] = require(folderFullpath+'/'+type).default(app); // eslint-disable-line
      }
    });
  }, true);
  eachFileIn(dirname, (folder, folderFullpath) => {
    app.graphs[folder] = app.graphs[folder] || {}; // eslint-disable-line no-param-reassign
    ['query'].forEach((type) => {
      if (fs.existsSync(`${folderFullpath}/${type}.js`)) {
        app.graphs[folder][type] = require(folderFullpath+'/'+type).default(app); // eslint-disable-line
      }
    });
    if (fs.existsSync(`${folderFullpath}/mutations`)) {
      app.graphs[folder].mutations = app.graphs[folder].mutations || {}; // eslint-disable-line no-param-reassign
      eachFileIn(`${folderFullpath}/mutations`, (file, fullpath) => {
        if (file.substr(file.length - 3) === '.js') {
          app.graphs[folder].mutations[file.replace('.js', '')] = require(fullpath).default(app); // eslint-disable-line
        }
      });
    }
  }, true);

  return app.graphs;
};

const loadSchema = function(app) {
  function createQueryObject(graphs) {
    const fieldClients = {};
    for(let field in graphs) { // eslint-disable-line
      fieldClients[field] = graphs[field].query || graphs[field].client;
    }
    return fieldClients;
  }

  function createMutationObject(graphs) {
    const fieldMutations = {};
    for(let type in graphs) { // eslint-disable-line
      for(let field in graphs[type].mutations){ // eslint-disable-line
        fieldMutations[field] = graphs[type].mutations[field];
      }
    }
    return fieldMutations;
  }

  app.schema = new GraphQLSchema({ // eslint-disable-line no-param-reassign
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => (
        createQueryObject(app.graphs)
      ),
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutations',
      fields: () => (
        createMutationObject(app.graphs)
      ),
    }),
  });

  return app.schema;
};

const loadServices = function(app, dirname, name = 'services') {
  app[name] = app[name] || {}; // eslint-disable-line no-param-reassign

  eachFileIn(dirname, (folder, folderFullpath) => {
    app[name][folder] = {}; // eslint-disable-line no-param-reassign
    eachFileIn(folderFullpath, (file, fullpath) => {
      if (file.substr(file.length - 3) === '.js') {
        app[name][folder][file.replace('.js', '')] = require(fullpath).default(app); // eslint-disable-line
      }
    });
  }, true);

  return app[name];
};

const createToken = function(data) {
  return jwt.sign(data, process.env.token_secret);
};

const verifyToken = function(token) {
  let result;
  if (token) {
    try {
      result = jwt.verify(token, process.env.token_secret);
    } catch (err) {
      result = 'Token error';
    }
    return result;
  }
  return {};
};

export { createToken, eachFileIn, loadGraph, loadSchema, loadServices, verifyToken };
