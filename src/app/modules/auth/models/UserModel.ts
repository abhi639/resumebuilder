import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  user_id: number,
  full_name: string,
  email: string,
  employee_Id: string,
  current_role: string,
  user_image: string,
  gender: string,
  mobile_number: string,
  location: string,
  date_of_joining: string,
  date_of_birth: string,
  linkedin_lnk: string,
  portfolio_link: string,
  blogs_link: string,
  modified_on: string,
  modified_by: string,
  image : any,

  // id: number
  // username: string
  // password: string | undefined
  // email: string
  // firstname?: string
  // lastname?: string
  // fullname?: string
  // occupation?: string
  // companyName?: string
  // phone?: string
  // roles?: Array<number>
  // pic?: string
  // language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  // timeZone?: string
  // website?: 'https://keenthemes.com'
  // emailSettings?: UserEmailSettingsModel
  // auth?: AuthModel
  // communication?: UserCommunicationModel
  // address?: UserAddressModel
  // socialNetworks?: UserSocialNetworksModel
}
