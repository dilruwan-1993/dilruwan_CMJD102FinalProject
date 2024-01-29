import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/AuthSlice';
import axios from 'axios';
import { USER_LOGIN } from '../utils/urls';
import { useNavigate } from 'react-router-dom';
import { setPageDisplayName } from '../reducers/PagesSlice';
import { PAGE_POS, PAGE_STOCKS } from '../utils/pageName';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginError, setShowLoginError] = useState(false);


    const handleLogin = async () => {
        if (userEmail != '' && password != '') {
            const headers = {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
            await axios.post(USER_LOGIN, {
                userEmail: userEmail,
                userPassword: password
            }, headers)
                .then(function (response) {
                    if (response?.data?.statusCode === 200) {
                        let loggedUser = response?.data?.data;
                        dispatch(loginUser(loggedUser));
                        if (loggedUser?.userRole === "ADMIN") {
                            dispatch(setPageDisplayName(PAGE_STOCKS));
                            navigate('/stocks');
                        } else {
                            dispatch(setPageDisplayName(PAGE_POS));
                            navigate('/pos');
                        }
                    }

                })
                .catch(function (error) {
                    setShowLoginError(true);
                    console.log("Login error-- " + error);
                });
        } else {
            setShowLoginError(true);
        }
    };

    return (
        <>
            <div className="flex min-h-screen justify-center items-center flex-col px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-slate-200 p-6 rounded-md">
                    <div className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {showLoginError ?
                                <label className="basis-1/4 block text-sm font-thin leading-3 text-red-500 mb-3">
                                    Login Error occured. Please check your credatials.
                                </label>
                                : <></>}
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}