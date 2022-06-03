import classes from "./AddToListBtn.module.css";
import { useState } from "react";
import { patchEventToFavoriteList } from "utils/api-util";
import { getSession, getProviders } from "next-auth/react";
import { useDispatch } from "react-redux";
import { modalActions } from "store/modal";

interface AddToListProps {
    details: EventDetail;
    isFavorite: boolean;
}

const AddToListBtn = (props: AddToListProps) => {
    const { details } = props;

    const [isFavorite, setIsFavorite] = useState(props.isFavorite);

    const dispatch = useDispatch();

    const popSigninForm = () => {
        getProviders().then((providers) =>
            dispatch(modalActions.needsignin({ providers: providers }))
        );
    };

    const addToList = () => {
        getSession().then((session) => {
            if (session) {
                setIsFavorite(() => !isFavorite);
                const event: EventSummary = {
                    UID: details.UID,
                    title: details.title,
                    city: details.city,
                    category: details.category,
                    imageUrl: details.imageUrl,
                    startDate: parseInt(details.startDate),
                    endDate: parseInt(details.endDate),
                    hitRate: details.hitRate,
                };
                patchEventToFavoriteList(session.user.email, event);
            } else {
                popSigninForm();
            }
        });
    };

    return (
        <div className={classes["icon"]} onClick={addToList}>
            {isFavorite ? (
                <svg viewBox="0 0 20 20" fill="#ff4500">
                    <path d="M17.19 4.155c-1.672-1.534-4.383-1.534-6.055 0l-1.135 1.042-1.136-1.042c-1.672-1.534-4.382-1.534-6.054 0-1.881 1.727-1.881 4.52 0 6.246l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.246z"></path>
                </svg>
            ) : (
                <svg viewBox="0 0 20 20">
                    <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path>
                </svg>
            )}
            {isFavorite ? <p>&nbsp;移除收藏</p> : <p>&nbsp;加入收藏</p>}
        </div>
    );
};

export default AddToListBtn;
