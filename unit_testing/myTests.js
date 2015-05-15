/* Tests for 345 Assignment: Rory Mearns (ID.3928873) */

// Tests for the basic Queue structure
test("Basic Queue Structure Tests", function() {
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

test("Day Shortener Function Tests", function() {
	ok(shortenDay("tuesday") === "Tues", "'tuesday' shortened to 'Tues'");
	ok(shortenDay("Tuesday") === "Tues", "'Tuesday' shortened to 'Tues'");
	ok(shortenDay("TUESDAY") === "Tues", "'TUESDAY' shortened to 'Tues'");
	ok(shortenDay(days[1]) === "Tues", "'days[1]' is shortened to 'Tues'");
})

test("Sail Size Setter", function() {
	equal(sailSizeSetter(24,30), 4.2, "Given the wind range of 24-30 the sail size should be 4.2");
})

