import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {
  easyNum,
  easyStr,
  easySym,
  mediumNumSym,
  mediumNumStr,
  mediumSymStr,
  strong
} from '../../constants/constants';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent implements OnInit, OnDestroy {
  @Input() field: null | AbstractControl = null;
  value = null;
  passwordStrength: string = "";
  colorBlock1 = "base";
  colorBlock2 = "base";
  colorBlock3 = "base";
  subscription: Subscription[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.display();
  }

  strengthTest(val: string) {
    if (easyStr.test(val) || easySym.test(val) || easyNum.test(val)) {
      this.passwordStrength = 'easy';
    }

    if (mediumNumSym.test(val) || mediumNumStr.test(val) || mediumSymStr.test(val)) {
      this.passwordStrength = 'medium';
    }

    if (strong.test(val)) {
      this.passwordStrength = 'strong';
    }

    if (val.length < 8 && val.length !== 0) {
      this.passwordStrength = 'error';
    }

    if (val.length === 0) {
      this.passwordStrength = 'empty';
    }
  }

  changeStrength() {
    switch (this.passwordStrength) {
      case "easy":
        this.colorBlock1 = "error";
        this.colorBlock2 = "base";
        this.colorBlock3 = "base";
        break
      case "medium":
        this.colorBlock1 = "medium";
        this.colorBlock2 = "medium";
        this.colorBlock3 = "base";
        break
      case "strong":
        this.colorBlock1 = "strong";
        this.colorBlock2 = "strong";
        this.colorBlock3 = "strong";
        break
      case'error':
        this.colorBlock1 = "error";
        this.colorBlock2 = "error";
        this.colorBlock3 = "error";
        break
      default:
        this.colorBlock1 = "base";
        this.colorBlock2 = "base";
        this.colorBlock3 = "base";
    }
  }

  display(): void {
    const fieldSub = this.field!.valueChanges.subscribe(val => {
        val.toLowerCase();
        this.strengthTest(val);
        this.changeStrength();
      }
    )

    if (this.field) {
      this.subscription.push(fieldSub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => {
      sub.unsubscribe()
    })
  }
}
