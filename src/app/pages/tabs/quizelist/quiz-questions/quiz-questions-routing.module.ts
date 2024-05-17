import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizQuestionsPage } from './quiz-questions.page';

const routes: Routes = [
  {
    path: '',
    component: QuizQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizQuestionsPageRoutingModule {}
