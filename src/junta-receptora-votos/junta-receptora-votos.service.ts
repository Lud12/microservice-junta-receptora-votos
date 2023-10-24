import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, jrv_miembros, junta_receptora_votos } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JuntaReceptoraVotosService {
  constructor(private readonly model: PrismaService) {}

  async create(
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosCreateInput,
  ): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.create({
      data: juntaReceptoraVotosDTO,
    });
  }

  async findAllByMunicipio(id_municipio: number): Promise<any> {
    const centrosVotacion = await this.model.centros_votacion.findMany({
      where: {
        id_municipio: id_municipio
      }
    })
    const idsCentrosVotacion = centrosVotacion.map((centro) => centro.id_centro_votacion)

    return await this.model.junta_receptora_votos.findMany({
      where: {
        id_centro_votacion: {
          in: idsCentrosVotacion
        }
      },
      select: {
        id_jrv: true,
        id_centro_votacion: true,
        codigo: true,
        estado: true,
        creado_en: true,
        modificado_en: true,
        centro_votacion: {
          select: {
            id_centro_votacion: true,
            id_municipio: true,
            nombre: true,
            direccion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            municipios: {
              select: {
                id_municipio: true,
                nombre: true,
                departamentos: {
                  select: {
                    id_departamento: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        jrv_miembros: {
          select: {
            id_jrv_miembro: true,
            id_jrv: true,
            id_usuario: true,
            estado: true,
            usuario: {
              select: {
                id_usuario: true,
                id_rol: true,
                nombres: true,
                apellidos: true,
                dui: true,
                usuario: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                Rol: true,
              },
            },
          },
        },
      },
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
        centro_votacion: {
          select: {
            id_centro_votacion: true,
            id_municipio: true,
            nombre: true,
            direccion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            municipios: {
              select: {
                id_municipio: true,
                nombre: true,
                departamentos: {
                  select: {
                    id_departamento: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        jrv_miembros: {
          select: {
            id_jrv_miembro: true,
            id_jrv: true,
            id_usuario: true,
            estado: true,
            usuario: {
              select: {
                id_usuario: true,
                id_rol: true,
                nombres: true,
                apellidos: true,
                dui: true,
                usuario: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                Rol: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<junta_receptora_votos> {
    
    const members =  await this.model.junta_receptora_votos.findUnique({
      where: {
        id_jrv: id,
      },
      select: {
        id_jrv: true,
        id_centro_votacion: true,
        codigo: true,
        estado: true,
        creado_en: true,
        modificado_en: true,
        centro_votacion: {
          select: {
            id_centro_votacion: true,
            id_municipio: true,
            nombre: true,
            direccion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            municipios: {
              select: {
                id_municipio: true,
                nombre: true,
                departamentos: {
                  select: {
                    id_departamento: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        jrv_miembros: {
          select: {
            id_jrv_miembro: true,
            id_jrv: true,
            id_usuario: true,
            estado: true,
            usuario: {
              select: {
                id_usuario: true,
                id_rol: true,
                nombres: true,
                apellidos: true,
                dui: true,
                usuario: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                Rol: true,
              },
            },
          },
        },
      },
    });
    return members;
    
  }

  async findOneByCode(code: string): Promise<junta_receptora_votos> {
    return await this.model.junta_receptora_votos.findFirst({
      where: {
        codigo: code,
      },
    });
  }

  async update(
    id: number,
    juntaReceptoraVotosDTO: Prisma.junta_receptora_votosUpdateInput,
  ): Promise<junta_receptora_votos> {
    let countCodigo = await this.model.junta_receptora_votos.count({
      where: {
        codigo: juntaReceptoraVotosDTO.codigo.toString(),
        NOT: {
          id_jrv: id,
        },
      },
    });

    if (countCodigo == 1)
      throw new HttpException('JRV ya posee este nombre', HttpStatus.NOT_FOUND);

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

  async changeStatusJrv(id: number): Promise<junta_receptora_votos> {
    let estado = await this.model.junta_receptora_votos.findUnique({
      where: {
        id_jrv: id,
      },
    });

    if (estado.estado == 'ABIERTA') estado.estado = 'CERRADA';
    else estado.estado = 'ABIERTA';

    return await this.model.junta_receptora_votos.update({
      where: {
        id_jrv: id,
      },
      data: {
        estado: estado.estado,
      },
    });
  }

  async getMembersByJRVId(id_jrv: number): Promise<any> {

    const members = await this.model.jrv_miembros.findMany({
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
        jrv: {
          select: {
            id_jrv: true,
            codigo: true,
            id_centro_votacion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            centro_votacion: {
              select: {
                id_centro_votacion: true,
                id_municipio: true,
                nombre: true,
                direccion: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                municipios: {
                  select: {
                    id_municipio: true,
                    nombre: true,
                    departamentos: {
                      select: {
                        id_departamento: true,
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            id_rol: true,
            nombres: true,
            apellidos: true,
            dui: true,
            usuario: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            Rol: true,
          },
        },
      },
      where: {
        id_jrv: id_jrv,
      },
    });
    console.log(members);
    
    return members;
  }

  async getMembers(): Promise<any> {

    return await this.model.jrv_miembros.findMany({
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
        jrv: {
          select: {
            id_jrv: true,
            codigo: true,
            id_centro_votacion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            centro_votacion: {
              select: {
                id_centro_votacion: true,
                id_municipio: true,
                nombre: true,
                direccion: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                municipios: {
                  select: {
                    id_municipio: true,
                    nombre: true,
                    departamentos: {
                      select: {
                        id_departamento: true,
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            id_rol: true,
            nombres: true,
            apellidos: true,
            dui: true,
            usuario: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            Rol: true,
          },
        },
      },
    });
  }

  async getMemberById(id_jrv_miembro: number): Promise<any> {
    return await this.model.jrv_miembros.findUnique({
      where: {
        id_jrv_miembro: id_jrv_miembro,
      },
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
        jrv: {
          select: {
            id_jrv: true,
            codigo: true,
            id_centro_votacion: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            centro_votacion: {
              select: {
                id_centro_votacion: true,
                id_municipio: true,
                nombre: true,
                direccion: true,
                estado: true,
                creado_en: true,
                modificado_en: true,
                municipios: {
                  select: {
                    id_municipio: true,
                    nombre: true,
                    departamentos: {
                      select: {
                        id_departamento: true,
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        usuario: {
          select: {
            id_usuario: true,
            id_rol: true,
            nombres: true,
            apellidos: true,
            dui: true,
            usuario: true,
            estado: true,
            creado_en: true,
            modificado_en: true,
            Rol: true,
          },
        },
      },
    });
  }

  async getMemberByUserId(id_usuario: number, id_jrv: number): Promise<any> {
    return await this.model.jrv_miembros.findFirst({
      select: {
        id_jrv_miembro: true,
        id_jrv: true,
        id_usuario: true,
        estado: true,
      },
      where: {
        id_usuario: id_usuario,
        id_jrv: id_jrv
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
    miembroData: Prisma.jrv_miembrosUncheckedUpdateInput,
  ): Promise<any> {
    let jrv = parseInt(miembroData.id_jrv.toString());

    let miembrosActivos = await this.model.jrv_miembros.findMany({
      where: {
        id_jrv: jrv,
        estado: 'ACTIVO',
        NOT: {
          id_jrv_miembro: id
        }
      },
    });

    if (miembrosActivos.length >= 6)
      throw new HttpException(
        'Junta Receptora de Votos llena',
        HttpStatus.NOT_FOUND,
      );

    return await this.model.jrv_miembros.update({
      where: {
        id_jrv_miembro: id,
      },
      data: miembroData,
    });
  }

  async deleteMember(id: number) {
    return await this.model.jrv_miembros.delete({
      where: {
        id_jrv_miembro: id,
      },
    });
  }

  async changeStatusJrvMember(id_jrv_miembro: number): Promise<jrv_miembros> {
    let estado = await this.model.jrv_miembros.findUnique({
      where: {
        id_jrv_miembro: id_jrv_miembro,
      },
    });

    if (estado.estado == 'ACTIVO') estado.estado = 'INACTIVO';
    else estado.estado = 'ACTIVO';

    return await this.model.jrv_miembros.update({
      where: {
        id_jrv_miembro: id_jrv_miembro,
      },
      data: {
        estado: estado.estado,
      },
    });
  }
}
