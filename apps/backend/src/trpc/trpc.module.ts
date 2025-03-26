import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { TrpcController } from './trpc.controller';
import { TrpcContext } from './trpc.context';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/sdk',
      context: TrpcContext,
    }),
  ],
  providers: [TrpcContext],
  controllers: [TrpcController],
})
export class TrpcModule {}
