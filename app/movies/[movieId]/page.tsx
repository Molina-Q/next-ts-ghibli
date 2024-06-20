import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
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
            <Card className='size-[60vw] mx-auto shadow-md p-10'>
                <CardHeader>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>{movie.synopsis}</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* <p>{movie.duration}:00 hours long</p> */}
                    <p>Released in <b>{movie.dateRelease.getFullYear()}</b></p>
                    {movie.directorId && <p>Directed By : <b>{director.person.firstName} {director.person.lastName}</b></p>}
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}