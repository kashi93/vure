import DangerButton from "@/components/DangerButton"
import InputError from "@/components/InputError"
import InputLabel from "@/components/InputLabel"
import Modal from "@/components/Modal"
import SecondaryButton from "@/components/SecondaryButton"
import TextInput from "@/components/TextInput"
import { setFormError } from "@/helpers"
import authAxios from "@/helpers/authAxios"
import { useAuthenticateContext } from "@/middleware/Authenticate"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DeleteUserForm() {
    const { setUser } = useAuthenticateContext();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const modalHandler = () => setOpenModal((current: boolean) => !current);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<{ [key: string]: string[] }>({});
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await authAxios.post("profile-delete", { password });

        switch (response.status) {
            case 200:
                setUser(null);
                return navigate("/", { replace: true });
            case 422:
                setError(setFormError(response))
                break;
            default:
                break;

        }
    }

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <DangerButton onClick={() => setOpenModal((current: boolean) => !current)}>
                Delete Account
            </DangerButton>

            <Modal show={openModal} onClose={modalHandler}>
                <form onSubmit={submitForm} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />

                        <InputError messages={error.password || []} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton type="button" onClick={() => setOpenModal((current: boolean) => !current)}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ml-3">
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>

    )
}
