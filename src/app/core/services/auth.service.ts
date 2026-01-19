import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  private readonly CLIENT_SECRET = 'jQAK320a2V6WRWXsEh6Z84LrNRGhaoR0';
  private readonly KEYCLOAK_URL = 'http://localhost:8082/realms/diet-realm';
  private readonly CLIENT_ID = 'angular-frontend';
  private readonly FRONTEND_URL = 'http://localhost:4200';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) this.tokenSubject.next(token);
    }
  }

  login() {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: `${this.FRONTEND_URL}/callback`,
      response_type: 'code',
      scope: 'openid profile email'
    });
    window.location.href = `${this.KEYCLOAK_URL}/protocol/openid-connect/auth?${params}`;
  }

  handleCallback(code: string): Observable<any> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.CLIENT_ID,
      code,
      redirect_uri: `${this.FRONTEND_URL}/callback`
    });
    if (this.CLIENT_SECRET) body.append('client_secret', this.CLIENT_SECRET);

    return this.http.post(`${this.KEYCLOAK_URL}/protocol/openid-connect/token`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  registerWithKeycloak() {
  console.log('📝 registerWithKeycloak() called'); // ✅ LOG 1
  
  const params = new URLSearchParams({
    client_id: this.CLIENT_ID,
    redirect_uri: `${this.FRONTEND_URL}/callback`,
    response_type: 'code',
    scope: 'openid profile email',
    login_hint: 'register'
  });
  
  const registerUrl = `${this.KEYCLOAK_URL}/protocol/openid-connect/auth?${params}`;
  console.log('🔗 Register URL:', registerUrl); // ✅ LOG 2
  console.log('CLIENT_ID:', this.CLIENT_ID); // ✅ LOG 3
  console.log('KEYCLOAK_URL:', this.KEYCLOAK_URL); // ✅ LOG 4
  
  window.location.href = registerUrl;
}



  logout() {
    // 1. Clear localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('id_token');
      this.tokenSubject.next(null);
    }

    // 2. Redirect Keycloak → AuthLanding
    const logoutUrl = `${this.KEYCLOAK_URL}/protocol/openid-connect/logout?` +
      `client_id=${this.CLIENT_ID}&` +
      `post_logout_redirect_uri=${encodeURIComponent(`${this.FRONTEND_URL}`)}`;
    
    console.log('🚪 Logout URL:', logoutUrl);
    window.location.href = logoutUrl;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  saveToken(accessToken: string, refreshToken?: string, idToken?: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
      if (idToken) localStorage.setItem('id_token', idToken);
      this.tokenSubject.next(accessToken);
    }
  }
}
