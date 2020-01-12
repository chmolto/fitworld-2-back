import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { ErrorConstants } from '../constants/error-constants';

export interface LooseObject {
  [key: string]: any;
}

@Injectable()
export class ToolsService {
  constructor() {}

  public async generateUniqId(repository: any, id?: any): Promise<string> {
    while (true) {
      let searchObj: LooseObject;
      const uniqId: string = this.uuidGenerator();

      // Search for custom id field
      if (id) {
        searchObj = { [id]: uniqId };
      }

      const check = await repository.find({
        where: id ? searchObj : { id: uniqId },
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
      if (error.code == ErrorConstants.ERROR_UNIQUE_COLUMN) {
        if (error.detail.includes('(username)')) {
          throw new ConflictException('Username already exists');
        }
        if (error.detail.includes('(email)')) {
          throw new ConflictException('Email already exists');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
