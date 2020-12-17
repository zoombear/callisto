import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
import { validateLogin } from './decorators/tempStore';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!!!');
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>userName</label>
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

  @post('/login')
  @bodyValidator('userName', 'password')
  postLogin(req: Request, res: Response) {
    const { userName, password } = req.body;
    const user = {userName:userName, password:password}
    const loginValid = validateLogin(user);
    if (loginValid) {
      req.session = { loggedIn: true, user: loginValid};
      res.redirect('/');
    } else {
      res.send('Invalid userName or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response){
    req.session = undefined;
    res.redirect('/');
  }
}