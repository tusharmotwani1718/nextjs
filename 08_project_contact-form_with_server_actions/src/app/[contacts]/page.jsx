import { Suspense } from "react";
import ContactList from "../../../lib/[_components]/ContactList";
import React from 'react'

function page() {
    return (
        <div>
            <Suspense fallback={<p>Loading Contacts...</p>}>
                <ContactList />
            </Suspense>
        </div>
    )
}

export default page;