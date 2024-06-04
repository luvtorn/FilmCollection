import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { observer } from 'mobx-react'

const App = observer(() => {
  return <RouterProvider router={router} />
})

export default App
