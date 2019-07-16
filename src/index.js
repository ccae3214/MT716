import ReactDOM from 'react-dom'
import { makeMainRoutes } from './routes'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css';
const routes = makeMainRoutes()

ReactDOM.render(
  routes,
  document.getElementById('root'),
)
registerServiceWorker()
