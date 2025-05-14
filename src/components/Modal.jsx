import { useModal } from "../context/ModalContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
export default function Modal({
  title,
  modalId,
  width = "min-w-sm",
  variant='default',
  children,
}) {
  const { activeModal, handleModalClose } = useModal();
  const show = activeModal === modalId;
  const variants = {
    default : {
      text: "text-gray-800",
    },
    success : {
      text: "text-green-600",
    },
    error : {
      text: "text-red-600",
    },
  }
  return (
    <div
      id={modalId}
      className={`fixed inset-0 z-50 grid place-content-center bg-black/50 p-4  ${
        !show && "hidden"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className={`${width} max-w-md rounded-lg bg-white p-6 shadow-lg`}>
        <div className="flex items-center justify-between">
        <h2
          id="modalTitle"
          className={`text-xl font-bold ${variants[variant].text}`}
        >
          {title}
        </h2>
        <button
          type="button"
          className="cursor-pointer text-gray-400 hover:text-red-600"
          onClick={handleModalClose}><XCircleIcon className="w-7"/></button>
        
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
