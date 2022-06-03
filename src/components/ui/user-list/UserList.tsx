import classes from "./UserList.module.css";
import Link from "next/link";
import { useSession, signOut, getProviders } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { modalActions } from "store/modal";
import { useDispatch } from "react-redux";

export const DropDown = () => {
    const signOutHandler = () => {
        signOut();
    };

    return (
        <div className={classes["drop-down"]}>
            <Link href="/favorite" passHref>
                <div>
                    <svg viewBox="0 0 20 20">
                        <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path>
                    </svg>
                    我的收藏
                </div>
            </Link>
            <Link href="/" passHref>
                <div onClick={signOutHandler}>
                    <svg viewBox="0 0 32 32">
                        <path d="M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z"></path>
                    </svg>
                    登出
                </div>
            </Link>
        </div>
    );
};

export const DropDownBtn = (props: any) => {
    const { session } = props;

    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const btnRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const clickBtnHandler = (): void => {
        if (!isDropDownActive) {
            document.addEventListener("mousedown", clickDownHandler, true);
        }
        setIsDropDownActive(() => !isDropDownActive);
    };

    const clickDownHandler = (e: any): void => {
        const isClickInside =
            btnRef.current && !btnRef.current.contains(e.target) ? false : true;

        if (!isClickInside) {
            document.removeEventListener("mousedown", clickDownHandler, true);
            setIsDropDownActive(false);
        }
    };

    useEffect(() => {
        setIsDropDownActive(false);
    }, [router]);

    return (
        <div ref={btnRef} className={classes["user-btn"]}>
            <div onClick={clickBtnHandler}>
                <p>{session.user.name}</p>
            </div>
            {isDropDownActive && <DropDown />}
        </div>
    );
};

const UserList = () => {
    const { data: session, status } = useSession();

    const dispatch = useDispatch();

    if (status === "loading") {
        return <div>wait...</div>;
    }

    const popSignInForm = () => {
        getProviders().then((providers) =>
            dispatch(modalActions.signin({ providers: providers }))
        );
    };

    if (!session) {
        return (
            <li className={classes["signin-btn"]} onClick={popSignInForm}>
                登入
            </li>
        );
    } else {
        return <DropDownBtn session={session} />;
    }
};

export default UserList;
