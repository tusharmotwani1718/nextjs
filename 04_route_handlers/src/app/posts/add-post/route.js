import { NextResponse } from "next/server";
import { posts } from "../route.js";

export async function POST(request) {
    const { id, title, status, likes } = await request.json();

    if(!id || !title || !status) {
        return NextResponse.json({
            success: false,
            message: 'required fields are missing'
        }, {
            status: 401,
            statusText: 'Client side error'
        })
    }

    posts.push({
        id,
        title,
        status,
        likes: likes || 0
    })

    return NextResponse.json({
        success: true,
        message: 'Post added successfully',
        data: posts
    }, {
        status: 201,
        statusText: 'ok request'
    })

   
}