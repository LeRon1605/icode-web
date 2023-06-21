import { BehaviorSubject } from "rxjs";
import { UserInfo } from "../schema/user.schema";

export class UserStorageService {
    public currentUser: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

    setCurrentUser(user: UserInfo) {
        this.currentUser.next(user);
    }

    getCurrentUser() : UserInfo | null {
        return this.currentUser.value;
    }
}