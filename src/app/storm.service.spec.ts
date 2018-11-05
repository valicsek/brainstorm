import { TestBed, inject } from '@angular/core/testing';
import { StormService } from './modules/dashboard/components/storm/storm.service';


describe('StormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StormService]
    });
  });

  it('should be created', inject([StormService], (service: StormService) => {
    expect(service).toBeTruthy();
  }));
});
