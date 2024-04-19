import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {of} from 'rxjs';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockAngularFireAuth: any;

  beforeEach(() => {
    mockAngularFireAuth = jasmine.createSpyObj('angularFireAuth', ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'signOut']);
    mockAngularFireAuth.user = of(null);

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
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(Promise.resolve(null));

    service.signIn(signInParams).subscribe(() => {
      expect(mockAngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(signInParams.email, signInParams.password);
    });
  });

  it('should call signOut', () => {
    mockAngularFireAuth.signOut.and.returnValue(Promise.resolve(null));

    service.logout().subscribe(() => {
      expect(mockAngularFireAuth.signOut).toHaveBeenCalled();
    });
  });

});
