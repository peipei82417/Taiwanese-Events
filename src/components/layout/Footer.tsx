import classes from "./Footer.module.css";
import config from "constant/project-data/config";

const Footer = () => {
    return (
        <footer className={classes["footer"]}>
            <p>Last updated: {config.lastUpdate}</p>
        </footer>
    );
};

export default Footer;
