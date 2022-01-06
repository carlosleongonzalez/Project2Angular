import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './users.model';
import { RequestModel } from './request.model';


@Injectable({ providedIn: 'root' })
export class ReimbursmnetService {

  addRequestUrl = "http://localhost:8080/api/request";
  usersUrl = "";
  allpendingUrl = "http://localhost:8080/api/request/pending";
  allresolveUrl = "http://localhost:8080/api/request/resolve";
  approveUrl = "http://localhost:8080/api/request";
  userResolve = "http://localhost:8080/api/request/resolve";
  spacificUrl = "http://localhost:8080/api/request/spacific";
  userPending = "http://localhost:8080/api/request/pend";
  allEmployee = "http://localhost:8080/api/users/employee";
  userLogin = "http://localhost:8080/api/users/login";
  userProfile = "http://localhost:8080/api/users/profile";
  rejectUrl = "http://localhost:8080/api/request/reject";
  getUserById = "";
  userUpdate = "http://localhost:8080/api/users/update";
  registerUrl = "http://localhost:8080/api/users/register";
  sendEmailUrl = "http://localhost:8080/api/users/email";


  constructor(private http: HttpClient) { }

  // use Observable when you add or update
  addRequestService(newRequest: RequestModel): Observable<RequestModel> {
    return this.http.post<RequestModel>(this.addRequestUrl, newRequest);
  }

  loadUserInfoService(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.usersUrl + "/" + userId);
  }

  removeUserService(userId: number): Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(this.usersUrl + "/" + userId);

  }
  UserPendingRequestService(userId: number): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(this.userPending + "/" + userId);

  }
  UserResolveRequestService(userId: number): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(this.userResolve + "/" + userId);
  }
  EmployeeProfileService(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.userProfile + "/" + userId);

  }
  updateUserInfoService(updateUser: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.userUpdate + "/" + updateUser.id, updateUser);
  }
  allPendingRequstsService() {
    return this.http.get<RequestModel[]>(this.allpendingUrl);
  }
  AllResolvedRequstService() {
    return this.http.get<RequestModel[]>(this.allresolveUrl);
  }
  SpacificEmployeeService(reqId: number) {
    return this.http.get<RequestModel[]>(this.spacificUrl + "/" + reqId);
  }
  approveRequestService(reqId: number) {
    return this.http.patch<RequestModel>(this.approveUrl + "/" + reqId, RequestModel);
  }
  rejectRequestService(reqId: number) {
    return this.http.patch<RequestModel>(this.rejectUrl + "/" + reqId, RequestModel);
  }
  sendEmailService(userId: number, flag: number) {
    return this.http.patch<UserModel>(this.sendEmailUrl + "/" + userId + "/" + flag, UserModel);
  }
  getUserByIdService(userId: number): Observable<UserModel> {
    return this.http.post<UserModel>(this.getUserById, userId);
  }
  validataLoginService(logUser: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userLogin, logUser);
  }
  registrationService(addUser: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.registerUrl, addUser);
  }
  allEmployeeService() {
    return this.http.get<UserModel[]>(this.allEmployee);
  }
}


