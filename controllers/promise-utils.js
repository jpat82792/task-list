let setQueryAblePromise = () =>{
	console.log("setQueryAblePromise()");
	if(promise.isResolved) return promise;

	let isPending = true;
	let isRejected = false;
	let isFulfilled = false;

	let result = promise.then(
		function(v){
			isFulfilled = true;
			isPending = false;
			return v;
		},
		function(e){
			isRejected = true;
			isPending = false;
			throw e;
		}
	);
	result.isFulfilled = () =>{return isFulfilled;};
	result.isPending = () => {return isPending;};
	result.isRejected = () =>{return isRejected;};
}

module.exports = {setQueryAblePromise:setQueryAblePromise}