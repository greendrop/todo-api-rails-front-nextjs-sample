import { AxiosResponse } from 'axios'
import Repository from './repository'
import { IUser } from '../models/user'

const OAUTH2_USERINFO_URL = process.env.OAUTH2_USERINFO_URL
const repository = Repository

export { repository as Repository }

export default {
  getMe: (): Promise<AxiosResponse<IUser>> =>
    repository.get(OAUTH2_USERINFO_URL),

  setHeaderAuthorization(value) {
    repository.defaults.headers.Authorization = value
  },
}
