import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    movieId: string
}

export async function GET(request: Request, context: { params: Params }) {
    try {
        // Extracting the movieId from the URL query parameters
        const movieId = context.params.movieId;

        if (!movieId) {
            return new NextResponse("Movie ID is required", { status: 400 });
        }

        const movie = await db.movie.findUnique({
            where: {
                id: parseInt(movieId),
            }
        });

        return NextResponse.json(movie);

    } catch (error) {
        console.log("error fetching Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}