import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserData } from "@/shared/hooks/business/queries/useUserData";
import { routes } from "@configs/routesConfig";
import Layout from "@components/Layout/Layout";
import Loader from "@components/Loader/Loader";
import "./App.css";

export default function App() {
  const { isLoading, error } = useUserData();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>ERROR...</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
