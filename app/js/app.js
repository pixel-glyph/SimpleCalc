
//(function(){

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


	function operation() {

		// check if last click was an operation and not a number
		if(! /[+\-*\/^]$/.test(form.innerHTML)) {

			if(numsInputted.length) {

				val = numsInputted.join('');
				numsInputted = [];
				form.insertAdjacentHTML('beforeend', this.innerHTML);

				if(val1 !== '') {
					val2 = val;
					compute();
				} else {
					val1 = val;
				}

			} else if(ans.innerHTML === val1) {
				// when an op is clicked after equals
				form.insertAdjacentHTML('beforeend', val1 + this.innerHTML);

			} else {
				// when no numbers are entered, 0 will be used as first val
				val1 = 0;
				form.insertAdjacentHTML('beforeend', '0' + this.innerHTML);

			}

			currentOp = this.innerHTML;

			// if minus is clicked after *, /, or ^
		} else if(this.innerHTML === "-" && /[*\/^]$/.test(form.innerHTML)) {

			// add it to display, push to nums array, and keep currentOp as is
			form.insertAdjacentHTML('beforeend', this.innerHTML);
			numsInputted.push(this.innerHTML);

		} else if(! /[+\-*\/^][\-]$/.test(form.innerHTML)) {
			// update last char in formula field and currentOp
				form.innerHTML = form.innerHTML.slice(0, -1) + this.innerHTML;
				currentOp = this.innerHTML;
		}

	}


	function compute() {
		currentOp === '^' ?
				ans.innerHTML = Math.pow(val1, val2) :
				ans.innerHTML = eval(val1 + currentOp + val2);

		val1 = ans.innerHTML;
	}

	function fullClear() {
		semiClear();
		ans.innerHTML = '0';
		val1 = '';
	}

	function semiClear() {
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
	for (var i=0; i<ops.length; i++) {
		ops[i].addEventListener('click', operation);
	}

	document.getElementById('clear').addEventListener('click', function() {
		fullClear();
	});

	document.getElementById('equals').addEventListener('click', function() {
		val2 = numsInputted.join('');
		compute();
		semiClear();
	});

	document.getElementById('delete').addEventListener('click', function() {
		if(numsInputted.length) {
			numsInputted.pop();
			form.innerHTML = form.innerHTML.slice(0, -1);
		}
	});

	document.getElementById('decimal').addEventListener('click', function() {
		if(numsInputted.indexOf('.') === -1) {
			storeNum.apply(this);
		}
	});

//})();

