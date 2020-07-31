import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNameList = ['test', 'username'];

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'usernameTS': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'emailTS': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'genderTS': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log('Value changes: '+value)
    // );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.get('userData.usernameTS').valueChanges.subscribe(
      (value) => console.log(value)
    );

    this.signupForm.setValue({
      'userData': {
        'usernameTS': 'sameer59',
        'emailTS': 'bhilare.sameer@gmail.com'        
      },
      'genderTS': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'usernameTS': 'sameer'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
   const control = new FormControl(null, Validators.required);
   (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // since we are using 'this' inside this function, we need to use the function reference with binding
  // in 'usernameTS' form control up as - this.forbiddenNames.bind(this)
  forbiddenNames(control: FormControl): {[s: string]: boolean} {

    if(this.forbiddenNameList.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    // must return null or don't return anything.
    // if you return false, then it will not work. This is how we tell Angular that it is valid.
    return null;
  }

  // simulating async validators
  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout(() => {
        if(control.value == 'test@test.com') {
          resolve({'emailIsForbidden':true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
