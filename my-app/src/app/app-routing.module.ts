import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { BloopComponent} from './bloop/bloop.component';
import { RecentRunsComponent } from './recent-runs/recent-runs.component';
import { HeatmapComponent } from './heatmap/heatmap.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bloop', component: BloopComponent},
  { path: 'recent', component: RecentRunsComponent},
  { path: 'heatmap', component: HeatmapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }