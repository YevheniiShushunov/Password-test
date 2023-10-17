import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  password = new FormControl('', [
    Validators.minLength(8),
  ]);
}
