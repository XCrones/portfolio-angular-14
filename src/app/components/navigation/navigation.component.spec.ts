import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { INavItem } from 'src/app/interfaces/nav-item/i-nav-item';
import { HeaderService } from 'src/app/services/header/header.service';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let headerService: HeaderService;

  const testLinks: Array<INavItem> = [
    {
      link: '',
      title: 'главная',
    },
    {
      link: 'projects',
      title: 'проекты',
    },
    {
      link: 'contacts',
      title: 'контакты',
    },
  ];

  const mockHeaderService = {
    get itemsNav(): INavItem[] {
      return testLinks;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: HeaderService, useValue: mockHeaderService }],
      declarations: [NavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links must be equal pattern links', () => {
    const a = fixture.debugElement.queryAll(By.css('a'));
    a.map((v, idx) => {
      if (v != null && v.attributes['href'] != null) {
        const link = String(v.attributes['href']).trim().split('/').join('');
        const title = String(v.nativeNode.text).trim();
        expect(testLinks[idx].link).toEqual(link);
        expect(testLinks[idx].title).toEqual(title);
      }
    });
  });
});
