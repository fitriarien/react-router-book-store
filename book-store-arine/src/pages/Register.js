import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const location = useLocation();

    const [ userRegist, setUserRegist ] = useState({
        email: "",
        password: "",
        user_detail: {
            name: "",
            address: "",
            gender: "",
            birthDate: "",
            balance: 1000
        }
    });

    function handleChange(e) {
        const { id, value } = e.target;

        setUserRegist(currState => {
            if (id === "name" || id === "address" || id === "birthDate") {
                return { ...currState, user_detail: { ...currState.user_detail, [ id ]: value }};
            } else if ( id === "gender" ) {
                return { ...currState, user_detail: { ...currState.user_detail, [ id ]: e.target.select.value }};
            } else {
                return { ...currState, [ id ]: value };
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userRegist);
        createAccount();
    }

    function createAccount() {
        fetch('http://localhost:8080/register', {
            method: 'POST',
            body: JSON.stringify({
                email: userRegist.email,
                password: userRegist.password,
                user_detail: [
                    {
                        name: userRegist.user_detail.name,
                        address: userRegist.user_detail.address,
                        gender: userRegist.user_detail.gender,
                        birthDate: userRegist.user_detail.birthDate,
                        balance: userRegist.user_detail.balance
                    }
                ]
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token )
            if (location.state) {
                navigate(`${location.state.from.pathname}`)
            } else {
                navigate('/');
            }
            console.log("Register success.");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="mx-auto max-w-screen-md py-5 px-10">
            <div className="mb-10" id="header">
                <h2 className="mt-5 text-center text-3xl font-bold text-gray-900">
                    Register your account 
                </h2>
                <p className="mt-2 text-center text-sm text-gray-700">
                    Already have an account? <span> </span>
                <NavLink to='/sign-in' className="font-medium text-blue-800 hover:text-blue-500">
                    Login
                </NavLink>
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    <div className="my-5">
                        <label htmlFor='email' className="sr-only">
                        Email
                        </label>
                        <input
                        onChange={handleChange}
                        value={userRegist.email}
                        id="email"
                        name="email"
                        type="email"
                        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor='password' className="sr-only">
                        Password
                        </label>
                        <input
                        onChange={handleChange}
                        value={userRegist.password}
                        id="password"
                        name="password"
                        type="password"
                        className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor='name' className="sr-only">
                        Name
                        </label>
                        <input
                        onChange={handleChange}
                        value={userRegist.user_detail.name}
                        id="name"
                        name="name"
                        type="text"
                        className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Your Name"
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor='name' className="sr-only">
                        Address
                        </label>
                        <input
                        onChange={handleChange}
                        value={userRegist.user_detail.address}
                        id="address"
                        name="address"
                        type="text"
                        className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Your Address"
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor='name' className="sr-only">
                        Gender
                        </label>
                        <select onChange={handleChange}
                        id="gender"
                        name="gender"
                        className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Your Gender">
                            <option value={userRegist.user_detail.gender}>Male</option>
                            <option value={userRegist.user_detail.gender}>Female</option>
                        </select>
                    </div>
                    <div className="my-5">
                        <label htmlFor='name' className="sr-only">
                        Birth Date
                        </label>
                        <input
                        onChange={handleChange}
                        value={userRegist.user_detail.birthDate}
                        id="birthDate"
                        name="birthDate"
                        type="text"
                        className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Your Birth Date"
                        />
                    </div>
                    <button
                        type="submit"
                        className="my-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
