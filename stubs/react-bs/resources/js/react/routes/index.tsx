import { lazy } from "react";
import { Route, Routes, } from "react-router-dom";
import Welcome from "@/pages/welcome/Welcome";
import Authenticate from "@/middleware/Authenticate";

const Login = lazy(() => import("@/pages/auth/Login"))
const Register = lazy(() => import("@/pages/auth/Register"))
const Home = lazy(() => import("@/pages/home/Home"))
const PageNotFound = lazy(() => import("@/components/page_not_found/PageNotFound"))

export default function index() {
  return (
    <Authenticate>
      <Routes>
        <Route element={<Authenticate.Guest />}>
          <Route path="/" element={<Welcome />} />
        </Route>
        <Route element={<Authenticate.RedirectIfAuthenticated />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Authenticate.Secure />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Authenticate>
  )
}
