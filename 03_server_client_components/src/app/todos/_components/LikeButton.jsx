'use client';

export default function LikeButton({todoId, userId}) {
    return (
        <button
        onClick={() => {
            alert(`Todo ${todoId} liked successfully`)
        }}
        >
            Like this Todo
        </button>
    )
}