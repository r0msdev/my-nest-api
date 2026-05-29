import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment author name',
    example: 'Mercedes Tyler',
  })
  @IsString()
  @MaxLength(80)
  name: string;

  @ApiProperty({
    description: 'Comment author email',
    example: 'mercedes_tyler@fakegmail.com',
  })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'Comment text body',
    example:
      'Eius veritatis vero facilis quaerat fuga temporibus. Praesentium expedita sequi repellat id.',
  })
  @IsString()
  @MaxLength(2000)
  text: string;
}
