"use client"

import React from 'react';
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

interface IProps {
    label?: string
    noIcon?: boolean
}

const SignOutButton = ({ label, noIcon }: IProps) => {
    return (
        <button
            onClick={() => {
                signOut();
            }}
        >
            {noIcon && <LogOut />}
            <span>{label ?? 'Sair'}</span>
        </button>
    )
}

export default SignOutButton;