class MinHeap {
	constructor() {
		this.heap = [];
	}
	/// returns size of the min heap 
	size() {
		return this.heap.length;
	}

	/// returns if the heap is empty 
	empty() {
		return (this.size() === 0);
	}
	
	/// insert a new value in the heap 
	push(value) {
		this.heap.push(value);
		this.heapify_up();
	}

	/// updates heap by up heapifying
	heapify_up() {
		var current_index = this.size() - 1;
		while (current_index > 0) {
			var current_element = this.heap[current_index];
			var parent_index = Math.trunc((current_index - 1) / 2);
			var parent_element = this.heap[parent_index];

			if (parent_element[0] < current_element[0]) {
				break;
			}
			else {
				this.heap[parent_index] = current_element;
				this.heap[current_index] = parent_element;
				current_index = parent_index;
			}
		}
	}

	/// returns the top element (smallest value element)
	top() {
		return this.heap[0];
	}

	/// delete the top element
	pop() {
		if (this.empty() === false) {
			var last_index = this.size() - 1;
			this.heap[0] = this.heap[last_index];
			this.heap.pop();
			this.heapify_down();
		}
	}

	/// updates heap by down heapifying
	heapify_down() {
		var current_index = 0;
		var current_element = this.heap[0];
		while (current_index < this.size()) {
			var child_index1 = (current_index * 2) + 1;
			var child_index2 = (current_index * 2) + 2;
			if (child_index1 >= this.size() && child_index2 >= this.size()) {
				break;
			}
			else if (child_index2 >= this.size()) {
				let child_element1 = this.heap[child_index1];
				if (current_element[0] < child_element1[0]) {
					break;
				}
				else {
					this.heap[child_index1] = current_element;
					this.heap[current_index] = child_element1;
					current_index = child_index1;
				}
			}
			else {
				var child_element1 = this.heap[child_index1];
				var child_element2 = this.heap[child_index2];
				if (current_element[0] < child_element1[0] && current_element[0] < child_element2[0]) {
					break;
				}
				else {
					if (child_element1[0] < child_element2[0]) {
						this.heap[child_index1] = current_element;
						this.heap[current_index] = child_element1;
						current_index = child_index1;
					}
					else {
						this.heap[child_index2] = current_element;
						this.heap[current_index] = child_element2;
						current_index = child_index2;
					}
				}
			}
		}
	}
}

export default MinHeap