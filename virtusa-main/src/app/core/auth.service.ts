import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'STORE_MANAGER' | 'WAREHOUSE' | 'FINANCE' | 'SUPPLIER' | 'SUPER_ADMIN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<UserRole | null>(null);
  currentRole$ = this.currentRoleSubject.asObservable();

  setRole(role: UserRole) {
    this.currentRoleSubject.next(role);
    localStorage.setItem('user_role', role);
  }

  getRole(): UserRole | null {
    return this.currentRoleSubject.value || (localStorage.getItem('user_role') as UserRole);
  }

  logout() {
    this.currentRoleSubject.next(null);
    localStorage.removeItem('user_role');
  }
}

