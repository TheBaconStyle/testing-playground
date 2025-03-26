import { All, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { AnyRouter } from '@trpc/server';
import { AppRouterHost } from 'nestjs-trpc';
import { renderTrpcPanel } from 'trpc-panel';

@Controller('trpc-panel')
export class TrpcController implements OnModuleInit {
  private appRouter!: AnyRouter;

  constructor(
    @Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost,
  ) {}

  async onModuleInit() {
    this.appRouter = this.appRouterHost.appRouter;
  }

  @All()
  panel() {
    return renderTrpcPanel(this.appRouter, {
      url: 'http://localhost:5000/trpc',
    });
  }
}
