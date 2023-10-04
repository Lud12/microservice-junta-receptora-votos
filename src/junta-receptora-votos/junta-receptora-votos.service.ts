import { Injectable } from '@nestjs/common';
import { Prisma, jrv_miembros, junta_receptora_votos } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JuntaReceptoraVotosService {
  changeStatus(id: any, estado: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly model: PrismaService) {}

  async create(
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosCreateInput,
  ): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.create({
      data: juntaReceptoraVotosDTO,
    });
  }

  async findAll(): Promise<junta_receptora_votos[]> {
    return await this.model.junta_receptora_votos.findMany({
      select: {
        id_jrv: true,
        id_centro_votacion: true,
        codigo: true,
        estado: true,
        creado_en: true,
        modificado_en: true,
        centro_votacion: true,
        jrv_miembros: true,
      },
    });
  }

  async findOne(id: number): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.findUnique({
      where: {
        id_jrv: id,
      },
    });
  }

  async update(
    id: number,
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosUpdateInput,
  ): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.update({
      where: {
        id_jrv: id,
      },
      data: juntaReceptoraVotosDTO,
    });
  }

  async delete(id: number) {
    return await this.model.junta_receptora_votos.delete({
      where: {
        id_jrv: id,
      },
    });
  }

  async getMembersByJRVId(id_jrv: number): Promise<jrv_miembros[]> {
    const members = await this.model.jrv_miembros.findMany({
      where: {
        id_jrv: id_jrv,
      },
    });
    return members;
  }

  async getMemberById(
    id_jrv: number,
    id_jrv_miembro: number,
  ): Promise<jrv_miembros> {
    return await this.model.jrv_miembros.findUnique({
      where: {
        id_jrv_miembro: id_jrv_miembro,
        id_jrv: id_jrv,
      },
    });
  }

  async getMemberByIdPersonaNatural(
    id_jrv: number,
    id_persona_natural: number,
  ): Promise<jrv_miembros> {
    return await this.model.jrv_miembros.findFirst({
      where: {
        id_persona_natural: id_persona_natural,
        id_jrv: id_jrv,
      },
    });
  }

  async createMember(
    miembroJrv: Prisma.jrv_miembrosCreateInput,
  ): Promise<jrv_miembros> {
    
    return await this.model.jrv_miembros.create({
      data: miembroJrv,
    });
  }

  async updateMember(
    id: number,
    juntaReceptoraVotosDTO: Prisma.jrv_miembrosUncheckedUpdateInput,
  ): Promise<jrv_miembros> {
    return await this.model.jrv_miembros.update({
      where: {
        id_jrv_miembro: id,
      },
      data: juntaReceptoraVotosDTO,
    });
  }

  async deleteMember(id: number) {
    return await this.model.jrv_miembros.delete({
      where: {
        id_jrv_miembro: id,
      },
    });
  }
  
}
