import { signIn } from "next-auth/react";
import { SignInProps } from "pages/auth";
import classes from "./SignInForm.module.css";
import SigninList from "./SigninList";

const SignInForm = (props: SignInProps) => {
    const { providers } = props;

    return (
        <section className={classes["container"]}>
            <SigninList providers={providers} />
        </section>
    );
};
export default SignInForm;
