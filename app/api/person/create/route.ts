import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { lastName, firstName, sex, birthdate } = await req.json();

        const person = await db.person.create({
            data: {
                lastName,
                firstName,
                sex,
                birthdate,
            }
        });

        return NextResponse.json(person);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}