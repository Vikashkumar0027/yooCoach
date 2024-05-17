import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from 'src/app/share-components/contact-us/contact-us.component';
import { LiveChatComponent } from 'src/app/share-components/live-chat/live-chat.component';
import { NotificationComponent } from 'src/app/share-components/notification/notification.component';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'courses/:id',
        loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'test',
        loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'tabs/dashboard/:id',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'samplePaper',
        loadChildren: () => import('./simple-paper/simple-paper.module').then( m => m.SimplePaperPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      },
      {path: 'contactus', component:ContactUsComponent},
      {path: 'chat', component:LiveChatComponent},
      {path: 'notification', component: NotificationComponent},
      {
        path: 'recommended-course-list',
        loadChildren: () => import('./recommended-course-list/recommended-course-list.module').then( m => m.RecommendedCourseListPageModule)
      },
    ]
  },
  
  {
    // path: 'quizelist/:id',
    path: 'test/quizelist',
    loadChildren: () => import('./quizelist/quizelist.module').then( m => m.QuizelistPageModule)
  },
  {
    // path: 'quizelist/:id/quiz-questions',
    path: 'quizelist/quiz-questions',
    loadChildren: () => import('./quizelist/quiz-questions/quiz-questions.module').then( m => m.QuizQuestionsPageModule)
  },
  {
    path: 'quiz-questions',
    loadChildren: () => import('./quizelist/quiz-questions/quiz-questions.module').then( m => m.QuizQuestionsPageModule)
  },
  {
    path: 'premium_course/:id',
    loadChildren: () => import('./premium-course-detail/premium-course-detail.module').then( m => m.PremiumCourseDetailPageModule)
  },
  {
    path: 'recmndCoursetopic/:course_id',
    loadChildren: () => import('./recommended-course-topic/recommended-course-topic.module').then( m => m.RecommendedCourseTopicPageModule)
  },
  {
    path: 'recmnd-view-couse',
    loadChildren: () => import('./recmnd-view-couse/recmnd-view-couse.module').then( m => m.RecmndViewCousePageModule)
  },
  {
    path: 'agora-meeting',
    loadChildren: () => import('./agora-meeting/agora-meeting.module').then( m => m.AgoraMeetingPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
