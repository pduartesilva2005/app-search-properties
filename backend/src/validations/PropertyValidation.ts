import * as Yup from 'yup';

type Property = {
  type_property: string;
  city: string;
  state: string;
  neighborhood: string;
  price: number;
  dependencies: string;
};

export default async function PropertyValidation(data: Property) {
  const schema = Yup.object().shape({
    type_property: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    neighborhood: Yup.string().required(),
    price: Yup.number().required(),
    dependencies: Yup.string().required()
  });

  await schema.validate(data, {
    abortEarly: false
  });
}