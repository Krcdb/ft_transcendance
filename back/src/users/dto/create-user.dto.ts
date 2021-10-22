// import { IsAlphanumeric, Length, Validate } from 'class-validator'

export class CreateUserDto {
  // @Length(1, 30)
  // @IsAlphanumeric()
  // @Validate(UserExistsRule)
  id: number;
	userName: string;
}
