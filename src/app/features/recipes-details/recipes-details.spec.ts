import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDetails } from './recipes-details';

describe('RecipesDetails', () => {
  let component: RecipesDetails;
  let fixture: ComponentFixture<RecipesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
