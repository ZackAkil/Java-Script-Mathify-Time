/*
Mathify prototype code 
Author - Zack Akil, 24 Nov 2015
*/
function generateAddition(num){

	ran = Math.floor((Math.random() * (num-1)) + 1);
	ran2 = num - ran;
	
	return [ran,ran2];	
}

function generateSubtraction(num){

	ran = Math.floor((Math.random() * (num-1)) + 1);
	ran2 = num + ran;

	return [ran2,ran];	
}

function generateMultiplication(num){

	range = num/2;
	for(i = 0; i<25; i++){
		ran = Math.floor((Math.random() * (range)) + 2);
		test = num%ran;
		if(test==0){
			return [(num/ran), ran]
		}
	}
	return null;
}

function generateDivisible(num){

	range = 10;
	ran = Math.floor((Math.random() * (range)) + 2);

	return [(num*ran), ran]
}

function injectReplacingChar(arrayToInject, arrayToInjectInto, indexToInjectAt){

	hold = [];
	//pull all items from back upto the index to inject at
	for(i = arrayToInjectInto.length; i > indexToInjectAt; i--){
		hold.push(arrayToInjectInto.pop());
	}
	//place injection into array
	for(i = 0; i < arrayToInject.length; i++){
		arrayToInjectInto[indexToInjectAt + i] = arrayToInject[i];
	}
	//discard first char
	hold.pop();
	//push the holding chars onto array after the inject
	var holdLength = hold.length;
	for(i = 0; i < holdLength; i++){
		arrayToInjectInto.push(hold.pop());
	}

	return arrayToInjectInto;
}

function getLocationOfNums(array){

	arrayOfIndexs = [];

	for(i = 0; i < array.length; i++){
		if(!isNaN(array[i])){
			arrayOfIndexs.push(i);
		}
	}
	return arrayOfIndexs;
}

function buildQ(time){

	structure = [time];
	quizifyCount = 0;


	while(quizifyCount < 2){

		numLocations = getLocationOfNums(structure);
		valToPluck = Math.floor(Math.random() * (numLocations.length));
		val = structure[numLocations[valToPluck]];

		qToDo = Math.floor((Math.random() * (3)) + 1);

		switch (qToDo) {
		    case 1:
		    	temp = generateAddition(val);
		        miniStruct = ['(',temp[0],'+',temp[1],')'];
		        structure = injectReplacingChar(miniStruct,structure,numLocations[valToPluck]);
		        quizifyCount++;
		        break;
		    case 2:
		    	temp = generateSubtraction(val);
		        miniStruct = ['(',temp[0],'-',temp[1],')'];
		        structure = injectReplacingChar(miniStruct,structure,numLocations[valToPluck]);
		        quizifyCount++;
		        break;
		    case 3:
				temp = generateMultiplication(val);
		        if (temp != null){
		        	miniStruct = ['(',temp[0],'x',temp[1],')'];
		        	structure = injectReplacingChar(miniStruct,structure,numLocations[valToPluck]);
		        	quizifyCount++;
		        }
		        break;
    	}
	}

	return structure.join(" ");
}