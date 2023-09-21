import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public userId: string

  @column()
  public name: string

  @column()
  public description: string | null

  @column()
  public state: string

  @column()
  public color: string | null

  @column()
  public limitAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @hasOne(() => User)
  public users: HasOne<typeof User>
}
