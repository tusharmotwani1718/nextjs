import React from 'react';


async function Todo({
    params
}) {

    const {todo} = await params;
  return (
    <div>
        Todo: {todo}
    </div>
  )
}

export default Todo;