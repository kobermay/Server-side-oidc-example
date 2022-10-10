import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { buildOpenIdClient, OidcStrategy } from './oidc.strategy';
import { SessionSerializer } from './session.serializer';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async () => {
    const client = await buildOpenIdClient();
    const strategy = new OidcStrategy(client);
    return strategy;
  },
}
@Module({
  imports: [
    PassportModule.register({session: true, defaultStrategy: 'oidc'}),
  ],
  controllers: [AuthController],
  providers: [OidcStrategyFactory, SessionSerializer]
})
export class AuthModule {}
