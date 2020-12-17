import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
import { storeMessage, getUser } from './decorators/tempStore';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!!!');
  next()
}

@controller('')
class LookupController {
  @get('/lookup')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <div>
      <div>Lookup username:</div>
      <form method="POST">
        <div>
          <input name="userName" />
        </div>
        <button>Submit</button>
      </form>
    </div>
    `);
  }

  @post('/lookup')
  @bodyValidator('userName')
  postLogin(req: Request, res: Response) {
    const { userName } = req.body;
    const currentUser = req.session && req.session.user;
    if (getUser(userName)) {
      res.send(`
      <div>
        <form action="/sendMessage" method="POST">
          <div>
            <input type="hidden" name="recipient" value=${userName} />
            <input type="hidden" name="sender" value=${currentUser} />
          </div>
          <div>
            <label>Send ${userName} a private message</label>
            <input name="messageText" />
          </div>
          <button>Submit</button>
        </form>
      </div>
      `);
    } else {
      res.send(`
      <div>
      User not found
      <br>
      <a href="/">Go back</a>
      </div>
      `);
    }
  }

  @post('/sendmessage')
  @bodyValidator('recipient', 'messageText', 'sender')
  sendmessage(req: Request, res: Response) {
    const { recipient, messageText, sender } = req.body;
    if (recipient && messageText && sender) {
      const message = {sender:sender, recipient:recipient, bodyText: messageText}
      storeMessage(message)
      res.send(`
      <div>
        <a href="/lookup">Find User</a>
      </div>
      `);
    } else {
      res.send(`
      <div>
      Invalid userName or password
      <br>
      <a href="/">Go back</a>
      </div>
      `);
    }
  }
}