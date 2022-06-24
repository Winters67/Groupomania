import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [userData])


    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>

            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(
                                    usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === post.posterId) return user.picture;
                                }).join('')

                            }
                            alt=""
                        />
                    </div>
                </>
            )}

        </li>
    );
};

export default Card; 