import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { TrpcController } from './trpc.controller';
import { TrpcContext } from './trpc.context';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV !== 'production'
          ? '../../apps/frontend/src/shared/sdk/lib'
          : undefined,
      context: TrpcContext,
    }),
  ],
  providers: [TrpcContext],
  controllers: [TrpcController],
})
export class TrpcModule {}
