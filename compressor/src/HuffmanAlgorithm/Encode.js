import MinHeap from "./MinHeap";
import HuffmanAlgorithm from "./HuffmanAlgo";
class Encode{
    encode(data) {
		this.heap = new MinHeap();

		var  freqCal = new Map();
		for (let i = 0; i < data.length; i++) {
			if (freqCal.has(data[i])) {
				let foo = freqCal.get(data[i]);
				freqCal.set(data[i], foo + 1);
			}
			else {
				freqCal.set(data[i], 1);
			}
		}
		if (freqCal.size === 0) {
			let final_string = "zer#";
			
			let output_message = `CofreqCalression cofreqCallete and file sent for download. \nCofreqCalression Ratio : ${(data.length / final_string.length).toPrecision(6)}`;
			return [final_string, output_message];
		}

		if (freqCal.size === 1) {
			let key, value;
			for (let [k, v] of freqCal) {
				key = k;
				value = v;
			}
			let final_string = `one" # ${key} # ${value.toString()}`;
			let output_message = `CofreqCalression cofreqCallete and file sent for download. \nCofreqCalression Ratio : + ${(data.length / final_string.length).toPrecision(6)}`;
			return [final_string, output_message];
		}
		for (let [key, value] of freqCal) {
			this.heap.push([value, key]);
		}

		/// alternate way
		// freqCal.forEach(function (value, key) {
		//     console.log([value, key]);
		// })
		while (this.heap.size() >= 2) {
			let min_node1 = this.heap.top();
			this.heap.extractMin();
			let min_node2 = this.heap.top();
			this.heap.extractMin();
			this.heap.push([min_node1[0] + min_node2[0], [min_node1, min_node2]]);
		}
		var huffman_tree = this.heap.top();
		this.heap.extractMin();
		this.codes = {};
		this.getCodes(huffman_tree, "");

		/// convert data into coded data
		let binary_string = "";
		for (let i = 0; i < data.length; i++) {
			binary_string += this.codes[data[i]];
		}
		let padding_length = (8 - (binary_string.length % 8)) % 8;
		for (let i = 0; i < padding_length; i++) {
			binary_string += '0';
		}
		let encoded_data = "";
		for (let i = 0; i < binary_string.length;) {
			let curr_num = 0;
			for (let j = 0; j < 8; j++, i++) {
				curr_num *= 2;
				curr_num += binary_string[i] - '0';
			}
			encoded_data += String.fromCharCode(curr_num);
		}
		let tree_string = this.make_string(huffman_tree);
		let ts_length = tree_string.length;
		let final_string = ts_length.toString() + '#' + padding_length.toString() + '#' + tree_string + encoded_data;
		let output_message = `CofreqCalression cofreqCallete and file sent for download. \nCofreqCalression Ratio : ${(data.length / final_string.length).toPrecision(6)}`;
		return [final_string, output_message];
	}

}

export default Encode