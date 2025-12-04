import { Controller, Get, Route, Tags } from 'tsoa';

interface User {
  id: number;
  name: string;
  email: string;
}

@Route('users')
@Tags('User')
export class UserController extends Controller {
  
  @Get()
  public async getUsers(): Promise<User[]> {
    return [
      { id: 1, name: 'Max', email: 'max@example.com' },
      { id: 2, name: 'Maria', email: 'maria@example.com' }
    ];
  }
}