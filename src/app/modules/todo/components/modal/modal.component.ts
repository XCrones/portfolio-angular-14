import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {}

  get title(): string {
    return this._modalService.dataDelete.title;
  }

  isDelete(response: boolean) {
    this._modalService.confirm(response);
  }
}
