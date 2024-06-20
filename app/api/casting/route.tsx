import { db } from '@/lib/db'
import { NextResponse } from 'next/server';
import React from 'react'

type Props = {}

export async function GET() {
    try {
        const actors = await db.actor.findMany({
            include: {
                person: {
                    select: {
                        id: true,
                        lastName: true,
                        firstName: true
                    }
                }
            }
        })

        const movies = await db.movie.findMany()

        const roles = await db.role.findMany()

        return NextResponse.json({movies: movies, actors: actors, roles: roles});
    } catch (error) {
        console.log("error get directors : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }


}