import { NextResponse } from "next/server";
import Note from "../../../../../models/note.model.js";
import { dbConnect } from "../../../../../lib/db/dbConnect.js";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        // console.log('BODY RECEIVED:', body);

        const { title, desc } = body;

        if (!title) {
            return NextResponse.json({
                success: false,
                message: 'Note Title is required'
            }, {
                status: 401
            })
        }

        const note = await Note.create({
            title,
            description: desc
        })

        if (!note) {
            return NextResponse.json({
                success: false,
                message: 'Error creating note, please try again later!'
            }, {
                status: 401
            })
        }


        return NextResponse.json({
            success: true,
            message: 'Note Created Successfully',
            data: note
        }, {
            status: '201'
        })
    } catch (error) {
        console.error(`error creating note: ` + error);
        return NextResponse.json({
            success: false,
            message: `error creating note`
        }, { status: 500 })
    }
}