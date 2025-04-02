import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private service1: MasterService) {}
  selectRole: string = '';

  changeRole(role: string) {
    debugger;
    this.service1.onCLassChange.next(role);
  }
}
