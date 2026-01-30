import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { username, password } = await request.json();

    const headersList = await headers();
    const userAgent = headersList.get('user-agent');

    const response = NextResponse.json({
        success: true,
        message: 'Logged in successfully',
        data: {username, password},
        userAgent
    }, {status: 201});

    response.headers.set('isLoggedin', true);

    return response;
}