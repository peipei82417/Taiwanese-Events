import Link from "next/link";
import classes from "./Header.module.css";
import Navigetion from "./Navigetion";

const MainHeader = () => {
    return (
        <header className={classes["header"]}>
            <div className={classes["container"]}>
                <div className={classes.logo}>
                    <Link href="/">Events</Link>
                </div>
                <Navigetion />
            </div>
        </header>
    );
};

export default MainHeader;
