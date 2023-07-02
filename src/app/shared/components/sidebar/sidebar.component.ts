import { Component, ElementRef, OnInit } from "@angular/core";
import { NavigationEnd, Router, Event } from "@angular/router";
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    public SIDEBAR_EL = {
        DASHBOARD: 'dashboard',
        EXERCISE: 'exercise',
        EXERCISE_LIST: 'exercise-list',
        EXERCISE_CREATE: 'exercise-create',
        SUBMISSION: 'submission',
        SUBMISSION_LIST: 'submission-list',
        ACCOUNT: 'account',
        ACCOUNT_INFO: 'account-info',
        CHANGE_PASSWORD: 'change-password',
        LOGOUT: 'logout'
    };

    public currentState: string = this.SIDEBAR_EL.DASHBOARD;

    constructor(private router: Router) { }

    onElementClick(state: string) {
        this.currentState = state;
    }

    ngOnInit(): void {
        this.currentState = this.getCurrentState(this.router.url);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentState = this.getCurrentState(event.url);
            }
        })
    }

    private getCurrentState(url: string) : string {
        switch (url) {
            case '/admin':
                return this.SIDEBAR_EL.DASHBOARD;
            case '/admin/problem':
                return this.SIDEBAR_EL.EXERCISE;
        }
        return '';
    }
}