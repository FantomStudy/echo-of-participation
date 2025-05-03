import { useLocation } from "react-router-dom";
import Header from "@components/Header/Header";

export default function Layout({ children }) {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/not-found", "/admin/add-user"];

  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}
