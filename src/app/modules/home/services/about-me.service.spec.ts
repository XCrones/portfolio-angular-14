import { TestBed } from '@angular/core/testing';

import { AboutMeService } from './about-me.service';

describe('AboutMeService', () => {
  let service: AboutMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('mySkills => must contain pattern', () => {
    const skill = {
      title: 'уверенное знание HTML',
      img: 'html',
      about: [
        'семантическая вёрстка',
        'адаптивная вёрстка',
        'именование по БЭМ',
      ],
    };
    expect(service.mySkills).toContain(skill);
  });

  it('aboutMe => must be equal pattern', () => {
    expect(service.aboutMe.title).toEqual('frontend developer');
  });
});
