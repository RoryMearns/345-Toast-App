/* Tests for 345 Assignment: Rory Mearns (ID.3928873) */

// Tests for the basic Queue structure
test('Queue', function() {
	ok(Queue, "Queue function exists");
	var testQueue = new Queue();
	ok(testQueue.isEmpty(), "A new queue is empty");
	equal(testQueue.length(), 0, "A new queue will have a length of 0");
	testQueue.enqueue("bananas");
	notOk(testQueue.isEmpty(), "A queue is not empty after an item is enqueued");
	equal(testQueue.length(), 1, "A queue with 1 item has a length of 1");
	testQueue.enqueue("apples");
	ok(testQueue.peek() === "bananas", "Peeking returns item in head of queue");
	ok(testQueue.dequeue() === "bananas", "Dequeue returns item at head of queue");
	testQueue.dequeue();
	ok(testQueue.isEmpty(), "Queue is empty after last item is dequeued");
	ok(testQueue.dequeue() === undefined, "Trying to dequeue an empty queue returns 'undefined'")
})