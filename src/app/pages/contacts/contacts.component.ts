import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { ContactsService, IContacts } from './services/contacts.service';

@Component({
  selector: 'app-contacts',
  animations: [
    trigger('toggleLink', [
      state(
        'open',
        style({
          scale: 1,
        })
      ),
      state(
        'closed',
        style({
          scale: 0,
        })
      ),
      transition('closed => open', [animate('0.3s')]),
      transition('open => closed', [animate('0.2s')]),
    ]),
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  private _activeLink: string = '';
  private _isCopied: boolean = false;
  private _bgBlue: string = '#343c4e';
  private _bgLink: string = '#284ca0';

  constructor(
    private _contactsService: ContactsService,
    private _neonService: NeonService,
    private _shadowService: ShadowService
  ) {}

  ngOnInit(): void {
    let time = 300;
    this.contacts.map((item) => {
      setTimeout(() => {
        this.toggleLink(item.service);
      }, time);
      time += 300;
    });
    setTimeout(() => {
      this.toggleLink('');
    }, time);
  }

  get contacts(): IContacts[] {
    return this._contactsService.contacts;
  }
  get activeLink() {
    return this._activeLink;
  }
  get isCopied(): boolean {
    return this._isCopied;
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get bgRed(): string {
    return this._shadowService.colorRedNeon;
  }
  get bgRedShadow(): string {
    return this._shadowService.colorRedShadow;
  }
  get bgBlue(): string {
    return this._bgBlue;
  }
  get bgLink(): string {
    return this._bgLink;
  }

  toggleLink(link: string) {
    this._activeLink = this._activeLink === link ? '' : link;
    this._isCopied = false;
  }

  onClipboardCopy(successful: boolean): void {
    this._isCopied = successful;
  }
}
