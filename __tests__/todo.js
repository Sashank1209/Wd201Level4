/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "wake up",
      dueDate: today,
      completed: true,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: "Go to college",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overduecount = overdue();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    let yesterday = prev_date.toLocaleDateString("en-CA");
    add({
      title: "Update System",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(overduecount.length + 1);
  });
  test("Due today tasks", () => {
    const todaycount = dueToday();
    add({
      title: "Buy smartphone",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(todaycount.length + 1);
  });
  test("Due later tasks", () => {
    const duelatercount = dueLater();
    var next_date = new Date();
    next_date.setDate(next_date.getDate() + 1);
    let tomorrow = next_date.toLocaleDateString("en-CA");
    add({
      title: "Pay for DTH",
      dueDate: tomorrow,
      completed: false,
    });
    expect(dueLater().length).toBe(duelatercount.length + 1);
  });
});
