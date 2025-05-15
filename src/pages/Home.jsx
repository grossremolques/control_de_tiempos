import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center mt-20">
      <h1 className="text-2xl">¡Hola 👋, {user.nombre}!</h1>
    </div>
  );
}
