import Link from "next/link";
import classes from "./Navigetion.module.css";
import UserList from "components/ui/user-list/UserList";

const Navigetion = () => {
    return (
        <nav className={classes["navigation"]}>
            <ul>
                <li>
                    <Link href="/about">關於</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="/allevent">查詢所有活動</Link>
                </li>
                <li>
                    <UserList />
                </li>
            </ul>
        </nav>
    );
};

export default Navigetion;
