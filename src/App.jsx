import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "@components/Layout/Layout";
import Loader from "@components/Loader/Loader";
import { routes } from "@configs/routesConfig";
import { useCurrentUser } from "@hooks/business/queries/useCurrentUser";

import "./App.css";

export default function App() {
  const { isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Не удалось получить данные пользователя</div>;
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
