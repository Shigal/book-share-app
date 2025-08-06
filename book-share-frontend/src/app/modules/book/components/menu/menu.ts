import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    const linkColor = document.querySelectorAll('.nav-link');
    console.log("====: " , linkColor)
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
        console.log('---1', link.getAttribute('href'))
    
        console.log('=== link: ' + JSON.stringify(link))
      }
      link.addEventListener('click', () => {
                console.log("---2")
        linkColor.forEach(l => {
                  console.log("---3")
          l.classList.remove('active');
        });
        link.classList.add('active');
      })
    })
  }
  }

  logout(){

  }

}
