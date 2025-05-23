/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { VouchersModule } from './vouchers/vouchers.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { SubmissionItemsModule } from './submission-items/submission-items.module';
import { SubmissionsModule } from './submissions/submissions.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { env } from 'process';

@Module({
  imports: [UsersModule, DatabaseModule, VouchersModule, WorkspacesModule, SubmissionItemsModule, SubmissionsModule],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    VouchersModule,
    WorkspacesModule,
    SubmissionItemsModule,
    SubmissionsModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080', //your URL Keycloak server
      realm: process.env.REALM_NAME, //realms that used for this app
      clientId: 'private', //client id for this app
      secret: process.env.CLIENT_SECRET, //secret for this app
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


