import { Controller, Post, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { fromNodeHeaders } from 'better-auth/node';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { auth } from 'shared/auth';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService<typeof auth>) {}

  @Post()
  getHello(@Req() req: FastifyRequest) {
    // const schemaObject = Object.keys(schema).reduce(
    //   (result, key: keyof typeof schema) => {
    //     if (key !== 'dbSchema') {
    //       const tableObject = getTableColumns(schema.user);

    //       const tableColumns = Object.keys(tableObject).map(
    //         (key: keyof typeof tableObject) => {
    //           const { table, ...columnData } = tableObject[key];
    //           return Object.keys(columnData).reduce((result, key) => {
    //             if (key !== 'config') {
    //               result[key] = columnData[key];
    //             }
    //             return result;
    //           }, {});
    //         },
    //       );

    //       result[key] = tableColumns;
    //     }
    //     return result;
    //   },
    //   {},
    // );

    // return schemaObject;

    return this.authService.api.userHasPermission({
      body: {
        userId: 'qweqweqwqwe',
        permissions: {
          habit: ['create'],
        },
      },
      headers: fromNodeHeaders(req.headers),
    });
  }
}
