import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { modalActions } from "store/modal";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("components/ui/modal/Modal"), {
    ssr: false,
});

const Layout = (props: any) => {
    const dispatch = useDispatch();

    const isShow = useSelector<RootState, boolean>(
        (state) => state.modal.isShow
    );
    const title = useSelector<RootState, string>((state) => state.modal.title);
    const content = useSelector<RootState, JSX.Element>(
        (state) => state.modal.content
    );

    const closeModalHandler = (e) => {
        e.preventDefault();
        dispatch(modalActions.cancel());
    };

    return (
        <Fragment>
            <div className={classes["layout"]}>
                <Header />
                <main className={classes["main"]}>{props.children}</main>
                <Footer />
            </div>
            {isShow && (
                <Modal
                    content={content}
                    title={title}
                    onClose={(e) => closeModalHandler(e)}
                />
            )}
        </Fragment>
    );
};
export default Layout;
