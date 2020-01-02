export class User {
  constructor(public login: string,
              public password: string,
              public name: string,
              public surname: string,
              public admin: boolean,
              public standardUser: boolean,
              public id: number) {
  }
}


