// n = n items
// val[] = value of items
// W = capacity of the sack
// wt[] = weight of items

var values = [130, 60, 120];
var weights = [10, 20, 30];

//var values = [60, 100,120];
//var weights = [10, 20, 30];
var W = 50;


function KnapSackGreedy(W, values, weights, n){
	// Stop when there's no more space or items
	if(W == -1 || n == -1){
		return 0;
	}
	
	console.log(W);
	console.log(n);
	console.log(weights[n]);
	console.log("======================");
	// If this one doesn't feed, jump to the next one
	if(weights[n] >  W){
		return KnapSackGreedy(W, values, weights, n-1);
	} else{
		return Math.max(values[n] + KnapSackGreedy(W-weights[n], values, weights, n-1), KnapSackGreedy(W, values, weights, n-1));
	}
	
}

//console.log(KnapSackGreedy(W,values,weights,values.length-1));

var result = [];

//Preoccupy with the first base value
result[0] = {value:values[values.length-1], weight:weights[values.length-1]};
function KnapSackDynamic(W, values, weights, main_header, comparison_header, result_length){	
	if(main_header == -1 || comparison_header == -1){
		return 0;
	}
	
	//If the current new weight + the existing weight is bigger than threshold, then you choose the max by comparing the result from
	//testing add the next comparing value, or change the next base value
	if(parseInt(result[result_length].weight) + parseInt(weights[comparison_header]) > parseInt(W) && parseInt(comparison_header) >= 0){
		if (comparison_header > 0){
			result.push();
			var length = result_length+1;
			result[length] = {value:values[main_header], weight:weights[main_header]};
			return KnapSackDynamic(W, values, weights, main_header, comparison_header-1, length);
		} 
		
		if (main_header > 0){
			result.push();
			var length = result_length+1;
			result[length] = {value:values[main_header-1], weight:weights[main_header-1]};
			return KnapSackDynamic(W, values, weights, main_header-1, comparison_header, length);
		} 
		
		if(main_header <=0 && comparison_header <=0){
			return 0;
		}
	} else{
		//Keep adding weight until the existing bag exceeds the threshold
		result[result_length] = {value: result[result_length].value+values[comparison_header], weight:result[result_length].weight+weights[comparison_header]};
		return KnapSackDynamic(W, values, weights, main_header, comparison_header, result_length);
	}
}

KnapSackDynamic(W,values,weights,values.length-1, values.length-1, 0);

//Find the max after you have listed all combinations
result.sort((a, b) => (a.value > b.value) ? 1 : -1)
console.log(result);
console.log("+++++++++++++++++++");
console.log(result[result.length-1]);