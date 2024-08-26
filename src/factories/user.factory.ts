import { CheckoutUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function createRandomCheckoutUser(): CheckoutUserModel {
  const userCheckoutModel: CheckoutUserModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
  return userCheckoutModel;
}
