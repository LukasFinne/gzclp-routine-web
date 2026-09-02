import {type ReactNode, useRef} from "react";
import {Button} from "./button.tsx";

interface ModalProps {
    title: string;
    btnStyle?: string;
    btnText?: string;
    modalAction?: ReactNode | ((closeModal: () => void) => ReactNode);
    children: ReactNode;
}

export const ViewModal = ({ title, btnStyle= "btn btn-ghost btn-square", btnText = "View", modalAction, children }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();

    return (
        <>
            <Button style={btnStyle} onClick={openModal}>
                {btnText}
            </Button>

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">{title}</h3>

                    <div className="py-2">{children}</div>

                    <div className="modal-action">
                        {typeof modalAction === "function"
                            ? modalAction(closeModal)
                            : (modalAction ?? (
                                <Button style="btn" onClick={closeModal}>
                                    Close
                                </Button>
                            ))}
                    </div>
                </div>

                {/* Backdrop: clicking outside the box closes the modal */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};