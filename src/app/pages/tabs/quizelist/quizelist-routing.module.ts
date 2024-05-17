import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizelistPage } from './quizelist.page';

const routes: Routes = [
  {
    path: '',
    component: QuizelistPage
  },
  {
    path: 'quiz-questions',
    loadChildren: () => import('./quiz-questions/quiz-questions.module').then( m => m.QuizQuestionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizelistPageRoutingModule {}
