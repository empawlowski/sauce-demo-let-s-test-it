import { CheckoutUser } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function createRandomCheckoutUser(): CheckoutUser {
  const userCheckoutModel: CheckoutUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
  return userCheckoutModel;
}
