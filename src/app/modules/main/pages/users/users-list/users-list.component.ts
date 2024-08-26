import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { users } from '../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: users[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'address', 'email', 'actions'];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.usersService.users$.subscribe(users => {
      this.users = users;
    });
  }


  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  editUser(user: users): void {
    this.usersService.setCurrentUser(user);
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado con éxito');
          this.loadUsers(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Hubo un error al eliminar el usuario.');
        }
      });
    }
  }
}
