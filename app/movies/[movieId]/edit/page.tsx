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
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Movie } from "@/lib/interface"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  duration: z.coerce.number(),
  synopsis: z.string().min(10, {
    message: "Synopsis must be at least 10 characters.",
  }),
  note: z.coerce.number(),
  dateRelease: z.date(),
  directorId: z.coerce.number(),
})

export default function MovieEdit({ params }: { params: { movieId: string } }) {
  const router = useRouter();

  const [directors, setDirectors] = useState<({ person: { id: number; lastName: string; firstName: string; }; } & { id: number; personId: number; createdAt: Date; })[]>([]);
  const [movie, setMovie] = useState<Movie>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: movie?.title,
      duration: movie?.duration,
      synopsis: movie?.synopsis,
      note: movie?.note,
      dateRelease: movie?.dateRelease,
      directorId: movie?.directorId,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/movie/create`, values);
      toast.success("Movie created successfully !");
      form.reset();

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get('/api/directors');
        setDirectors(response.data);

      } catch (error) {
        console.log('error : ', error);
      }
    }

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movie/${params.movieId}`);
        setMovie(response.data);

      } catch (error) {
        console.log('error : ', error);
      }
    }

    fetchMovie();

    fetchDirectors();
  }, [])

  console.log("Movies : ", movie);
  

  console.log("Directors : ",directors);


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 space-x-10 px-5 py-14 border rounded-xl">

        <h1 className='text-3xl'>Movie's Form</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the movie</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Howl and the moving castle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          defaultValue={movie?.duration}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input type="number" placeholder="120" {...field} />
              </FormControl>
              <FormDescription>
                This is the duration of the movie in minutes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Synopsis</FormLabel>
              <FormControl>
                <Input placeholder="A movie about..." {...field} />
              </FormControl>
              <FormDescription>
                This is a short description of the movie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input type="number" placeholder="7" min={0} max={10} {...field} />
              </FormControl>
              <FormDescription>
                This is the note of the movie between 0 and 10.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRelease"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of release</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ? field.value.toISOString().split('T')[0] : ''}
                  onChange={event => field.onChange(new Date(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="directorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Directors</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Directors --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {directors.map((director) => (
                    <SelectItem key={director.id} value={director.id.toString()}>{director.person.firstName} {director.person.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
