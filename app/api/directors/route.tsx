import { db } from '@/lib/db'
import { NextResponse } from 'next/server';
import React from 'react'

type Props = {}

export async function GET() {
    try {
        const directors = await db.director.findMany({
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

        return NextResponse.json(directors);
    } catch (error) {
        console.log("error get directors : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }


}