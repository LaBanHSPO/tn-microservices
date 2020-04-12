import { registerAs } from '@nestjs/config';

export default registerAs('queueConfig', () => {

  const rabitmqHost = process.env.RABITMQ_HOST;
  const rabitmqPort = process.env.RABITMQ_PORT;
  const rabitmqUser = process.env.RABITMQ_USER;
  const rabitmqPass = process.env.RABITMQ_PASS;
  return ({
    rabbitmq: `amqp://${rabitmqUser}:${rabitmqPass}@${rabitmqHost}:${rabitmqPort}`,
  })
});
