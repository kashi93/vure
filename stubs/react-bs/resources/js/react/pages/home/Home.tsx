import App from "@/layouts/App";

export default function Home() {
  return (
    <App>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Dashboard</div>
              <div className="card-body">You are logged in!</div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
