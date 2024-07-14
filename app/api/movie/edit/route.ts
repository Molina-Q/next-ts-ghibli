
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { id, title, duration, dateRelease, synopsis, note, poster, directorId } = await req.json();
  

        // const movie = await db.movie.update({
        //     data: {
        //         title,
        //         dateRelease,
        //         duration,
        //         synopsis,
        //         note,
        //         // poster,
        //         directorId
        //     }
        // });

        // return NextResponse.json(movie);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}