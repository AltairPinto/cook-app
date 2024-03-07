import * as ingredients from "./ingredientsService";

export const services = {
  ingredients,
  storage: {
    imagePath: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ingredients`,
  },
};
