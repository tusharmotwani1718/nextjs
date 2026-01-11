import React from 'react';
import Link from 'next/link';

async function Blog({
    params
}) {
    const { blogid } = await params;
    return (
        <div>Blog: {blogid}
        <div className="my-3">
        <Link href={'/blog/123/comments'}
      className="bg-white text-black rounded-xl py-1 px-3 my-3"
      >
        View Comments
      </Link>
      </div>
        </div>
    )
}

export default Blog;