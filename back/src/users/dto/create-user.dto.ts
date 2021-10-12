// import { IsAlphanumeric, Length, Validate } from 'class-validator'
// import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
// import { Injectable } from '@nestjs/common';

// @ValidatorConstraint({ name: 'UserExists', async: true })
// @Injectable()
// export class UserExistsRule implements ValidatorConstraintInterface {
//   constructor(private usersRepository: UsersRepository) {}

//   async validate(value: number) {
//     try {
//       await this.usersRepository.getOneOrFail(value);
//     } catch (e) {
//       return false;
//     }

//     return true;
//   }

//   // defaultMessage(args: ValidationArguments) {
//   //   return `User doesn't exist`;
//   // }
// }

export class CreateUserDto {
  // @Length(1, 30)
  // @IsAlphanumeric()
  // @Validate(UserExistsRule)
	userName: string;
  }

