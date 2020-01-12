import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ToolsService {
  constructor() {}

  public async generateUniqId(repository: any, id: any): Promise<string> {
    while (true) {
      //VAINA LOCA CUSTOM ID
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
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public async trySave(entity) {
    try {
      await entity.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
