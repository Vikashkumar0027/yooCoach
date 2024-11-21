import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizQuestionsPageRoutingModule } from './quiz-questions-routing.module';

import { QuizQuestionsPage } from './quiz-questions.page';
import { AnswerCheckerComponent } from 'src/app/share-components/answer-checker/answer-checker.component';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizQuestionsPageRoutingModule,ShareComponentsModule
  ],
  declarations: [QuizQuestionsPage,AnswerCheckerComponent]
})
export class QuizQuestionsPageModule {}
