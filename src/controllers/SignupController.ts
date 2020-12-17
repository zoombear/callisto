import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
import { encrypt, decrypt } from './decorators/encrypt';
import { storeUser, getUser } from './decorators/tempStore';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!!!');
  next()
}

@controller('/auth')
class SignupController {
  @get('/signup')
  @use(logger)
  getSignup(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Username</label>
          <input name="userName" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/signup')
  @bodyValidator('userName', 'password')
  postSignup(req: Request, res: Response) {
    const { userName, password } = req.body;
    if (userName && password) {
      const user = {userName:userName, password:password}
      const storedUser = storeUser(user);
      req.session = { loggedIn: true, user: storedUser };
      res.redirect('/');
    } else {
      res.send('Invalid userName or password');
    }
  }
}