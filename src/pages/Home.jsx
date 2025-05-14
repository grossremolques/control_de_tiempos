import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-xl">¡Hola 👋, {user.nombre}!</h1>
    </>
  );
}
