import React, { useState, useEffect } from 'react';

function Profile() {

    const [ userProfile, setUserProfile] = useState({
        id: "",
        email: "",
        role: "",
        name: "",
        address: "",
        gender: "",
        birthDate: "",
        balance: ""
    });

    useEffect(() => {
        const id = localStorage.getItem("id");
        fetch(`http://localhost:8080/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json; charset=UTF-8'
            },
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            setUserProfile(currProfile => {
                return { ...currProfile, ...data }
            });
            console.log(data);
            console.log(userProfile);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
  
    // console.log(formatter.format(userNav.balance)); /* $5,000.00 */
    const formattedBalance = formatter.format(userProfile.balance);

    return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                {/* <!-- Left Side --> */}
                <div className="w-full md:w-3/12 md:mx-2">
                    {/* <!-- Profile Card --> */}
                    <div className="bg-white p-3 border-t-4 border-blue-400">
                        {/* <div className="image overflow-hidden">
                            <img className="h-auto w-full mx-auto"
                                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                alt=""/>
                        </div> */}
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userProfile.name}</h1>
                        {/* <h3 className="text-gray-600 font-lg text-semibold leading-6"></h3> */}
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Balance</span>
                                <span className="ml-auto">{formattedBalance}</span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Role</span>
                                <span className="ml-auto">{userProfile.role}</span>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- End of profile card --> */}
                </div>
                {/* <!-- Right Side --> */}
                <div className="w-full md:w-9/12 mx-2 h-64">
                    {/* <!-- Profile tab -->
                    <!-- About Section --> */}
                    <div className="bg-white border-t-4 border-blue-400 p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-1 text-sm">
                                <div className="grid grid-cols-3">
                                    <div className="px-4 py-2 font-semibold">Name</div>
                                    <div className="px-4 py-2 col-span-2">{userProfile.name}</div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2 col-span-2">{userProfile.gender}</div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2 col-span-2">{userProfile.birthDate}</div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="px-4 py-2 font-semibold">Address</div>
                                    <div className="px-4 py-2 col-span-2">{userProfile.address}</div>
                                </div>
                                <div className="grid grid-cols-3">
                                    <div className="px-4 py-2 font-semibold">Email</div>
                                    <div className="px-4 py-2 col-span-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">{userProfile.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End of about section --> */}
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    );
}

export default Profile;
