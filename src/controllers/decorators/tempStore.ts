import { LocalStorage } from 'node-localstorage';
import { encrypt, decrypt } from './encrypt';
let localStorage = new LocalStorage('./scratch');

export const storeUser = function(user:{userName:string, password:string}): any {
    let testObject;
    const { userName, password } = user;
    // get users
    const usersList = localStorage.getItem('users');

    if (usersList && usersList[0]) {
      // run through list, decrypt, and compare
      const theList = JSON.parse(usersList);
      const uName = theList.find(function (uName:{userName:{iv:string, encryptedData:string}}) {
        return decrypt(uName.userName) === userName;
      });

      // add to list if doesn't exist
      if (!uName) {
        testObject ={userName:encrypt(userName), password:encrypt(password)};
        theList.push(testObject)
        localStorage.setItem('users', JSON.stringify(theList));
      }
    } else {
      const testObject =[{userName:encrypt(userName), password:encrypt(password)}];
      localStorage.setItem('users', JSON.stringify(testObject));
    }
    return testObject
}

export const getUser = function(user:string): any {
  let foundUser;
  // get users
  const usersList = localStorage.getItem('users');
  if (usersList && usersList[0]) {
    // run through list, decrypt, and compare
    const theList = JSON.parse(usersList);
    theList.forEach((matchName: { userName: { iv: string; encryptedData: string; }; }) => {
      const decryptedName = decrypt(matchName.userName)
      if (user === decryptedName) {
        foundUser = decryptedName
      }
    });
  }
  return foundUser;
}

export const validateLogin = function(user:{userName:string, password:string}): any {
  let foundUser;
  const { userName, password } = user;
  // get users
  const usersList =  localStorage.getItem('users');
  if (usersList && usersList[0]) {
    // run through list, decrypt, and compare
    const theList = JSON.parse(usersList);
    theList.forEach((matchName: { userName: { iv: string; encryptedData: string; }, password: { iv: string; encryptedData: string; }; }) => {
      const decryptedName = decrypt(matchName.userName)
      if (userName === decrypt(matchName.userName) && password === decrypt(matchName.password)) {
        foundUser = {userName:matchName.userName, password:matchName.password}
      }
    });
  }
  return foundUser;
}


export const storeMessage = function(message:{sender:string, recipient:string, bodyText:string}): void {
  const { sender, recipient, bodyText } = message;
  // get users
  const messagesList = localStorage.getItem('messages');
  if (messagesList && messagesList[0]) {
    // run through list, decrypt, and compare
    const theList = JSON.parse(messagesList);

    // add to list if doesn't exist
    const testObject ={sender:encrypt(sender), recipient:encrypt(recipient), bodyText:encrypt(bodyText)};
    theList.push(testObject)
    localStorage.setItem('messages', JSON.stringify(theList));
  } else {
    const testObject =[{sender:encrypt(sender), recipient:encrypt(recipient), bodyText:encrypt(bodyText)}];
    localStorage.setItem('messages', JSON.stringify(testObject));
  }
}

export const getMessage = function(text:string): any {
  // Add code to retrieve list of messages for a recipient
  return ''
}