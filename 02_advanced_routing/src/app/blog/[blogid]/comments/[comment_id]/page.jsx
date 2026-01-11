import React from 'react'

const Comment = async ({
    params
}) => {

    const {comment_id} = await params;

  return (
    <div>Comment: {comment_id}</div>
  )
}

export default Comment