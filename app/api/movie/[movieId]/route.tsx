import { db } from '@/lib/db';
import { useParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'


export async function GET(
    req: Request
) {
    try {
        const params = useParams();

        const movie = await db.movie.findUnique({
            where: {
                id: parseInt(params.movieId[0]),
            }
        });

        return NextResponse.json(movie);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}