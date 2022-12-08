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
  return (P * i) / (1 - Math.pow(1 + i, -n));
}

it("should equal correct monthly payment amount", function () {
  expect(calcMonthlyPayment(10000, 10, 4.5)).toEqual(103.63840875701705);
});
