import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import React from 'react'

const ListPersons = async () => {
  const prisma = new PrismaClient();
  const persons = await prisma.person.findMany({
    include: {
      directors: {
        include: {
          movies: true
        }

      }
    }
  });

  console.log(persons[0].directors);

  return (
    <div>
      <h1 className='text-3xl mx-auto'>List of Persons</h1>

      <div className='grid grid-cols-6 gap-4 p-12'>
      

        {persons.map((person) => (
          <Card key={person.id}>
            <CardHeader>
              <CardTitle>{person.firstName} {person.lastName}</CardTitle>
              <CardDescription>Born in {person.birthdate.getFullYear()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{person.directors[0] ? 'Director' : 'Jobless'}</p>
            </CardContent>
            <CardFooter>

              <p>
                {
                  (person.directors[0] && person.directors[0].movies) &&
                  person.directors.map((director) => (
                    director.movies.map((movie) => (
                      movie.title
                    ))
                  ))
                }
              </p>
            </CardFooter>
          </Card>

        ))}
      </div>

    </div>
  )
}

export default ListPersons;