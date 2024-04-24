"use client"

import React from 'react';
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { igoreOnboard } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';

interface IProps {
    label?: string
    noIcon?: boolean
    id: string
}

const SkipOnboarding = ({ label, noIcon, id }: IProps) => {
    const router = useRouter()
    return (
        <button
            onClick={() => {
                igoreOnboard(id);
                router.refresh()
            }}
        >
            {noIcon && <LogOut />}
            <span>{label ?? 'Ignorar'}</span>
        </button>
    )
}

export default SkipOnboarding;