const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Confirmer</button>
          <button onClick={onCancel} className="cancel-button">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
