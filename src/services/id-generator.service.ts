import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService {
  constructor() {}

  public async generateUniqId(repository: any): Promise<string> {
    while (true) {
      const uniqId: string = this.uuidGenerator();
      const check = await repository.find({
        where: { id: uniqId },
      });
      if (check.length == 0) {
        return uniqId;
      }
    }
  }

  public uuidGenerator(): string {
    return 'xxxxxxxx'.replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
