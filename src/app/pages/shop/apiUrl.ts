import { InjectionToken } from '@angular/core';

export const apiBaseUrl: string = 'https://fakestoreapi.com';
export const API_BASE_URL = new InjectionToken<string>('apiBaseUrl');
