import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngregietns = (ingredietns) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredietns,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-myburger-9f854.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngregietns(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
