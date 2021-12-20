import { NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { TestUtil } from './../shared/testUtil';
import { UsuarioEntity } from './../entity/usuario.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService, {
        provide: getRepositoryToken(UsuarioEntity),
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('todosOsUsuarios', () => {
    it('deve listar todos os usuários', async () => {
      const usuario = TestUtil.obterUsuarioValido();
      mockRepository.find.mockReturnValue([usuario, usuario]);
      const usuarios = await service.todosOsUsuarios();
      expect(usuarios).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('usuarioPorCpf', () => {
    it('deve retornar um usuário válido', async () => {
      const usuario = TestUtil.obterUsuarioValido();
      mockRepository.findOne.mockReturnValue(usuario);
      const usuarioEncontrado = await service.usuarioPorCpf('01425462305');
      expect(usuarioEncontrado).toMatchObject({ cpf: usuario.cpf });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma exception usuário não encontrado', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.usuarioPorCpf('06334585402')).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })

  describe('cadastrarUsuario', () => {
    it('deve retonar um usuário válido', async () => {
      const usuario = TestUtil.obterUsuarioValido();
      mockRepository.create.mockReturnValue(usuario);
      mockRepository.save.mockReturnValue(usuario);
      const usuarioNovo = await service.cadastrar(usuario);
      expect(usuarioNovo).toMatchObject(usuario);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma exception usuário não cadastrado', async () => {
      const usuario = TestUtil.obterUsuarioValido();
      mockRepository.create.mockReturnValue(usuario);
      mockRepository.save.mockReturnValue(null);

      await service.cadastrar(usuario).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Erro interno do servidor'
        })
      });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(2);
    })
  });

  describe('atualizar', () => {
    it('deve retornar um usuario atualizado', async () => {
      const usuario = TestUtil.obterUsuarioValido();
      const atualizarUsuario = { nome: 'Nome novo' };
      mockRepository.update.mockReturnValue({ ...usuario, ...atualizarUsuario });
      mockRepository.findOne.mockReturnValue({ ...usuario, ...atualizarUsuario });
      const resultado = await service.atualizar(1, {
        ...usuario,
        ...atualizarUsuario
      });
      expect(resultado).toMatchObject(atualizarUsuario);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    })
  })

  describe('remover', () => {
    it('deve deletar usuario se existir', async () => {
      const esperado = { success: true };
      mockRepository.delete.mockReturnValue(esperado);
      const resultado = await service.remover(1);
      expect(resultado).toMatchObject(esperado);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
    it('não deve deletar usuario se existir', async () => {
      const esperado = { success: false };
      mockRepository.delete.mockReturnValue(null);
      const resultado = await service.remover(2);
      expect(resultado).toMatchObject(esperado);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  })

});
