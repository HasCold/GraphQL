import NavBar from "./layout/NavBar"
import {useRoutes} from "react-router"
import { routes } from "./routes"

function App() {

  const element = useRoutes(routes);

  return (
    <>
    <div>
      <NavBar />
      {element}
    </div>
    </>
  )
}

export default App
