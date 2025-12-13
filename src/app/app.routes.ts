import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { DealsComponent } from './pages/deals/deals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'hotels', component: HotelsComponent },
	{ path: 'flights', component: FlightsComponent },
	{ path: 'deals', component: DealsComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'how-it-works', component: HowItWorksComponent },
	{ path: '**', redirectTo: '' }
];
