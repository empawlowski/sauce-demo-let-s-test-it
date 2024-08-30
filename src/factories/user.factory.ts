import { CheckoutUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function createRandomCheckoutUser(sex?: 'female' | 'male'): CheckoutUserModel {
  const userCheckoutModel: CheckoutUserModel = {
    firstName: faker.person.firstName(sex) ?? faker.person.firstName(),
    lastName: faker.person.lastName(sex) ?? faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
  return userCheckoutModel;
}
