"use client";

import React, { useEffect } from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import AiTools from './_components/AiTools'
import History from './_components/History'
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function Dashboard() {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            axios.post("/api/user");
        }
    }, [isLoaded, user]);

    return (
        <div>
            <WelcomeBanner/>
            <AiTools/>
            <History/>
        </div>
    )
}

export default Dashboard