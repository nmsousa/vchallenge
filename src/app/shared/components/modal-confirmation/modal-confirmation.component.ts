import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() visible: boolean;
  @Input() delete: boolean;
  @Input() invalid: boolean;; // To disable the confirm button
  @Input() title: string;
  @Input() confirmLabel: string;

  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onConfirm() {
    this.confirm.emit();
  }

  onClose() {
    this.close.emit();
    this.visible = false;
  }

}
