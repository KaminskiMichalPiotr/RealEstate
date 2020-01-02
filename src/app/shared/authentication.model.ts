import { User } from './user.model';

export class Authentication {
  constructor(public user: User, public token: string, public expire: number) {
  }

}
