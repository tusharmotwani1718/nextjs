import React from 'react'

async function page({
    params
}) {
    const {slug} = await params;
  return (
    <div>page: {slug ? slug.join(',') : ''}</div>
  )
}

export default page