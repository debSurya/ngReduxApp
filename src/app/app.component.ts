import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  title = 'ngReduxApp';
  defaultRouteSub: Subscription;

  ngOnInit() {
    this.defaultRouteSub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== 'details') {
          this.router.navigate(['details']);
        }
        this.defaultRouteSub.unsubscribe();
      }
    })
  }
}
