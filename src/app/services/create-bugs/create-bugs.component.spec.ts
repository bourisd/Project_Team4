import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBugsComponent } from './create-bugs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('CreateBugsComponent', () => {
  let component: CreateBugsComponent;
  let fixture: ComponentFixture<CreateBugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBugsComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.initializeFormState();
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid with minimum required fields', () => {
    component.initializeFormState();

    const titleField = component.form.get('title');
    const priorityField = component.form.get('priority');
    const reporterField = component.form.get('reporter');
    const descriptionField = component.form.get('description');
    const statusField = component.form.get('status');

    titleField.setValue('testTitle');
    priorityField.setValue('1');
    reporterField.setValue('QA');
    descriptionField.setValue('descriptionTest');
    statusField.setValue('Rejected');

    expect(component.form.valid).toBeTruthy();
  });

  it('form should be invalid with -Set the Reporter to QA-', () => {
    component.initializeFormState();
    component.setReporterValidators();
    const titleField = component.form.get('title');
    const priorityField = component.form.get('priority');
    const reporterField = component.form.get('reporter');
    const descriptionField = component.form.get('description');
    const statusField = component.form.get('status');

    titleField.setValue('testTitle');
    priorityField.setValue('1');
    reporterField.setValue('QA');
    descriptionField.setValue('descriptionTest');
    statusField.setValue('');

    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid with -Set the Reporter to QA AND STATUS-', () => {
    component.initializeFormState();
    component.setReporterValidators();
    const titleField = component.form.get('title');
    const priorityField = component.form.get('priority');
    const reporterField = component.form.get('reporter');
    const descriptionField = component.form.get('description');
    const statusField = component.form.get('status');

    titleField.setValue('testTitle');
    priorityField.setValue('1');
    reporterField.setValue('QA');
    descriptionField.setValue('descriptionTest');
    statusField.setValue('Rejected');

    expect(component.form.valid).toBeTruthy();
  });


});
