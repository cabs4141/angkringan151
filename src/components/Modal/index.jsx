import React from "react";

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <>
      <dialog id="my_modal_1" className="modal" open>
        <div className="modal-box">
          <h3 className="font-bold font-opensauce text-lg">Sign Out</h3>
          <p className="py-4 font-opensauce"> Anda yakin ingin keluar?</p>
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>
              Batal
            </button>
            <button className="btn btn-error text-white" onClick={onConfirm}>
              Keluar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
