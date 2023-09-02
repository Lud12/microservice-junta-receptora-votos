import { Module } from '@nestjs/common';
import { JuntaReceptoraVotosController } from './junta-receptora-votos.controller';
import { JuntaReceptoraVotosService } from './junta-receptora-votos.service';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.prod',
    }),
  ],
  controllers: [JuntaReceptoraVotosController],
  providers: [JuntaReceptoraVotosService, PrismaService]
})
export class JuntaReceptoraVotosModule {}
