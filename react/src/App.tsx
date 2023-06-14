import { Outlet } from "react-router-dom"
import "./style/app.css";
import "normalize.css"
//import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
    {/*<MantineProvider
    withGlobalStyles
    withNormalizeCSS>*/}
    <Outlet />
    {/*</MantineProvider>*/}
    </>
  )
}

export default App
