import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../constants/decorators/get-user-decorator';
import { User } from '../auth/user.entity';
import { RegisterPhysiqueDto } from './dto/register-physique.dto';
import { PhysiqueService } from './physique.service';
import { Physique } from './physique.entity';

@Controller('physique')
@UseGuards(AuthGuard())
export class PhysiqueController {
  constructor(private physiqueService: PhysiqueService) {}

  @Post()
  registerPhysique(
    @Body() registerPhysiqueDto: RegisterPhysiqueDto,
    @GetUser() user: User,
  ): Promise<Physique> {
    return this.physiqueService.registerPhysique(registerPhysiqueDto, user);
  }
}
