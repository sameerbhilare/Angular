import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    collapsed = true;
    isAuthenticated = false;
    userSubscription: Subscription;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) {}


    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user; //!user ? false : true;
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}