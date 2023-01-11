import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { NeonService } from 'src/app/services/neon/neon.service';
import { Subscription } from 'rxjs';
import { ITasks } from 'src/app/pages/todo/interfaces/tasks/i-tasks';
import { PopupService } from 'src/app/pages/todo/services/popup/popup.service';
import { TasksService } from 'src/app/pages/todo/services/tasks/tasks.service';
import { CategoriesService } from 'src/app/pages/todo/services/categories/categories.service';
import { ICategories } from 'src/app/pages/todo/interfaces/categories/i-categories';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  providers: [PaginatorV2Service],
})
export class PopupComponent implements OnInit, OnDestroy {
  editItem: ITasks = {
    id: 0,
    name: 'undefined',
    category: '',
    priority: 0,
    date: '',
    status: false,
    description: '',
  };
  readonly formLengths = {
    name: { min: 4, max: 30 },
    categori: { min: 4, max: 10 },
    description: { min: 0, max: 100 },
  };
  private _categories: Array<string> = [];

  itemForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.formLengths.name.max),
      Validators.minLength(this.formLengths.name.min),
    ]),
    description: new FormControl('', [
      Validators.maxLength(this.formLengths.description.max),
      Validators.minLength(this.formLengths.description.min),
    ]),
  });

  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.maxLength(this.formLengths.categori.max),
      Validators.minLength(this.formLengths.categori.min),
    ]),
  });

  private _editItem$!: Subscription;

  constructor(
    private _popupService: PopupService,
    private _tasksService: TasksService,
    private _categoriService: CategoriesService,
    private _paginatorService: PaginatorV2Service,
    private _neonService: NeonService
  ) {
    this.paginator.init(3);

    const categories = this._tasksService.getCategories();
    this.updateCategories(categories, this.editItem.category as string);

    this._editItem$ = this._popupService.editItem.subscribe((sub) => {
      this.editItem = sub;
      this.nameControl.setValue(sub.name);
      this.descriptionControl.setValue(sub.description);
      this.updateCategories(
        this._categories as string[],
        this.editItem.category as string
      );
    });
  }

  ngOnDestroy(): void {
    this._editItem$.unsubscribe();
  }

  ngOnInit(): void {}

  @HostListener('document:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    this.closePopup();
  }

  get nameControl() {
    return this.itemForm.controls.name as FormControl;
  }
  get descriptionControl() {
    return this.itemForm.controls.description as FormControl;
  }
  get categoriControl() {
    return this.categoryForm.controls.name as FormControl;
  }
  get paginator(): any {
    return this._paginatorService;
  }
  get categories(): Array<string> {
    return this._categories;
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }

  private updateCategories(arrCategories: Array<string>, currCategori: string) {
    const categoriesData: ICategories = {
      items: arrCategories,
      currCategori: currCategori,
    };
    this._categories = this._categoriService.updateCategories(categoriesData);
  }

  closePopup() {
    this._popupService.close();
    this.itemForm.reset();
    this.categoryForm.reset();
  }

  setCategory(category: string) {
    this.editItem.category = category;
  }

  setPriority(value: number) {
    this.editItem.priority = value;
  }

  onSubmitItem() {
    if (this.itemForm.valid) {
      this.editItem.name = this.nameControl.value.trim();
      this.editItem.description =
        this.descriptionControl.value.length > 0
          ? this.descriptionControl.value.trim()
          : '';
      this._popupService.saveItem(this.editItem);
      this.itemForm.reset();
    }
  }

  onSubmitCategori() {
    if (this.categoryForm.valid) {
      const category = String(this.categoriControl.value.trim().toLowerCase());
      this.updateCategories([category], category);
      this.editItem.category = category;
      this.categoryForm.reset();
    }
  }
}
