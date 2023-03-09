import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itask } from '../data/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  //create lists
  task : Itask [] = [];
  inprogress : Itask [] = [];
  completed : Itask [] = [];
  updateIndex!: any;
  isEditEnabled :boolean = false;
  constructor(private fb : FormBuilder){

  }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }
  addTask(){
    this.task.push({
      description: this.todoForm.value.item,
      completed:false
    })
    this.todoForm.reset();
  }
  updateTask(){
    this.task[this.updateIndex].description = this.todoForm.value.item;
    this.task[this.updateIndex].completed = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  onEdit(item:Itask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  deleteTask(i: number){
    this.task.splice(i, 1)
  }
  deleteInProgressTask(i: number){
    this.inprogress.splice(i, 1)
  }
  deleteCompletedTask(i: number){
    this.completed.splice(i, 1)
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
