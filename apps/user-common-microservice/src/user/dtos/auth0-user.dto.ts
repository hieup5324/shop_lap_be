import { IsNotEmpty } from 'class-validator';

export class Auth0UserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  auth0userId: string;

  firstName: string;

  lastName: string;

  phone?: string;

  photoUrl?: string;

  address?: string;

  email: string;

  dateOfBirth?: Date;

  userRole: any;

  auth0user_token?: string;
}
