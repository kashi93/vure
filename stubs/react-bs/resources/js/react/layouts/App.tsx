import Navbar from "./Navbar";

export default function App({ children }: { [key: string]: any }) {
  return (
    <div id="app">
      <Navbar />
      <main className="py-4">{children}</main>
    </div>
  );
}
