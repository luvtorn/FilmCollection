<<<<<<< Updated upstream
import Tabs from "./components/Tabs/MyTabs";
=======
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { observer } from 'mobx-react'
>>>>>>> Stashed changes

function App() {
  return (
    <div className="main-content">
      <Tabs />
    </div>
  );
}

export default App;
