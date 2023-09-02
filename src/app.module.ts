import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JuntaReceptoraVotosModule } from './junta-receptora-votos/junta-receptora-votos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.prod'],
      isGlobal: true,
    }),
    JuntaReceptoraVotosModule,
  ],
})
export class AppModule {}
