import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {of} from 'rxjs';
import {AuthService} from './auth.service';
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockAngularFireAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {

    const mockPrepareAngularFireAuth = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'signOut'], ['user']);
    mockPrepareAngularFireAuth.user = of(null);
    mockAngularFireAuth = mockPrepareAngularFireAuth;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword with provided parameters', () => {
    const signInParams = { email: 'test@example.com', password: 'password' };

    const mockUserCredential = <UserCredential> {
      user: {
        email: signInParams.email
      }
    }
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(Promise.resolve(mockUserCredential));

    service.signIn(signInParams).subscribe(() => {
      expect(mockAngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(signInParams.email, signInParams.password);
    });
  });

  it('should call signOut', () => {
    mockAngularFireAuth.signOut.and.returnValue(Promise.resolve());

    service.logout().subscribe(() => {
      expect(mockAngularFireAuth.signOut).toHaveBeenCalled();
    });
  });

});
