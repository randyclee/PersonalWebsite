// Modal.js
const Modal = ({ showModal, message, onSuccess, onContinue }) => {
    if (!showModal) return null;
  
    return (
      <div className="modal modal-open" style={{ zIndex: 50 }} >
        <div className="modal-box bg-white text-black border-black text-center">
          <p>{message}</p>
          {onSuccess ? (
            <button className="btn bg-gray-800 text-white mt-5" onClick={onSuccess}>Restart</button>
          ) : (
            <button className="btn bg-gray-800 text-white mt-5" onClick={onContinue}>Continue</button>
          )}
        </div>
      </div>
    );
  };
  
  
  export default Modal;
  