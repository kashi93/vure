import Navigation from "@/layouts/Navigation";


export default function App({ children, header }: { [key: string]: any }) {
    const body = document.body;
    body.className = "font-sans antialiased";

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}