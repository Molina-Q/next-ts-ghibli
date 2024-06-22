import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React from 'react'

export default async function showMovie({ params }: { params: { movieId: string } }) {
    // const router = useRouter();

    const movie = await db.movie.findUnique({
        where: {
            id: parseInt(params.movieId)
        }
    });

    if (!movie || movie === null) {
        return null;
    }

    const director = await db.director.findFirst({
        where: {
            id: movie.directorId!
        },
        include: {
            person: true
        }
    });

    const castings = await db.casting.findMany({
        where: {
            movieId: movie.id
        },

        include: {
            role: true,
            actor: {
                include: {
                    person: true
                }
            }
        }
    }).then(castings =>
        castings.map(casting => ({
            ...casting,
            actor: {
                ...casting.actor,
                fullName: `${casting.actor.person.firstName} ${casting.actor.person.lastName}`,
            },
        }))
    );

    console.log('director : ', director);
    console.log('movie : ', movie);


    if (!director || director === null) {
        return null;
    }

    // if (!movie || movie === null) {
    //     router.push('/movies/list');
    // }


    return (movie &&
        <div className=''>
            <h1 className='text-center pb-4 text-lg font-semibold'>Movie Details</h1>
            <Card className='size-[60vw] mx-auto shadow-md p-10'>
                <CardHeader>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>{movie.synopsis}</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* <p>{movie.duration}:00 hours long</p> */}
                    <p>Released in <b>{movie.dateRelease.getFullYear()}</b></p>
                    {movie.directorId && <p>Directed By : <b>{director.person.firstName} {director.person.lastName}</b></p>}
                    <div>
                        Casting :
                        <ul>
                            {castings.length !== 0 ? castings.map((casting) => (
                                <li
                                    key={casting.id}
                                >
                                    <Link href={'/persons/list'}>
                                        <b>{casting.role.name}</b>
                                    </Link>

                                    {' '}played by{' '}

                                    <Link href={'/roles/list'}>
                                        <b>{casting.actor.fullName}</b>
                                    </Link>
                                </li>
                            )) : <li>No casting found</li>}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}