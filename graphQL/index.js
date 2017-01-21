import { loadGraph, loadSchema } from '../utils';

export default function(app) {
  loadGraph(app, __dirname);
  loadSchema(app);
}
