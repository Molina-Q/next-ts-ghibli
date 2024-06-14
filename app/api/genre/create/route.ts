import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { name } = await req.json();

        const genre = await db.genre.create({
            data: {
                name,
            }
        });

        return NextResponse.json(genre);

    } catch (error) {
        console.log("error create Genre : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}