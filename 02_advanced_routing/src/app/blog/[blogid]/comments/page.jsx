import Link from 'next/link'
import React from 'react'

function Comments() {
    return (
        <div>
            <h2>Comments List</h2>
            <div className="my-3">
                <Link href={'/blog/123/comments/99'}
                    className="bg-white text-black rounded-xl py-1 px-3 my-3"
                >
                    View comment: 99
                </Link>
            </div>

        </div>
    )
}

export default Comments