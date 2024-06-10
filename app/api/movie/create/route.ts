
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { title, duration, dateRelease, synopsis, note, poster, directorId } = await req.json();
        const director = await db.director.findUnique({
            where: {
                id: Number(directorId)
            }
        });

        const movie = await db.movie.create({
            data: {
                title,
                dateRelease,
                duration,
                synopsis,
                note,
                // poster,
                directorId: director?.id
            }
        });

        return NextResponse.json(movie);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}