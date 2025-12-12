import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('About TripSaver - Your Trusted Agoda Hotel Deals Platform');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'TripSaver partners with Agoda to bring you the best hotel deals worldwide. Trusted by 50K+ travelers. Save money on every booking with exclusive Agoda offers.' 
    });
  }

  stats: Stat[] = [
    { icon: 'people', value: '50K+', label: 'Happy Travelers' },
    { icon: 'savings', value: '₹2Cr+', label: 'Money Saved' },
    { icon: 'hotel', value: '10K+', label: 'Agoda Hotels' },
    { icon: 'star', value: '4.5+', label: 'Average Rating' }
  ];

  features = [
    {
      icon: 'hotel',
      title: 'Best Agoda Deals',
      description: 'Discover exclusive Agoda hotel deals and discounts curated just for you.'
    },
    {
      icon: 'verified',
      title: 'Trusted Partner',
      description: 'We partner with Agoda, a leading global hotel booking platform trusted by millions.'
    },
    {
      icon: 'attach_money',
      title: 'Save More',
      description: 'Get access to special Agoda offers and promotions that help you save on every booking.'
    },
    {
      icon: 'public',
      title: 'Worldwide Hotels',
      description: 'Access millions of properties worldwide through Agoda\'s extensive network.'
    }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Transparency',
      description: 'We believe in complete transparency about how we work and earn.'
    },
    {
      icon: '💰',
      title: 'Value',
      description: 'Helping you get the best value for your money is our top priority.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building long-term relationships based on trust and reliability.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Constantly improving to provide you with the best experience.'
    }
  ];
}
