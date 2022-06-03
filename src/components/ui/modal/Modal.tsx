import { Fragment, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps {
    onClose: MouseEventHandler<HTMLDivElement>;
    title: string;
    content: JSX.Element;
}

interface BackdropProps {
    onClose: MouseEventHandler<HTMLDivElement>;
}

interface ContentProps {
    title: string;
    content: JSX.Element;
    onClose: any;
}

const Backdrop = (props: BackdropProps) => {
    return <div className={classes["backdrop"]} onClick={props.onClose}></div>;
};

const Window = (props: ContentProps) => {
    const { title, content, onClose } = props;
    return (
        <div className={classes["window"]}>
            <button className={classes["close-btn"]} onClick={onClose}>
                Ｘ關閉
            </button>
            <div>{title}</div>
            {content}
        </div>
    );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const Modal = (props: ModalProps) => {
    const { title, content, onClose } = props;

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <Window title={title} content={content} onClose={onClose} />,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
