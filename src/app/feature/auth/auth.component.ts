import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    public currentPage: string = 'Đăng nhập';
    
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                switch (event.url) {
                    case '/auth/login':
                        this.currentPage = 'Đăng nhập';
                        break;
                    case '/auth/register':
                        this.currentPage = 'Đăng kí';
                        break;
                }
            }
        })
    }
}