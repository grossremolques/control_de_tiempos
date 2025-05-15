import TableComponent from "../components/TableComponent";
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import Modal from "../components/Modal";
import {Input, Select} from "../components/Forms";
import { Button } from "../components/Forms";
import Badge from "../components/Badge";
export default function Nesting() {
  const { nesting, getNesting, updateNesting, setResponseGeneral } =
    useGlobal();
  const { handleModalShow, handleModalClose, activeModal } = useModal();
  const [modalData, setModalData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    getNesting();
  }, []);
  useEffect(() => {
    if (nesting && nesting.length > 0) {
      setFilteredData(nesting);
    }
  }, [nesting]);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "80px",
    },
    {
      name: "Fecha",
      selector: (row) => {
        const dateSplit = row.fecha.split("-");
        const date = new Date(
          `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`
        );
        return date.toLocaleDateString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      width: "140px",
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
    },
    {
      name: "TN procesada",
      selector: (row) => row.tn_procesadas.toPrecision(5) || 0,
      width: "140px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "150px",
      cell: (row) => {
        return (
          <Badge
            text={row.status}
            color={
              row.status === "Nuevo"
                ? "blue"
                : row.status === "Recibido"
                ? "purple"
                : row.status === "PDF Generado"
                ? "yellow"
                : "green"
            }
          />
        );
      },
    },
    {
      name: "Fecha Recepción",
      selector: (row) => {
        if (!row.f_recepcion) return "";
        const dateSplit = row.f_recepcion?.split("-");
        const date =
          new Date(`${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`) || null;
        return date.toLocaleDateString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      width: "170px",
    },
    {
      name: "Fecha Cierre",
      selector: (row) => {
        if (!row.f_fin) return "";
        const dateSplit = row.f_fin?.split("-");
        const date =
          new Date(`${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`) || null;
        return date.toLocaleDateString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      width: "170px",
    },
  ];
  const handleOnRowClick = (row) => {
    setModalData(row);
    const status = row.status;
    if (status === "PDF Generado") {
      handleModalShow("modal-rebido");
    } else if (status === "Recibido") {
      handleModalShow("modal-fecha_fin");
    } else {
      setResponseGeneral({
        title: "Error",
        content: (
          <div className="flex flex-col gap-2">
            <p>No se puede modificar la orden</p>
            <code className="bg-red-100 px-4 py-2">
              No hay acciones en la orden con el estado: {status}
            </code>
          </div>
        ),
        variant: "error",
      });
      handleModalShow("modal-general");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {};
    if (activeModal === "modal-rebido") {
      const recepcion = document.getElementById("f_recepcion").value;
      formData.f_recepcion = recepcion;
      formData.status = "Recibido";
    } else if (activeModal === "modal-fecha_fin") {
      const fin = document.getElementById("f_fin").value;
      formData.f_fin = fin;
      formData.status = "Completado";
    }

    try {
      const { status, error } = await updateNesting(modalData.id, formData);
      if (error) {
        throw new Error(error.message);
      }
      if (status === 200) {
        setResponseGeneral({
          title: "Completado",
          content: (
            <div className="flex flex-col gap-2">
              <p>¡Se actualizo exitosamente!</p>
            </div>
          ),
          variant: "success",
        });
        getNesting();
      }
    } catch (e) {
      setResponseGeneral({
        title: "Error",
        content: (
          <div className="flex flex-col gap-2">
            <p>No se pudo actualizar la orden</p>
            <code className="bg-red-100 px-4 py-2">{e.message}</code>
          </div>
        ),
        variant: "error",
      });
    } finally {
      handleModalShow("modal-general");
    }
  };
  const handleFilter = () => {
    const searchID = document.getElementById("searchID").value;
    const searchStatus = document.getElementById("searchStatus").value;
    const data = nesting.filter((item) => {
      return (
        item.id.toLocaleString().includes(searchID) &&
        item.status.toLocaleString().includes(searchStatus)
      );
    });
    setFilteredData(data);
  };
  return (
    <div className="mt-6 ">
      {nesting.length > 0 && (
        <>
          <form className="flex gap-2 justify-end items-end mb-4">
            <Input
              label="Buscar por ID"
              type="search"
              id="searchID"
              placeholder="Buscar por ID"
            />
            <Select label="Status" id="searchStatus">
              <option value="Nuevo">Nuevo</option>
              <option value="PDF Generado">PDF Generado</option>
              <option value="Recibido">Recibido</option>
              <option value="Completado">Completado</option>
            </Select>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={handleFilter}
            >
              Buscar
            </Button>
          </form>
          <TableComponent
            columns={columns}
            data={filteredData}
            handleOnRowClick={handleOnRowClick}
          />
        </>
      )}
      {modalData && (
        <>
          <Modal
            title={`📄 Declaración de orden nro ${modalData.id}`}
            modalId="modal-fecha_fin"
            width="min-w-md"
          >
            <form className="w-full flex flex-col gap-4">
              <p>
                Toneladas procesadas en orden:{" "}
                <span className="text-blue-700 font-bold">
                  {modalData.tn_procesadas || 0} Tn
                </span>
              </p>
              <Input label="Fecha Fin" type="date" id="f_fin" />
              <footer className="mt-6 flex justify-end gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleModalClose}
                >
                  Cancelar
                </Button>
                <Button type="button" size="sm" onClick={handleSubmit}>
                  Guardar
                </Button>
              </footer>
            </form>
          </Modal>
          <Modal
            title={`📄 Recepción de orden nro ${modalData.id}`}
            modalId="modal-rebido"
            width="min-w-md"
          >
            <form className="w-full flex flex-col gap-4">
              <p>
                Toneladas a procesar en orden:{" "}
                <span className="text-blue-700 font-bold">
                  {modalData.tn_procesadas || 0} Tn
                </span>
              </p>
              <Input
                label="Fecha recepcion de orden"
                type="date"
                id="f_recepcion"
              />
              <footer className="mt-6 flex justify-end gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleModalClose}
                >
                  Cancelar
                </Button>
                <Button type="button" size="sm" onClick={handleSubmit}>
                  Guardar
                </Button>
              </footer>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
}
