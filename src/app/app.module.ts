import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { GetBugComponent } from './get-bug/get-bug.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateBugComponent } from './update-bug/update-bug.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TruncatePipe } from './truncate.pipe';
import { HeaderComponent } from "./header/header.component";




const appRoutes: Routes  = [
  {path:'',component: HomeComponent},
  {path: 'createBug', component: CreateBugComponent},
  {path: 'getBug', component: GetBugComponent},
  {path: 'updateBug', component: UpdateBugComponent},
  {path: 'help', component: ContactUsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateBugComponent,
    GetBugComponent,
    HomeComponent,
    UpdateBugComponent,
    ContactUsComponent,
    TruncatePipe
  ],
  imports: [ RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only-->
  ),
    BrowserModule,HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
