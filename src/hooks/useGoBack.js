import { useNavigate, useLocation } from "react-router-dom";

export function useGoBack() {
  const navigate = useNavigate();
  const location = useLocation();

  // Фолбек — якщо немає from, беремо поточну location.search
  const defaultPath = location.pathname.includes("/movies/")
    ? { pathname: "/movies", search: location.search }
    : "/";

  return (e) => {
    e?.preventDefault?.();
    navigate(location.state?.from || defaultPath);
  };
}