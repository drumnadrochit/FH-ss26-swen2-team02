import {Component, inject, input, model, OnInit, signal} from '@angular/core';
import {TourLogModel} from '../../models/tour.model';
import {form, FormField, FormRoot, max, min, required} from '@angular/forms/signals';
import {InputField, InputType} from '../../components/input-field/input-field';
import {NumberField} from '../../components/input/number/number-field.component';
import {InputButton} from '../../components/input-button/input-button';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TourService} from '../../services/tour.service';
import {TourLogRequestDTO} from '../../models/dto/tour.dto';
import {TourStore} from '../../stores/tour.store';

export type logCRUD =  Omit<TourLogModel,  "creationDate" >;



@Component({
  selector: 'app-logs-crud',
  imports: [
    FormRoot,
    InputField,
    FormField,
    NumberField,
    InputButton
  ],
  templateUrl: './logs-crud.html',
  styleUrl: './logs-crud.css',
})
export class LogsCRUD implements OnInit {

  tourStore = inject(TourStore);
  route = inject(ActivatedRoute)
  router = inject(Router)
  tourService = inject(TourService)

  editMode = signal<boolean>(false);
  logModel = model<logCRUD>({id:0, comment:"",difficulty:0,distance:0,duration:0,rating:0, tourId:0});
  logForm = form(this.logModel, (sp)=>{
    required(sp.distance,{message: "Distance is required."})
    min(sp.distance,1, {message: "Distance must be greater than 0 km"})
    max(sp.distance,100, {message: "Distance must be smaller than 100 km"})

    required(sp.duration,{message: "Duration is required."})
    min(sp.duration,1, {message: "Duration must be greater than 0 h"})
    max(sp.duration,12, {message: "Duration must be smaller than 12 h"})

    required(sp.difficulty,{message: "Difficulty is required."})
    min(sp.difficulty,1, {message: "Difficulty must be greater than 1"})
    max(sp.difficulty,5, {message: "Difficulty must be smaller than 5"})

    required(sp.rating,{message: "Rating is required."})
    min(sp.rating,1, {message: "Duration must be greater than 0 h"})
    max(sp.rating,5, {message: "Duration must be smaller than 12 h"})

    required(sp.tourId, {message: "TourId is required."})

}, {submission: {
    action: async field => {
      const data = this.logModel();
      const logDTO : TourLogRequestDTO = {tourId: data.tourId, difficulty: data.difficulty, comment: data.comment, rating: data.rating, duration: data.duration, distance: data.distance,creationDate: new Date()}
      if(this.editMode()){
        this.tourService.updateLog(logDTO,data.id).subscribe(log => {
          this.router.navigate(['/tours'])
        })
      }else{
        this.tourService.createLog(logDTO).subscribe(res => {
          this.router.navigate(['/tours'])
        })

      }
    }
    }});

  onCancel(){
    this.router.navigate(['/tours'])
  }

  onDelete(){
    const data = this.logModel();
    this.tourService.deleteLog(data.tourId,data.id).subscribe(res => {
      this.router.navigate(['/tours'])
    })
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      if(data['editMode'])
      {
        this.editMode.set(data['editMode'] as boolean);
      }
    })
      this.route.params.subscribe((params) => {
        const log = this.tourStore.getLog()

        if(log)
        {
          this.logModel.set(log);
        }else{
          if (params['id']) {
            this.logModel().id = Number(params['id']);
            console.log(this.logModel());
          }

        }

        if (params['tourId']) {
          this.logModel().tourId = Number(params['tourId']);
        }

        console.log(this.logModel());
      })
      }



  protected readonly InputType = InputType;
}
