import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-order";
class BurgerBuilder extends Component {
  state = {
    purcheasing: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purcheaseHandler = () => {
    this.setState({ purcheasing: true });
  };

  purcheaseCanselHandler = () => {
    this.setState({ purcheasing: false });
  };

  purcheaseContinueHandler = () => {
    this.props.onInintPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingr,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>INGREDIENT CAN'T BE LOADED...</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingr) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purcheeable={this.updatePurchaseState(this.props.ingr)}
            ordered={this.purcheaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          purcheaseCancelled={this.purcheaseCanselHandler}
          purcheaseContinue={this.purcheaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purcheasing}
          modalClosed={this.purcheaseCanselHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
    onInintPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
