import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // to get access to the form earlier than 'submit'
  @ViewChild('f', {static: false}) signupForm : NgForm;

  answer = '';
  genders = ['Male', 'Female'];
  defaultQuestion = 'pet';

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    questionAnswer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    // approach 1
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'Male'
    // });

    // aproach 2
    this.signupForm.form.patchValue({
      userData: {
        username : suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.questionAnswer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // reset the form
    this.signupForm.reset();
  }
}
