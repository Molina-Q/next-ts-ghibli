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
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
    lastName: z.string().min(1, {
        message: "name must not be empty.",
    }),
    firstName: z.string().min(1, {
        message: "name must not be empty.",
    }),
    sex: z.string(),
    birthdate: z.date(),
    actor: z.boolean(),
    director: z.boolean(),
})

export default function PersoForm() {
    const router = useRouter();


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            sex: "",
            birthdate: new Date(),
            actor: false,
            director: false,
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/person/create`, values);
            toast.success("Person created successfully !");
            form.reset();

            router.refresh();

        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 space-x-10 px-5 py-14 border rounded-xl">

                <h1 className='text-3xl'>Person's Form</h1>

                <div className="flex gap-4 ">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>first name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>last name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sex</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
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
                    name="actor"
                    render={({ field }) => (
                        <FormItem className="flex flex-row w-fit gap-10 items-center rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Actor</FormLabel>
                                <FormDescription>
                                    Is that person an actor ?
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="director"
                    render={({ field }) => (
                        <FormItem className="flex flex-row w-fit gap-10 items-center rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Director</FormLabel>
                                <FormDescription>
                                    Is that person a director ?
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
