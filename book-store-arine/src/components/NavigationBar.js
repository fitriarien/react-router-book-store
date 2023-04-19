import React, { useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, MobileNav, Typography, IconButton } from "@material-tailwind/react";

export default function NavigationBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.isLogin);

    function logout() {
        fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            localStorage.clear();
            dispatch({type: 'LOGOUT'});
            navigate('/sign-in');
            console.log("Logout Success.");
        })
        .catch(err => {
            console.log(err);
        })
    }

    // navbar
    const [openNav, setOpenNav] = useState(false);
    useEffect(() => {
        window.addEventListener(
        "resize", () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
        >
            <NavLink to="/" className=" hover:font-semibold" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
            Home
            </NavLink>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <NavLink to="/profile" className="flex items-center hover:font-semibold" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
            Profile
            </NavLink>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <NavLink to="/cart" className="flex items-center hover:font-semibold" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
            Cart
            </NavLink>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <NavLink to="/books" className="flex items-center hover:font-semibold" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
            Books
            </NavLink>
        </Typography>
        { !isLogin ? 
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal">
            <NavLink to="/sign-in" className="flex items-center hover:font-semibold" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
            Login
            </NavLink>
            </Typography> : 
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            onClick={logout}>
            <NavLink to="/sign-in" className="flex items-center hover:font-semibold">
            Logout
            </NavLink>
            </Typography>}
        </ul>
    );       

    return (
        <div>
            <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Book Store
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    {/* <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    >
                    <span>Login</span>
                    </Button> */}
                    <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                    >
                    {openNav ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        </svg>
                    )}
                    </IconButton>
                </div>
                </div>
                <MobileNav open={openNav}>
                {navList}
                {/* <NavLink to='/sign-in'>
                    <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Login</span>
                    </Button>
                </NavLink> */}
                </MobileNav>
            </Navbar>
        </div>
    );
}


