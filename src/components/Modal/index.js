import "./modal.styles.scss";

const Modal = ({ children }) => {
  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
