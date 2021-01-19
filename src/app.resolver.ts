import { Resolver, Mutation, GqlExecutionContext, Query } from '@nestjs/graphql';
import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
  Body
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthPayload } from 'graphql.schema';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserCommand } from './users/commands/impl/create-user.command';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request.user;
  },
);

export class SignUp {
  email: string;
  username: string;
  password: string;
}
@Resolver('App')
export class AppResolver {
  constructor(private commandBus: CommandBus) {}
  @Mutation('signup')
  public async signup(@Body('input') input: SignUp) {
    try {
        console.log('inside signup mutation method');
      return await this.commandBus.execute(
        new CreateUserCommand(input.username, input.email, input.password),
      );
    } catch (err) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        err,
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Mutation('login')
  public async login(@CurrentUser() req): Promise<AuthPayload> {
    return {
      email: req.email,
    };
  }
  @Query('hello')
  public async hello(){
      console.log('inside resolver of graphql method');
      return "ali";
  }
}
