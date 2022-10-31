import { Component, OnInit } from '@angular/core';
import { Child } from '../models/Child';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-interface-deux',
  templateUrl: './interface-deux.component.html',
  styleUrls: ['./interface-deux.component.css'],
})
export class InterfaceDeuxComponent implements OnInit {
  children!: Child[];
  selectedChild: Child = new Child();
  selected!: boolean;
  childForm: FormGroup = new FormGroup({
    nom: new FormControl(),
    prenom: new FormControl(),
  });
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersChildren().subscribe(
      (res) => {
        console.log(res);
        this.children = res;
        this.selectedChild.first_name = this.children[0]['first_name'];
        this.selectedChild.last_name = this.children[0]['last_name'];
      },
      (error) => {
        alert('ERROR WHILE GETING DATA FROM SERVER');
      }
    );
  }
  onSelectChild(child: Child) {
    console.log(child);
    this.selected = true;
    this.selectedChild.first_name = child.first_name;
    this.selectedChild.last_name = child.last_name;
  }
}
