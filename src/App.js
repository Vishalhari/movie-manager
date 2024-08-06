

import { BrowserRouter } from "react-router-dom";
import Userroutes from './routes/Userroutes';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
   <Userroutes/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
