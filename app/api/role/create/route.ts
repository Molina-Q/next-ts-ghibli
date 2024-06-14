import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { name } = await req.json();

        const role = await db.role.create({
            data: {
                name,
            }
        });

        return NextResponse.json(role);

    } catch (error) {
        console.log("error create Role : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}