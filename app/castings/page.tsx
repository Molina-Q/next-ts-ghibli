"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/db"
import axios from "axios"
import { useRouter } from "next/navigation"

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useEffect, useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Role {
    id: number;
    name: string;
    castings: Casting[];
    createdAt: Date;
}

interface Genre {
    id: number;
    name: string;
    genres: GenresMovies[];
    createdAt: Date;
}

interface Person {
    id: number;
    lastName: string;
    firstName: string;
    sex: string;
    birthdate: Date;
    directors: Director[];
    actors: Actor[];
    createdAt: Date;
}

interface Director {
    id: number;
    personId: number;
    person: Person;
    movies: Movie[];
    createdAt: Date;
}

interface Actor {
    id: number;
    personId: number;
    person: Person;
    castings: Casting[];
    createdAt: Date;
    updatedAt: Date;
}

interface Movie {
    id: number;
    title: string;
    dateRelease: Date;
    duration: number;
    synopsis: string;
    note: number;
    poster?: string;
    directorId?: number;
    director?: Director;
    genres: GenresMovies[];
    castings: Casting[];
}

interface Casting {
    id: number;
    movieId: number;
    movie: Movie;
    actorId: number;
    actor: Actor;
    roleId: number;
    role: Role;
}

interface GenresMovies {
    id: number;
    movieId: number;
    movie: Movie;
    genreId: number;
    genre: Genre;
}

interface CastingResponse {
    movies: Movie[];
    actors: Actor[];
    roles: Role[];
}

const formSchema = z.object({
    movieId: z.coerce.number().min(1, {
        message: "Movie must not be empty.",
    }),
    actorId: z.coerce.number().min(1, {
        message: "Actor must not be empty.",
    }),
    roleId: z.coerce.number().min(1, {
        message: "Role must not be empty.",
    }),
})

export default function GenreForm() {
    const router = useRouter();
    const [items, setItems] = useState<CastingResponse>({ movies: [], actors: [], roles: [] });

    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await axios.get<CastingResponse>('/api/casting');
            setItems(data);
        }
        fetchItems();
    }, []);

    console.log('items : ', items);


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            movieId: 0,
            actorId: 0,
            roleId: 0
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/casting/create`, values);
            toast.success("Casting created successfully !");
            form.reset();

            router.refresh();

        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 space-x-10">

                <h1 className='text-3xl'>Casting's Form</h1>

                <div className="flex gap-4 ">
                    <FormField
                        control={form.control}
                        name="movieId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Movie</FormLabel>
                                <Select onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Movies --" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {items.movies.map((movie) => (
                                            <SelectItem key={movie.id} value={String(movie.id)}>{movie.title} - {new Date(movie.dateRelease).getFullYear()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 ">
                    <FormField
                        control={form.control}
                        name="actorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Actor</FormLabel>
                                <Select onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Actors --" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {items.actors.map((actor) => (
                                            <SelectItem key={actor.id} value={String(actor.id)}>{actor.person.firstName} {actor.person.lastName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 ">
                    <FormField
                        control={form.control}
                        name="roleId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Roles --" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {items.roles.map((role) => (
                                            <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
