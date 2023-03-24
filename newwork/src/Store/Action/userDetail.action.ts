import {User} from "../../../userModule/user.model";

export class GetUsers{
  static readonly type = '[Users] Get';
}

export class AddUsers{
  static readonly type = '[Users] Add';
  constructor(public payload:User) {}

}


export class DeleteUsers{
  static readonly type = '[Edit] Delete';
  constructor(public id:string) {}

}


export class EditUsers{
  static readonly type = '[Users] Edit';
  constructor(public id: string, public payload:User) {}

}
