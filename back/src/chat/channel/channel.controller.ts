import { Body, Controller, Get, Post, Delete, Param, Res} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/utils/public.decorator';

import { ChannelService } from './channel.service';
import { Channel } from './channel.entity'
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelUserDto } from './dto/update-channel-users.dto';
import { ChannelPasswordDto } from './dto/channel-password.dto';
import { ChannelsAndOwnersDto } from './dto/channels-and-owners';
import { User } from 'src/users/user.entity';
import { IdDto } from 'src/users/dto/id.dto';

@Controller('channel')
export class ChannelController {
	constructor(
		private readonly channelService: ChannelService,
	) {}

	// ------ //
	//  POST  //
	// ------ //

	// @Public()
	@Post('createChannel')
	async createChannel(@Res() res, @Body() createChannelDto: CreateChannelDto) {
		if (await this.channelService.channelAlreadyExists(createChannelDto.channelName)) {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Channel already exists"
			})
		}
		const channel = await this.channelService.create(createChannelDto);
		return res.status(HttpStatus.CREATED).json({
			message: "Channel has been created successfully",
			channel
		})
	}

	// a verifier comment differencier upload avec param et upload comme ça dans la barre
	// là on doit upload /42Born2Code/ID alors que dans le channelService on utilise data en aprametre
	// a voir comment differencier les 2 datas et update le channel

	/*
		// @Public()
		@Post(':channelName/:UserID')
		async addChannelUser(@Param('channelName') channelName : string,
		@Param('UserID') UserID : number) : Promise<any> {
			return (this.channelService.addUserAsUser(channelName, UserID));
		}
	*/
	@Post('/admin/:channelName')
	async updateChannelAdmin(@Res() res, @Param('channelName') channelName: string, @Body() updateChannelUserDto: UpdateChannelUserDto) : Promise<any> {
		if (updateChannelUserDto.toAdd) {
			await this.channelService.addUserAsAdmin(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User added to admins"
			})
		}
		else {
			await this.channelService.removeUserAsAdmin(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User removed from admins"
			})
		}
	}
	@Post('/mute/:channelName')
	async updateChannelMuteList(@Res() res, @Param('channelName') channelName: string, @Body() updateChannelUserDto: UpdateChannelUserDto) :Promise<any> {
		if (updateChannelUserDto.toAdd) {
			await this.channelService.addUserAsMuted(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User added to muted"
			})
		}
		else {
			await this.channelService.removeUserAsMuted(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User removed from muted"
			})
		}
	}
	@Post('/ban/:channelName')
	async updateChannelBanList(@Res() res, @Param('channelName') channelName: string, @Body() updateChannelUserDto: UpdateChannelUserDto) :Promise<any> {
		if (updateChannelUserDto.toAdd) {
			await this.channelService.addUserAsBanned(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User added to banned"
			})
		}
		else {
			await this.channelService.removeUserAsBanned(channelName, updateChannelUserDto.user);
			return res.status(HttpStatus.OK).json({
				message: "User removed from banned"
			})
		}
	}

	@Post('/kick/:channelName')
	async addUserAsKicked(@Res() res, @Param('channelName') channelName: string, @Body() idDto: IdDto) :Promise<any> {
		await this.channelService.addUserAsKicked(channelName, idDto.id);
		return res.status(HttpStatus.OK).json({
			message: "User has been kikcked"
		})
	}


	// @Public()
	@Post('/update-user/:channelName')
	async addChannelUser(@Res() res, @Param('channelName') channelName: string, @Body() updateChannelUserDto: UpdateChannelUserDto) :Promise<void> {
		if (await this.channelService.findUserInChannel(channelName, updateChannelUserDto.user)) {
			if (!updateChannelUserDto.toAdd) {
				await this.channelService.userLeftChannel(channelName, updateChannelUserDto.user);
				return res.status(HttpStatus.OK).json({
					message: "User removed from channel"
				})
			}
			return res.status(HttpStatus.OK).json({
				message: "User already in channel"
			})
		}
		else if (updateChannelUserDto.toAdd) {
			this.channelService.addUserAsUser(channelName, updateChannelUserDto.user);
			console.log("newUser: " + updateChannelUserDto.user);
			return (
				res.status(HttpStatus.CREATED).json ({
					message: `"User successfully added to channel !" + "channelName"`
				})
			);
		}
	}

	// Nerver Used
	// @Public()
	@Post('join-private-channel/:channelName')
	async UserJoinPrivateChannel(@Res() res, @Param('channelName') channelName: string, @Body() channelPasswordDto: ChannelPasswordDto) {
		console.log("Trying to join channel: " + channelName);
		console.log("password : " + channelPasswordDto.password);
		if (!await this.channelService.findOne(channelName)) {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Channel does not exist.",
				value: false,
			})
		}
		else if (this.channelService.passwordMatch(channelName, channelPasswordDto.password)) {
			return res.status(HttpStatus.OK).json({
				message: "Joining channel",
				value: true,
			})
		}
		else {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Password does not match",
				value: false,
			})
		}
	}


  // ------ //
  //  GET   //
  // ------ //
	// @Public()
	@Get()
	async findAllChannels() : Promise<Channel[]> {
	  return (await this.channelService.findAll());
	}
	// @Public()
	@Get('public')
	async findAllPublicChannels(): Promise<ChannelsAndOwnersDto> {
	  return (await this.channelService.findAllPublicChannels());
	}

	// @Public()
	@Get('user/:userId')
	async findAllUserChannels(@Param('userId') userId: number): Promise<ChannelsAndOwnersDto> {
	  return (await this.channelService.findAllUserChannels(userId));
	}

	// @Public()
	@Get('infos/:channelName')
	async getChannelInfos(@Param('channelName') channelName: string) : Promise<Channel> {
		return (await this.channelService.findOne(channelName));
	}

	@Get('users/:channelName')
	async getUsersinChannel(@Param('channelName') channelName: string) : Promise<User[]> {
		return (await this.channelService.getUsersinChannel(channelName));
	}

	// @Public()
	@Get('messagesHistory/:channelName')
	getChannelHistory(@Param('channelName') channelName: string) : Promise<number[]> {
		return (this.channelService.getMessageHistory(channelName));
	}

	// @Public()
	@Get('channel-exist/:channelName')
	async channelExist(@Param('channelName') channelName: string) : Promise<any> {
		console.log("checking channel: " + channelName);

		if (await this.channelService.findOne(channelName))
			return (true);
		return (false);
	}

	@Get('banlist/:channelName')
	async getBanList(@Param('channelName') channelName: string) : Promise<User[]> {
		return (this.channelService.getBanListChannel(channelName));
	}

	// @Public()
	@Get('can-join-channel/:channelName')
	async canJoinChannel(@Res() res, @Param('channelName') channelName: string, @Body() channelPasswordDto: ChannelPasswordDto) {
		if (await this.channelService.passwordMatch(channelName, channelPasswordDto.password)) {
			return res.status(HttpStatus.OK).json({
				message: "Can join channel",
				value: true,
			})
		} else {
			return res.status(HttpStatus.CONFLICT).json({
				message: "Cannot join channel",
				value: false,
			})
		}
	}

	// ------- //
	//  DELETE //
	// ------- //

	// @Public()
	@Delete(':channelName')
	async deleteChannel(@Param('channelName') channelName : string) {
		await this.channelService.deleteOne(channelName);
		return ("successfully deleted");
	}

}
