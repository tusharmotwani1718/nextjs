import { NextResponse } from "next/server"

export const posts = [
    {
        id: 1,
        title: 'How to get started as a Web developer?',
        status: 'draft',
        likes: 0
    },
    {
        id: 2,
        title: 'Learn JS Basics',
        status: 'published',
        likes: 17
    },
    {
        id: 3,
        title: 'Best AI tools for coding',
        status: 'published',
        likes: 23
    }
]


export async function GET() {
    return NextResponse.json({
        success: true,
        data: posts
    }, { status: 200 })
}