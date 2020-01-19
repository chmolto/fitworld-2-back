import { Injectable } from '@nestjs/common';
import { Physique } from './physique.entity';
import { RegisterPhysiqueDto } from './dto/register-physique.dto';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysiqueRepository } from './physique.repository';
import { ToolsService } from '../services/tools.service';

@Injectable()
export class PhysiqueService {
  constructor(
    @InjectRepository(PhysiqueRepository)
    private physiqueRepository: PhysiqueRepository,
    private toolsService: ToolsService,
  ) {}
  async registerPhysique(
    registerPhysiqueDto: RegisterPhysiqueDto,
    user: User,
  ): Promise<Physique> {
    const date = registerPhysiqueDto.date
      ? registerPhysiqueDto.date
      : new Date();
    const physique = new Physique(
      user,
      registerPhysiqueDto.photos,
      registerPhysiqueDto.weight,
      registerPhysiqueDto.bodyfatPercent,
      registerPhysiqueDto.musclemassPercent,
      date,
    );
    await this.toolsService.trySave(physique);
    delete physique.user;
    return physique;
  }
}
