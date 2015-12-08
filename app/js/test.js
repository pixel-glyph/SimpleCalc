// ---------------------------------------------------------------------------
// **Make sure app.js code isn't wrapped in immediate function before testing
// ---------------------------------------------------------------------------

describe("Calculation", function() {

  it("Addition", function() {

    val1 = 12;
    val2 = 10;
    currentOp = "+";
    compute();

    expect(ans.innerHTML).toEqual('22');

  });

  it("Exponentiation", function() {

    currentOp = "^";
    val2 = 2;
    compute();

    expect(ans.innerHTML).toEqual('484');

  });

});

describe("Full Clear", function() {

	it("clear all stored data", function() {

		form.innerHTML = 'some equation';
		numsInputted = [3,90,42];
		fullClear();

		expect(val1 && val2 && currentOp && form.innerHTML).toEqual('');
		expect(numsInputted.length && parseInt(ans.innerHTML)).toEqual(0);

	});

});
