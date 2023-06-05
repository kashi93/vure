import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"
import PrimaryButton from "@/components/PrimaryButton"
import Guest from "@/layouts/Guest"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setFormError } from "@/helpers"
import guestAxios from "@/helpers/axiosGuest"

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await guestAxios.post("register", {
      name,
      email,
      password,
      password_confirmation
    });

    switch (response.status) {
      case 200:
        guestAxios.post("login", {
          email,
          password
        }).then(response => {
          switch (response.status) {
            case 200:
              return navigate("/home");
            default:
              return navigate("/login");

          }
        })
        break;
      case 422:
        setError(setFormError(response))
        return false;
      case 401:
        const { message } = response.data;

        setError({
          email: [message]
        });

        return false;
      default:
        return false;

    }
  }

  return (
    <Guest>
      <form onSubmit={submitForm}>
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            className="block mt-1 w-full"
            type="text"
            autoFocus
            autoComplete="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <InputError messages={error.name || []} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            className="block mt-1 w-full"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            autoComplete="new-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <InputError messages={error.password || []} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            className="block mt-1 w-full"
            type="password"
            autoComplete="new-password"
            value={password_confirmation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
          />
          <InputError messages={error.password_confirmation || []} className="mt-2" />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Link className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" to="/login">
            Already registered?
          </Link>
          <PrimaryButton className="ml-4">
            Register
          </PrimaryButton>
        </div>
      </form>
    </Guest>
  )
}
