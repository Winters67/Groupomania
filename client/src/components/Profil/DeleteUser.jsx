import React from "react";
import { delete_user } from "../../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";







const DeleteUser = () => {
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const deleteUser = () => dispatch(delete_user(usersData._id))
    console.log(usersData)


    return (



        <button onClick={() => {

            if (window.confirm('Voulez-vous supprimer votre profil ? ')) {
                deleteUser();
                localStorage.clear();

            }

        }}
        >

            Supprimer le profil

        </button>
    );
};

export default DeleteUser;
