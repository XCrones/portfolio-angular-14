import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsV2Service } from '../../../services/products_v2/products-v2.service';

import { ToolsComponent } from './tools.component';

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;
  let productsV2Service: ProductsV2Service;

  const testFilter = 'test filter';

  const mockProductsV2Service = {
    get currFilter(): string {
      return `${testFilter} 1`;
    },
    set currFilter(filter: string) {},
    get isHideFilters(): boolean {
      return false;
    },
    set isHideFilters(state: boolean) {},
    get stateCurrFilter(): boolean {
      return false;
    },
    set stateCurrFilter(state: boolean) {},
    set search(value: string) {},
    get filters(): string[] {
      return [
        `${testFilter} 1`,
        `${testFilter} 2`,
        `${testFilter} 3`,
        `${testFilter} 4`,
      ];
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      providers: [
        {
          provide: ProductsV2Service,
          useValue: mockProductsV2Service,
        },
      ],
      declarations: [ToolsComponent],
    }).compileComponents();

    productsV2Service = TestBed.inject(ProductsV2Service);

    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleIsHideFilters() => search btns[0] and click, then must be called isHideFilters()', () => {
    const mock = spyOnProperty(
      productsV2Service,
      'isHideFilters',
      'set'
    ).and.callFake((bool: boolean) => {});
    mock.calls.reset();
    const btns = fixture.debugElement.query(By.css('button.btn-toggle'));
    btns.nativeElement.click();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('toggleStateFilter() => search btns[0] and click, then must be called stateCurrFilter()', () => {
    const mock = spyOnProperty(
      productsV2Service,
      'stateCurrFilter',
      'set'
    ).and.callFake((bool: boolean) => {});
    mock.calls.reset();
    const btns = fixture.debugElement.query(By.css('button.btn-state'));
    btns.nativeElement.click();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('setCurrFilter(filter) => search btns[0] and click, then must be called isHideFilters() and currFilter(filter)', () => {
    const mockIshide = spyOnProperty(
      productsV2Service,
      'isHideFilters',
      'set'
    ).and.callFake((bool: boolean) => {});
    mockIshide.calls.reset();

    const mockCurrFilter = spyOnProperty(
      productsV2Service,
      'currFilter',
      'set'
    ).and.callFake((value: string) => {});
    mockCurrFilter.calls.reset();

    const btns = fixture.debugElement.queryAll(By.css('button.btn-set'));
    btns[0].nativeElement.click();
    expect(mockIshide).toHaveBeenCalledTimes(1);
    expect(mockCurrFilter).toHaveBeenCalledWith(`${testFilter} 1`);
  });
});
