import { Component } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'E-Commerce';
  nael: any[] = ['nael', 'ola'];
  IsAdminUser = false

  constructor(private _SharedService: SharedService) {}
  ngOnInit() {
    // // using getIsAdmin normal observable
    // this._SharedService.getIsAdmin().subscribe({
    //   next: (res:any) => {
    //     this.IsAdminUser = res.isAdmin
    //     this._SharedService.updateIsAdmin(res.isAdmin)
    //   },
    // });
    // // using isAdmin$ as BehaviorSubject.asObservable()
    // this._SharedService.isAdmin$.subscribe({
    //   next: (res:any) => {
    //     this.IsAdminUser = res.isAdmin
    //   },
    // });
  }

}
