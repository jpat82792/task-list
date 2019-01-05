import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
signupData = {username:'', password:''};
message = '';


constructor(private http: HttpClient, private router: Router) { 

}

  ngOnInit() {
  }

  signup(){
    this.http.post('/api/user', this.signupData).subscribe(resp=>{
      console.log(resp);
      this.router.navigate(['login']);
    },
    err=>{
      this.message = err.error.msg;
    })
  }

}
