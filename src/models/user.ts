/*
ChiThienTCN
user.ts = Difine model User class
*/
export class User {
    id: number;
    password: string;
    profile_picture: string;
    country_code: string;
    phone_number: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthday: string;
    company_name: string;
    address: string;
    state: string;
    city: string;
    zip_code: number;
    facebook_id: string;
    facebook_token: string;

    public getParams(firstName: string,
        lastName: string,
         email: string,
          countryCode: string,
          phoneNumber: string,
           password: string) {
        const param = new User();
        param.first_name = firstName;
        param.last_name = lastName;
        param.email = email;
        param.country_code = countryCode;
        param.phone_number = phoneNumber;
        param.password = password;
        return param;
    }
}
