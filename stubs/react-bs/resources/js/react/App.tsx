import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "@/routes";

function App() {
  return (
    <Suspense>
      <BrowserRouter>
       <Routes/>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
