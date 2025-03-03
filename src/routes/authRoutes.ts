import express, {Request, Response, Router} from 'express';
import passport from 'passport';
import { ensureAuthenticated } from '../middlewares/ensureLoggedIn';
import { login, signup } from '../controllers/authController';

export const authRoutes: Router = express.Router();

authRoutes.get('/', ensureAuthenticated, (req: Request, res: Response) => {
    res.status(200).send('Welcome to the app.');
});

authRoutes.get('/login', login);

authRoutes.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
}), (req: Request, res: Response) => {
    res.redirect('/');
});

authRoutes.post('/signup', signup);

authRoutes.post('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Logout failed.');
        }
        res.redirect('/login');
    });
});
