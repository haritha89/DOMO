import {
  verifyTasks,
  formatString,
  waitToload,
  deleteTasks,
} from "../support/util";
import * as selectors from "../fixtures/selectors";

describe("DOMO Validations", () => {
  let isComment = false;
  const base_url = Cypress.env("BASE_URL");
  const expectedTasks = [
    "Task 1",
    "Task 2 Modified",
    "Task 4",
    "Task 5",
    "Task 6 🌟",
  ];

  before(() => {
    cy.visit(`${base_url}`);
  });

  // Clean up all the tasks by deleting it after Tasks Validations

  after(() => {
    const tasksToDelete = [
      "Task 1",
      "Task 2 Modified",
      "Task 4",
      "Task 5",
      "Task 6 🌟",
    ];
    deleteTasks(tasksToDelete);
  });

  // Tasks Validations

  it("DOMO ", () => {
    const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];
    const modified_Task2 = "Task 2 Modified";
    const taskWithEmoji = "Task 6 🌟";
    const expectedTasks = [
      "Task 1",
      "Task 2 Modified",
      "Task 4",
      "Task 5",
      "Task 6 🌟",
    ];
    const waittime = 2000;

    // Add all tasks and check the tasks

    tasks.forEach((task, index) => {
      cy.get(selectors.addButton).click();
      cy.get(formatString(selectors.addTask, index)).type(task);
    });

    // Click Checkbox for  Task 1

    cy.get(formatString(selectors.addCheckbox, 0)).check();

    //Uncheck Task 1

    cy.get(formatString(selectors.addCheckbox, 0)).uncheck();

    // Edit Task 2, clear it, and write 'Task 2 Modified'

    cy.get(formatString(selectors.addTask, 1)).clear().type(modified_Task2);

    // Delete Task 3

    cy.get(selectors.textIncomplete).each(($task) => {
      //const taskText = $task.find('input[type="text"]').val();
      const taskText = $task.find(selectors.textbox).val();
      if (taskText === "Task 3") {
        //$task.find('span.delete[title="Delete"]').click();
        $task.find(selectors.deleteTask).click();
      }
    });

    // Add Task with emoji

    cy.get(selectors.textIncomplete)
      .last()
      .then(($task) => {
        const taskText = $task.find('input[type="text"]').val();
        if (taskText === "Task 5") {
          cy.get(selectors.addButton).click();
          cy.get(selectors.textIncomplete)
            .last()
            .find('input[type="text"]')
            .type(taskWithEmoji);
        }
      });

    // Refresh the page
    cy.reload();
    waitToload(waittime);

    // Call the verifyTasks function after reloading
    verifyTasks(expectedTasks);
  });
});
