export interface ProfileResponse {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly role: RoleSummery;
}
export interface RoleSummery {
  readonly id: string;
  readonly name: string;
}
