import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VdoplayercomponetComponent } from './vdoplayercomponet.component';

describe('VdoplayercomponetComponent', () => {
  let component: VdoplayercomponetComponent;
  let fixture: ComponentFixture<VdoplayercomponetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VdoplayercomponetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VdoplayercomponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
