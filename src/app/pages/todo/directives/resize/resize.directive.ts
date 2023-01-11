import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective {
  private readonly sm: number = 640;
  private readonly md: number = 768;
  private readonly lg: number = 1024;

  @Input() filter: string = '';
  @HostBinding('style.display') display: string = '';

  constructor() {}

  ngOnInit(): void {
    let width = window.innerWidth;
    this.responsiveWidth(width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.responsiveWidth(event.target.innerWidth);
  }

  responsiveWidth(width: number) {
    if (width < this.lg && this.filter === 'date') {
      this.display = 'none';
    } else if (width > this.lg && this.filter === 'date') {
      this.display = 'table-cell';
    }

    if (width < this.md && this.filter === 'priority') {
      this.display = 'none';
    } else if (width > this.md && this.filter === 'priority') {
      this.display = 'table-cell';
    }

    if (width < this.sm && this.filter === 'category') {
      this.display = 'none';
    } else if (width > this.sm && this.filter === 'category') {
      this.display = 'table-cell';
    }
  }
}
