import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  getHello(): string {
    return 'Bem vindo à API da Negócio Animal!';
  }

  getHelloName(name: string): string {
    return `Olá ${name}!`;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const checkUserExists = await this.authService
      .getUserFromEmail(payload.email)
      .then((u) => {
        return u;
      });
    if (checkUserExists) {
      return await this.authService.loginGoogle(payload.email);
    } else {
      const userToken = await this.authService.createUserFromGoogle(payload);
      return userToken;
    }
  }
}
