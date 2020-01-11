import { Injectable } from '@nestjs/common';
import { genSalt } from 'bcrypt';

@Injectable()
export class IdGeneratorService {
  constructor() {}

  public async generateUniqId(repository: any): Promise<string> {
    const uniqId: string = await genSalt();
    const check = await repository.find({
      where: { id: uniqId },
    });
    if (check) {
      this.generateUniqId(repository);
    }
    return uniqId;
  }
}
