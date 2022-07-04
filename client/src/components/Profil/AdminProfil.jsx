import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import DeleteUser from "./DeleteUser";


const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            usersData.map((user) => {
                if (user._id !== userData._id)
                    return array.push(user._id);

            });

            setFriendsHint(array);
        };

        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [usersData, userData, playOnce]);

    return (
        <div className="get-StaffList-container">
            <h4>Liste du personel</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {friendsHint.map((user) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (user === usersData[i]._id) {
                                return (
                                    <li className="user-hint" key={user}>
                                        <img src={usersData[i].picture} alt="user-pic" />
                                        <p>{usersData[i].pseudo}</p>
                                        <div>
                                            <DeleteUser />
                                        </div>

                                    </li>
                                );
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;
