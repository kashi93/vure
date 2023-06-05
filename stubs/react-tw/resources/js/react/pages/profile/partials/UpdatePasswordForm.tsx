import InputError from "@/components/InputError"
import InputLabel from "@/components/InputLabel"
import PrimaryButton from "@/components/PrimaryButton"
import TextInput from "@/components/TextInput"
import { setFormError } from "@/helpers"
import authAxios from "@/helpers/authAxios"
import { useState } from "react"

export default function UpdatePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState<{ [key: string]: string[] }>({});
    const [isSuccess, setIsSuccess] = useState(false);
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await authAxios.post("password-update", {
            current_password: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation,
        });

        switch (response.status) {
            case 200:
                setCurrentPassword("");
                setPassword("");
                setPasswordConfirmation("");
                setIsSuccess(() => true);

                setTimeout(() => {
                    setIsSuccess(() => false);
                }, 1000);
                break;
            case 422:
                setError(setFormError(response))
                break;
            default:
                break;

        }
    }
    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={submitForm} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <TextInput id="current_password" name="current_password" type="password" className="mt-1 block w-full" autoComplete="current-password" value={currentPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} />
                    <InputError messages={error.current_password || []} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput id="password" name="password" type="password" className="mt-1 block w-full" autoComplete="new-password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}  />
                    <InputError messages={error.password || []} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" name="password_confirmation" type="password" className="mt-1 block w-full" autoComplete="new-password" value={passwordConfirmation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}  />
                    <InputError messages={error.password_confirmation || []} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>Save</PrimaryButton>
                    <p className="text-sm text-gray-600">{isSuccess && "Saved."}</p>
                </div>
            </form>
        </section>
    )
}
