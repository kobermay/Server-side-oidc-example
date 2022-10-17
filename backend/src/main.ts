import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001'
    ],
    methods: ["GET", "POST"],
    credentials: true
  });

  const redisClient = redis.createClient({ legacyMode: true});
  redisClient.connect().catch(console.error);
  const RedisStore = connectRedis(session);
  redisClient.on('connect', () => console.log('connected with redis'));

  app.use(session({
    store: new RedisStore({client: redisClient as any}),
    secret: 'jfdkaljfldksajflksf',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
