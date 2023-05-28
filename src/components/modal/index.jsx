import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ isOpen, children, onRequestClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <Overlay onClick={onRequestClose}>
            <Dialog onClick={(e) => e.stopPropagation()}>{children}</Dialog>
        </Overlay>,
        document.getElementById("modal-root")
    );
};

export default Modal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Dialog = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    max-width: 500px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
