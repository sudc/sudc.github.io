import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle('About TripSaver - Data-Driven Travel Recommendations');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Learn about TripSaver - transparent, data-driven travel recommendations powered by intelligent scoring engines. No sponsored rankings, just smart travel decisions.'
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'about TripSaver, travel recommendations, data-driven travel, transparent travel platform, smart destinations'
    });
  }
}
