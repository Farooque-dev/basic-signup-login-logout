import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {User} from '@prisma/client';
import {prismaClient} from "../utils/prismaClientConfig";

export const login = (req: Request, res: Response) => {
    const errorMessage: string[] = req.flash('error');
    res.send(`${errorMessage}`);
};

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser: User | null = await prismaClient.user.findFirst({ where: { username } });

    if (existingUser) {
        res.send('User already exists! Please try with different credentials.');
        return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: User = await prismaClient.user.create({
        data: { username, password: hashedPassword },
    });

    res.send(newUser).status(200);
};
