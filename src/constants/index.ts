import { JwtModule } from '@nestjs/jwt';

export const JwtModules = JwtModule.register({
  secret: 'ydfgsfgdgdgdffgdgdf',
  signOptions: { expiresIn: '3600s' },
});
