import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


import {ToolbarComponent} from './shared/component/toolbar/toolbar.component';

// FIREBASE 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
//import { StorageBucket} from '@angular/fire/storage';
import { AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ReactiveFormsModule} from '@angular/forms';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ToolbarComponent,
    ContainerAppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    NewPostModule,
    MaterialModule,
    AngularFireAuthModule,
    ReactiveFormsModule,

  ],

  entryComponents: [],

  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
