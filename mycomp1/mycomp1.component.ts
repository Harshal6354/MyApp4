import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycomp1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mycomp1.component.html',
  styleUrl: './mycomp1.component.css'
})
export class Mycomp1Component {
  router=inject(Router)
    userObj:any={
      username:'',
      password:'',
    }

    onlogin(){
      if(this.userObj.username==='harshal' && this.userObj.password==='1234'){
        alert("login success")
        this.router.navigateByUrl('dashboard')
    }
  else{
    alert("wrong credential")
  }
}
}