import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Authtest = () => {
    return (<ClerkProvider><div><header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
            <SignInButton />
            <SignUpButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </header>Authtest</div></ClerkProvider>

    )
}

export default Authtest