import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import React from 'react'

const ListMovies = async () => {

  const movies = await db.movie.findMany();

  return (
    <div>
      <h1 className='text-3xl'>List of Movies</h1>

      <div className='flex flex-wrap gap-4 p-12'>
        {movies.map((movie) => (
          <Card key={movie.id} className='size-72 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all'>
            <CardHeader>
              <CardTitle className='hyphens-auto'>{movie.title}</CardTitle>
              <CardDescription className='line-clamp-1'>{movie.synopsis}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>{movie.duration}:00 hours long</p> */}
              <p>Released in <b>{movie.dateRelease.getFullYear()}</b></p>
            </CardContent>
            <CardFooter>

              {/* <p>
                {
                  (movie.directors[0] && movie.directors[0].movies) &&
                  movie.directors.map((director) => (
                    director.movies.map((movie) => (
                      movie.title
                    ))
                  ))
                }
              </p> */}
            </CardFooter>
          </Card>

        ))}
      </div>

    </div>
  )
}

export default ListMovies;