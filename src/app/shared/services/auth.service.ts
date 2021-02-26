
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Armazena os dados do usuário logado através do fireauth. Nulo se não houver usuário logado;
  userAccount: User;

  private userData = new BehaviorSubject<User>(undefined)

  // //Emite à aplicação o estado da autenticação de usuário
  // static USER_LOGGED = new EventEmitter<boolean>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngzone: NgZone,
    public afs: AngularFirestore
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userAccount = user;
        localStorage.setItem('user', JSON.stringify(this.userAccount));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngzone.run(() => {
          this.SetUserData(result.user);
          this.router.navigate(['/dashboard']);
        });
      }).catch(() => {
        console.error('Erro ao logar com provedor de e-mail.');
      });
  }

  // Sign into Firebase using popup auth & Google as the identity provider.
  async signInWithGoogleProvider() {
    var provider = new firebase.default.auth.GoogleAuthProvider();
    firebase.default.auth().signInWithPopup(provider)
      .then((result) => {
        this.ngzone.run(() => {
          this.SetUserData(result.user);
          this.router.navigate(['/dashboard']);
        });
      }).catch(() => {
        console.error('Erro ao logar com provedor Google.');
      });

  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      this.userAccount = null
    })
  }

  get getUserData(): Observable<User> {
    return this.userData.asObservable();
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    this.userData.next(this.userAccount)
    return userRef.set(userData, {
      merge: true
    })
  }

  // Returns the signed-in user's display name.
  get uid() {
    return this.userAccount.uid;
  }

  get profilePicUrl() {
    return this.userAccount.photoURL || '../assets/dummy-user.png';
  }

  get displayName() {
    return this.userAccount.displayName || '';
  }

}
