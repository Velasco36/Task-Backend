import { DateTime } from 'luxon'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public nick_name: string;

  @column({
    prepare: (value: string) => Encryption.encrypt(value),
    consume: (value: string) => Encryption.decrypt(value),
  })
  public password: string;

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
