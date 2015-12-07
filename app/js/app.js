

//(function(){

	var ans = document.getElementById('answer-output'),
			form = document.getElementById('formula-output'),
			nums = document.getElementsByClassName('num'),
			ops = document.getElementsByClassName('op'),
			numsInputted = [],
			val1 = '',
			val2 = '',
			val, currentOp, result;


	function storeNum() {
		// display input in form field and store individual nums
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

			} else {
				val1 = 0;
				form.insertAdjacentHTML('beforeend', '0' + this.innerHTML);
			}
			currentOp = this.innerHTML;

			// if minus is clicked after *, /, or ^
		} else if(this.innerHTML === "-" && /[*\/^]$/.test(form.innerHTML)) {

			// add it to display, push to nums array, and keep currentOp as is
			form.insertAdjacentHTML('beforeend', this.innerHTML);
			numsInputted.push(this.innerHTML);

		} else {
			// update last char in formula field and currentOp
			form.innerHTML = form.innerHTML.slice(0, -1) + this.innerHTML;
			currentOp = this.innerHTML;
		}

	}


	function compute() {
		ans.innerHTML = eval(val1 + currentOp + val2);
		val1 = ans.innerHTML;
	}

	function clear() {
		form.innerHTML = '';
		numsInputted = [];
		val1 = '';
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

	document.getElementById('clear').addEventListener('click', function(){
		ans.innerHTML = '0';
		clear();
	});

	document.getElementById('equals').addEventListener('click', function(){
		//assign val2 to
		val2 = numsInputted.join('');
		compute();
		clear();
	});

//})();

