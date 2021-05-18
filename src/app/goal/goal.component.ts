import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../goal-class/goal';
import { QuoteRequestService } from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]

})
export class GoalComponent implements OnInit {
  goals:Goal[];
  alertService:AlertService;
  goal:Quote;

  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }

  ngOnInit() {

    this.quoteService.quoteRequest()
    this.goal = this.quoteService.quote
  }
  
  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  addNewGoal(goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    let cDate = new Date(goal.completeDate); //Add new variable to hold the input from the form as date.
    goal.completeDate = new Date(
      cDate.getFullYear(),
      cDate.getMonth(),
      cDate.getDate()
    ); //Convert the date being passed to the Goal object to the correct format (YYYY, MM, DD).
    this.goals.push(goal);
  }

  deleteGoal(isComplete, index) {
    if (isComplete) {
      let toDelete = confirm(
        `Are you sure you want to delete ${this.goals[index].name}?`
      );

      if (toDelete) {
        this.goals.splice(index, 1);
      }
    }
  }


}
  