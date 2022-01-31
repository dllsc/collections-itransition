import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import LikeEntity from '../../db/like.entity';
import { createIdModel } from '../utils/database.utils';
import CollectionsEntity from '../../db/collections.entity';
import { LoggedUserService } from '../logged-user.service';
import UserEntity from '../../db/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('api/like')
export class LikesController {
  constructor(
    private readonly loggedUserService: LoggedUserService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post(':collectionId')
  async toggleLike(
    @Param('collectionId', ParseIntPipe) collectionId: number,
  ): Promise<boolean> {
    const collection = createIdModel<CollectionsEntity>({ id: collectionId });
    const user = createIdModel<UserEntity>({ id: this.loggedUserService.userId });

    const like = await LikeEntity.findOne({ where: { collection, user } });

    console.log(like);

    if (like) {
      await LikeEntity.remove(like);

      return false;
    }

    await LikeEntity.create({ user, collection }).save();

    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':collectionId')
  async isLiked(
    @Param('collectionId', ParseIntPipe) collectionId: number,
  ): Promise<boolean> {
    const collection = createIdModel<CollectionsEntity>({ id: collectionId });
    const user = createIdModel<UserEntity>({ id: this.loggedUserService.userId });

    return !!(await LikeEntity.count({ where: { collection, user } }));
  }

  @Get('total/:collectionId')
  async likesTotal(
    @Param('collectionId', ParseIntPipe) collectionId: number,
  ): Promise<number> {
    const collection = createIdModel<CollectionsEntity>({ id: collectionId });

    return await LikeEntity.count({ where: { collection } });
  }
}
