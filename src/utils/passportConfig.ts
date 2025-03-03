import {User} from '@prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';
import {Strategy as LocalStrategy, IVerifyOptions} from 'passport-local';
import {prismaClient} from './prismaClientConfig';
import {Request} from "express";

export const passportConfig = () => {
    passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: any, done: any) => {
        try {
            const user: User | null = await prismaClient.user.findUnique({where: {id: id}});
            if (user) done(null, user);
            else done(null, false);
        } catch (error) {
            done(error);
        }
    });

    passport.use(new LocalStrategy({passReqToCallback: true}, async (req: Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
        try {
            if (!username || !password) return done(null, false, {message: 'Incorrect username or password.'});

            const user: User | null = await prismaClient.user.findUnique({where: {username}});

            if (!user) return done(null, false, {message: 'User data not found. Please signup.'});

            const isMatchedPassword = await bcrypt.compare(password, user.password);
            if (!isMatchedPassword) return done(null, false, {message: 'Incorrect password.'});

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};
