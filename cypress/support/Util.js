  // Function to validate API response
  export const validate = (response, expected) => {
    expect(response.token_type).to.equal(expected.token_type);
    expect(response.mfa_authentication_required).to.equal(expected.mfa_authentication_required);
    expect(response.mfa_setup_required).to.equal(expected.mfa_setup_required);
    
  };

// Function to Verify if all required tasks are present after reload

export const verifyTasks = (expectedTask) => {
  cy.get('li[data-v-d8720d60][title="Incomplete"]').each(($task, index) => {
    cy.wrap($task)
      .find('input[type="text"]')
      .invoke("val")
      .should("eq", expectedTask[index]);
  });
};

// Function to wait for loading the page for reload

export const waitToload = (wait) => {
  cy.wait(wait);
}



// Function to delete all tasks after performing all tests in after hook

export const deleteTasks = (tasksToDelete) => {
  tasksToDelete.forEach((taskToDelete) => {
    cy.get('li[data-v-d8720d60][title="Incomplete"]').each(($task) => {
      const taskText = $task.find('input[type="text"]').val();
      if (taskText === taskToDelete) {
        $task.find('span.delete[title="Delete"]').click();
      }
    });
  });
};


export const formatString = (str, val) => {
  return str.replace(/\{(.+?)\}/g, val);
};


