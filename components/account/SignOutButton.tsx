"use client"

import React from 'react';
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
    return (
        <button
            className="flex items-center w-full h-full gap-2"
            onClick={() => {
                signOut();
            }}
        >
            <LogOut />
            <span>Sair</span>
        </button>
    )
}

export default SignOutButton;