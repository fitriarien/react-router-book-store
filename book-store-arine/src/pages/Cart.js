import React from 'react';
import {
    Typography
  } from "@material-tailwind/react";

function Cart() {
    return (
        <div className="mx-auto max-w-screen-md py-12">
            <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
            Cart Page
            </Typography>
            <Typography color="gray" className="font-normal text-center">
            Coming Soon!
            </Typography>
        </div>
    );
}

export default Cart;