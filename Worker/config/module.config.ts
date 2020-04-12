import { registerAs } from '@nestjs/config';

export default registerAs('moduleConfig', () => ({
  jwtSecret : process.env.JWT_SECRET,
  expiresIn : process.env.EXPIRED_IN || '99999y'
}));