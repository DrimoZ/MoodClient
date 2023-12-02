export interface DtoInputProfile {
  Login: string;

  Name: string;
  Title: string;

  Account: {
    BirthDate: string
    Description: string
    PhoneNumber: string
  }

  FriendCount: number
  PublicationCount: number
}
