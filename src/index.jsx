// index.jsx
import ReactDOM from 'react-dom/client';
import { makeMainRoutes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
const MtRoutes = makeMainRoutes();
// 將 routes 渲染到 DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(MtRoutes);