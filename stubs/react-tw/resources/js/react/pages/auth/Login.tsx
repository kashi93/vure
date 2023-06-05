import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"
import PrimaryButton from "@/components/PrimaryButton"
import Guest from "@/layouts/Guest"
import { useState } from "react"

import { setFormError } from "@/helpers"
import { Link, useNavigate } from "react-router-dom"
import guestAxios from "@/helpers/axiosGuest"

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await guestAxios.post("login", {
      email,
      password
    });

    switch (response.status) {
      case 200:
        return navigate("/home");
      case 422:
        setError(setFormError(response))
        break;
      case 401:
        const { message } = response.data;

        setError({
          email: [message]
        });
        break;
      default:
        break;

    }
  }

  return (
    <Guest>
      <form onSubmit={submitForm}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            className="block mt-1 w-full"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoFocus
            autoComplete="username"
          />
          <InputError messages={error.email || []} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            className="block mt-1 w-full"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <InputError messages={error.password || []} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" to="/register">
            Register Membership
          </Link>

          <PrimaryButton className="ml-3">
            Log in
          </PrimaryButton>
        </div>
      </form>
    </Guest>
  )
}
