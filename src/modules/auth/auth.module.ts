import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports:[UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
