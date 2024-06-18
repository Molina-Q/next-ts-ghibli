import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'


export async function POST(
    req: Request
) {
    try {
        const { lastName, firstName, sex, birthdate, director, actor } = await req.json();

        const items = [];

        const person = await db.person.create({
            data: {
                lastName,
                firstName,
                sex,
                birthdate,
            }
        });

        if (director == 1) {
            const isDirector = await db.director.create({
                data: {
                    personId: person.id,
                }
            });

            isDirector && items.push(isDirector);
        }

        if (actor == 1) {
            const isActor = await db.actor.create({
                data: {
                    personId: person.id,
                }
            });

            isActor && items.push(isActor);
        }

        person && items.push(person);

        return NextResponse.json(items);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}