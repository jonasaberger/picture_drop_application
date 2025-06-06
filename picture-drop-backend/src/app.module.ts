import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { VouchersModule } from './vouchers/vouchers.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { SubmissionItemsModule } from './submission-items/submission-items.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

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
      authServerUrl: 'http://localhost:8080', // Keycloak server URL
      realm: process.env.REALM_NAME,         // Realm name from env
      clientId: 'private',                   // Client ID for this app
      secret: process.env.CLIENT_SECRET,    // Client secret from env
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
