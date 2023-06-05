import InputError from "@/components/InputError"
import InputLabel from "@/components/InputLabel"
import PrimaryButton from "@/components/PrimaryButton"
import TextInput from "@/components/TextInput"
import { setFormError } from "@/helpers"
import authAxios from "@/helpers/authAxios"
import { useAuthenticateContext } from "@/middleware/Authenticate"
import { useEffect, useState } from "react"

export default function UpdateProfileInformationForm() {
    const { user } = useAuthenticateContext();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [error, setError] = useState<{ [key: string]: string[] }>({});
    const [isSuccess,setIsSuccess] = useState(false);
    const submitForm = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await authAxios.post("profile-update",{name,email});

        switch (response.status) {
            case 200:
                setIsSuccess(()=>true);

                setTimeout(() => {
                    setIsSuccess(()=>false);
                }, 1000);
              break;
            case 422:
              setError(setFormError(response))
              break;
            default:
              break;
      
          }
    }

    useEffect(()=>{
        if(user != null){
            setName(user.name);
            setEmail(user.email);
        }
    },[])

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submitForm} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput id="name" name="name" type="text" className="mt-1 block w-full" autoFocus autoComplete="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    <InputError className="mt-2" messages={error.name || []} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" name="email" type="email" className="mt-1 block w-full" autoComplete="username" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <InputError className="mt-2" messages={error.email || []} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>Save</PrimaryButton>
                    <p className="text-sm text-gray-600">{isSuccess && "Saved."}</p>
                </div>
            </form>
        </section>
    )
}
