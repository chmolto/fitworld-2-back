import { createParamDecorator } from '@nestjs/common';
import { User } from '../../auth/user.entity';

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  },
);
