import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  grantType: 'password',
  clientId: 'estatejwtclientid',
  clientSecret: 'XY7kmzoNzl100',
  pagination: 10,
  maxPages: 5
};

export const JSONHeader =  new HttpHeaders().append('content-type', 'application/json');

