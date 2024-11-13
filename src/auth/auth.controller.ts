import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { LoginDTO } from './dto/login.dto';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Login User', description: 'Login User' })
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Public()
  @Post('/register/admin')
  @ApiOperation({ summary: 'Register Admin', description: 'Register Admin' })
  registerAdmin() {
    return this.authService.registerAdmin();
  }
}
