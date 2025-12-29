import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { DealsComponent } from './pages/deals/deals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { MethodologyComponent } from './pages/methodology/methodology.component';
import { ResultsComponent } from './pages/results/results.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AffiliateDisclosureComponent } from './pages/affiliate-disclosure/affiliate-disclosure.component';
import { TermsComponent } from './pages/terms/terms.component';
import { TripPlannerComponent } from './pages/trip-planner/trip-planner.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'smart-planner', component: TripPlannerComponent },
	{ path: 'planner', redirectTo: 'smart-planner' }, // Legacy route - redirects to smart-planner
	{ path: 'results', component: ResultsComponent },
	{ path: 'hotels', component: HotelsComponent },
	{ path: 'flights', component: FlightsComponent },
	{ path: 'deals', component: DealsComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'how-it-works', component: HowItWorksComponent },
	{ path: 'methodology', component: MethodologyComponent },
	{ path: 'privacy-policy', component: PrivacyPolicyComponent },
	{ path: 'terms', component: TermsComponent },
	{ path: 'affiliate-disclosure', component: AffiliateDisclosureComponent },
	{ path: '**', redirectTo: '' }
];
