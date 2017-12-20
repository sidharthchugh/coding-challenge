export const validate = (email, age, beerConsumption) => {
    // true means invalid, so our conditions got reversed
    return {
      email: email.length === 0,
      age: age.length === 0,
      beerConsumption: beerConsumption.length === 0,
    };
  }