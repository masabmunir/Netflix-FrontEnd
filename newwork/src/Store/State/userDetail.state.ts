import { State,StateContext,Selector,Action } from '@ngxs/store';
import {User} from "../../../userModule/user.model";
import {Injectable} from "@angular/core";
import {AddUsers, DeleteUsers, EditUsers, GetUsers} from "../Action/userDetail.action";
import {UserdataService} from "../../app/sharedservice/userdata.service";


export class UsersStateModel{
  users : User[]
  userLoaded: boolean
}

@State<UsersStateModel>({
  name:'Users',
  defaults:{
    users:[],
    userLoaded: false
  }
})

@Injectable()
export class UsersState{

  constructor(private userData: UserdataService) {
  }
  
  @Selector()
  static getUserlist(state:UsersStateModel){
    return state.users
  }

  @Selector()
  static isUserLoaded(state:UsersStateModel){
    return state.userLoaded
  }

  @Action(GetUsers)
  getUsers({getState,setState}:StateContext<UsersStateModel>){
   return  this.userData.getData().subscribe((res: any)=>{
     const state = getState()
     setState({
       ...state,
       users:res,
       userLoaded: true
     })

   })

  }

  @Action(AddUsers)
  addUsers({getState,setState}:StateContext<UsersStateModel>,{payload}:AddUsers){
    return  this.userData.adduser(payload).subscribe((res: any)=>{
      const state = getState()
      setState({
        ...state,
        users:[...state.users,res.user]
      })

    })

  }


  @Action(DeleteUsers)
  delUsers({getState,setState}:StateContext<UsersStateModel>,{id}:DeleteUsers){
    return  this.userData.deleteUser(id).subscribe((res: any)=>{
      const state = getState()
      const users = state.users.filter(value => value._id!=id) 
      setState({
        ...state,
        users:users
      })

    })

  }

  @Action(EditUsers)
  editUsers({getState,setState}:StateContext<UsersStateModel>,{id, payload}:EditUsers){
    return  this.userData.updateUser(id as string, payload).subscribe((res: any)=>{
      const state = getState();
      const users = state.users.filter(value => value._id!=id);
      users.push(res)
      setState({
        ...state,
        users:users
      })

    })

  }
}
