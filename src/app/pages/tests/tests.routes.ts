import { Routes } from "@angular/router";
import { Test0Component } from "./test0/test0.component";
import { Test1Component } from "./test1/test1.component";
import { Test2Component } from "./test2/test2.component";
import { TestsComponent } from "./tests.component";

export const TEST_ROUTES: Routes = [
  {path: '', component: TestsComponent, 
children: [{path: 'test0', component: Test0Component},
{path: 'test1', component: Test1Component},
{path: 'test2', component: Test2Component},
{path: '', redirectTo: 'test0', pathMatch: 'full'},]
}
  
]