/**
 *
 * @param {*} amount // Amount of principle.
 * @param {*} years // Number of years for loan.
 * @param {*} rate // Interest rate as a percent.
 * @returns (P * i) / (1 - (1+i)^{-n})
 */
function calcMonthlyPayment(amount, years, rate) {
  const P = amount;
  const n = years * 12; // total number of payments.
  const i = rate / 100 / 12; // yearly interest rate as a decimal
  if (rate === 0) {
    return amount / 12;
  } else {
    return (P * i) / (1 - Math.pow(1 + i, -n));
  }
}

it("should equal correct monthly payment amount", function () {
  expect(calcMonthlyPayment(10000, 10, 4.5)).toEqual(103.63840875701705);
});

it("should be 0 if interest is 0", function () {
  expect(calcMonthlyPayment(0, 10, 4.5)).toEqual(0);
});

it("should be initial amount / 12 if rate is 0", function () {
  expect(calcMonthlyPayment(10000, 10, 0)).toEqual(833.3333333333334);
});
