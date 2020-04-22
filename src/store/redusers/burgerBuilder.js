import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIRNT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.6,
  meat: 1.3,
};

const addIngredient = (state, action) => {
  const undatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const undatedIngredients = updateObject(state.ingredients, undatedIngredient);
  const updatedState = {
    ingredients: undatedIngredients,
    totalPrice: state.totalPrice + INGREDIRNT_PRICES[action.ingredientName],
    buliding: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const undatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const undatedIngs = updateObject(state.ingredients, undatedIng);
  const updatedSt = {
    ingredients: undatedIngs,
    totalPrice: state.totalPrice + INGREDIRNT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese,
    },
    titalPrice: 4,
    error: false,
    building: false,
  });
};

const reduser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reduser;
