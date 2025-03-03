import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import { authRoutes } from './routes/authRoutes';
import {passportConfig} from "./utils/passportConfig";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'asdf-jklm',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use(authRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
