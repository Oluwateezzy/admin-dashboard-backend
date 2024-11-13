import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Login User', description: 'Login User' })
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
