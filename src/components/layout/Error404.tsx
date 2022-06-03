import classes from "./Error404.module.css";

const Error404 = () => {
    return (
        <div className={classes["error"]}>
            <h1>Error 404</h1>
            <p>{"Woops, Looks like this page doesn't exist"}</p>
        </div>
    );
};
export default Error404;
