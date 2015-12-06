

//(function(){

	var ans = document.getElementById('answer-output'),
			form = document.getElementById('formula-output'),
			nums = document.getElementsByClassName('num'),
			ops = document.getElementsByClassName('op'),
			numsInputted = [],
			val, val1, val2, currentOp;

	function numClick() {
		// display input in form field and store individual nums
		// into an array
		form.insertAdjacentHTML('beforeend', this.innerHTML);
		numsInputted.push(this.innerHTML);
	}

	function opClick() {

		// check if last click was an operation and not a number
		if(! /[+\-*\/^]$/.test(form.innerHTML)) {

			if(numsInputted.length) {

				val = parseFloat(numsInputted.join(''));
				form.insertAdjacentHTML('beforeend', this.innerHTML);

				if(val1 !== "") {

					val2 = val;
					compute(val1, val2);

				} else {
					val1 = val;
				}
			} else {
				val1 = 0;
			}

			currentOp = this.innerHTML;

		} else {
			// update last char in formula field and currentOp
			form.innerHTML = form.innerHTML.slice(0, -1) + this.innerHTML;
			currentOp = this.innerHTML;
		}
	}

	function compute(val1, val2) {
		console.log("processing...");
	}

	// add handlers to numbered inputs
	for(var i=0; i<nums.length; i++) {
		nums[i].addEventListener('click', numClick);
	}

	// add handlers to operation inputs
	for (var i=0; i<ops.length; i++) {
		ops[i].addEventListener('click', opClick);
	}


//})();

