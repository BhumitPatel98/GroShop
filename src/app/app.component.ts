import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  // courses: any[];
  constructor(private userService:UserService , private db:AngularFireDatabase, router: Router, auth: AuthService){

    auth.user$.subscribe(user =>{
      if(!user) return;
        userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      
      if(!returnUrl) return;
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        
      
    })

  this.courses$ = db.list('/courses').valueChanges();
      // .subscribe(courses => {
      //   this.courses = courses;
      //   console.log(this.courses);
      // });
    // this.courses$ = db.list('/courses');
  }

  add(course: HTMLInputElement){
    firebase.database().ref('/courses').push(course.value);
     course.value= '';
     
  }

  update(course){

    this.db.object('/courses/' + course.$key)
      .set(course.value + "UPDATED");
    // .set({
    //   title: course.value + ' UPADATED',
    //   price: 150
    // })
  
    // console.log(course.$key);
    // console.log(course.$value);

  }
}
