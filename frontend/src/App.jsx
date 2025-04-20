import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';



const App = () => (
  <Routes>
  <Route path="*" element={<Landing />}/>

</Routes>

);

export default App;
