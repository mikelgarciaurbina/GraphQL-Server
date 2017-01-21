import schema from './graphQL/index';
import models from './db/index';
import services from './services/index';

const App = {};
models(App);
services(App);
schema(App);

export default App;
