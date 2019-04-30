import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

//TODO import promisedData json

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should store jwtToken and user info in localStorage", ()=>{
    spyOn(component, 'login').and.returnValue(Promise.resolve(promisedData))

    //Todo 
    expect(component.data).toEqual(promisedData);
    expect(localStorage.getItem("jwtToken")).toEqual(promisedData.jwtToken);
    expect(localStorage.getItem("user")).toEqual(promisedData.user);
  });

  it("should throw an error when login fails", ()=>{

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
