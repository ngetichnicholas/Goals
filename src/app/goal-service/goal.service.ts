import { Injectable } from '@angular/core';
import { Goals } from '../goalLIst';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  getGoals(){
    return Goals
  }

  constructor() { }
}