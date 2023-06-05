import App from '@/layouts/App'
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm'
import UpdatePasswordForm from './partials/UpdatePasswordForm'
import DeleteUserForm from './partials/DeleteUserForm'


export default function Profile() {
    return (
        <App header="Profile">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="max-w-xl">
                            <UpdateProfileInformationForm/>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <UpdatePasswordForm/>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-xl">
                            <DeleteUserForm/>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
