
(function() {


	var ans = document.getElementById('answer-output'),
			form = document.getElementById('formula-output'),
			nums = document.getElementsByClassName('num'),
			ops = document.getElementsByClassName('op'),
			numsInputted = [],
			val1 = '',
			val2 = '',
			val, currentOp;


	function storeNum() {

		// check if last click was equals button. If so, clear out
		// all values before storing current number click
		if(ans.innerHTML === val1 && currentOp === '') {
			fullClear();
		}
		// display input in equation field and store individual nums
		// into an array
		form.insertAdjacentHTML('beforeend', this.innerHTML);
		numsInputted.push(this.innerHTML);

	}

	// called only when an operator is clicked (+,-,*,/,^)
	function operation() {

		// check if previous click was an operator and not a number
		// if so, proceed to next block
		if( !/[+\-*\/^]$/.test(form.innerHTML) ) {

			if(numsInputted.length) {

				// if nums array is populated, store values in val,
				// clear array, and show current op in equation display
				val = numsInputted.join('');
				numsInputted = [];
				form.insertAdjacentHTML('beforeend', this.innerHTML);

				// if val1 contains a value, val2 gets last input and
				// compute is called, else val1 is assigned the input
				// this will dynamically show the answer each time an
				// op is clicked
				if(val1 !== '') {
					val2 = val;
					compute();
				} else {
					val1 = val;
				}

				// this will be true when an op is clicked after equals
			} else if(ans.innerHTML === val1) {

				// and so the previous answer and current op will be
				// displayed in equation field
				form.insertAdjacentHTML('beforeend', val1 + this.innerHTML);

			} else {

				// when no numbers have yet been
				// entered, 0 is used as first val
				val1 = 0;
				form.insertAdjacentHTML('beforeend', '0' + this.innerHTML);

			}

			// store currently selected op
			currentOp = this.innerHTML;

			// if minus is clicked as a negator after *, /, or ^
		} else if( this.innerHTML === '-' && /[*\/^]$/.test(form.innerHTML) ) {

			// add it to display, push to nums array, and keep currentOp as is
			form.insertAdjacentHTML('beforeend', this.innerHTML);
			numsInputted.push(this.innerHTML);

			// finally check if last two chars in equation field are any op
			// followed by a minus (as a negator to a future num input)
			// if this is not the case, overwrite previous op with current op
			// this prevents overwriting a minus acting as a negator with the
			// current op
		} else if( !/[+\-*\/^][\-]$/.test(form.innerHTML) ) {

			// replace last char in equation field and update currentOp
			form.innerHTML = form.innerHTML.slice(0, -1) + this.innerHTML;
			currentOp = this.innerHTML;

		}

	}

	function compute() {

		// perform proper calculation based on currentOp then store the
		// result in val1 in case next calculation is chained
		currentOp === '^' ?
				ans.innerHTML = Math.pow(val1, val2) :
				ans.innerHTML = eval(val1 + currentOp + val2);

		val1 = ans.innerHTML;

	}

	function fullClear() {

		// clears out all stored values
		semiClear();
		ans.innerHTML = '0';
		val1 = '';

	}

	function semiClear() {

		// keeps val1 and doesn't wipe answer display
		form.innerHTML = '';
		numsInputted = [];
		currentOp = '';
		val2 = '';

	}


	// add handlers to numbered inputs
	for(var i=0; i<nums.length; i++) {
		nums[i].addEventListener('click', storeNum);
	}

	// add handlers to operation inputs
	for (var j=0; j<ops.length; j++) {
		ops[j].addEventListener('click', operation);
	}

	document.getElementById('clear').addEventListener('click', function() {

		fullClear();

	});

	document.getElementById('equals').addEventListener('click', function() {

		// store second value, perform calculation, then call semiClear in
		// case next input is an op
		val2 = numsInputted.join('');
		compute();
		semiClear();

	});

	document.getElementById('delete').addEventListener('click', function() {

		// remove last value in nums array and last char in equation display
		// but only if nums array is not empty (input is only removed to last op)
		if(numsInputted.length) {
			numsInputted.pop();
			form.innerHTML = form.innerHTML.slice(0, -1);
		}

	});

	document.getElementById('decimal').addEventListener('click', function() {

		// only store decimal if not already in nums array (no double decimals!)
		if(numsInputted.indexOf('.') === -1) {
			storeNum.apply(this);
		}

	});


})();
