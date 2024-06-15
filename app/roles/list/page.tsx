import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { calculateAge } from '@/lib/calculateAge';
import { db } from '@/lib/db';
import React from 'react'

const ListPersons = async () => {

    const roles = await db.role.findMany();

    return (
        <div>
            <h1 className='text-3xl mx-auto'>List of Roles</h1>


            <Table>
                <TableCaption>All of our roles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>name</TableHead>
                        {/* <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.id}</TableCell>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            {/* <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell> */}
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

        </div>
    )
}

export default ListPersons;