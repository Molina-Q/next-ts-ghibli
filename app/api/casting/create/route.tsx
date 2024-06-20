import { db } from '@/lib/db'
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(
    req: Request
) {
    try {
        const { movieId, actorId, roleId } = await req.json();

        const casting = await db.casting.create({
            data: {
                movieId,
                actorId,
                roleId
            }
        });

        return NextResponse.json(casting);

    } catch (error) {
        console.log("error create Casting : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}