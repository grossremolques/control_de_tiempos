import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Modal from "./Modal";
import { useGlobal } from "../context/GlobalContext";
export default function Layout() {
  const { responseGeneral } = useGlobal();
  const { auth, getAuth, getUser, user } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  useEffect(() => {
    if (auth) getUser();
  }, [auth]);
  return (
    <>
      {auth && user && (
        <>
          <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Outlet />
          </div>
          {responseGeneral && (
            <Modal modalId="modal-general" title={responseGeneral.title} variant={responseGeneral.variant}>
              {responseGeneral.content}
            </Modal>
          )}
        </>
      )}
    </>
  );
}
