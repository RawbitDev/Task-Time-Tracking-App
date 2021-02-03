import { taskBuilder } from "../builder/Task";
import { trackingBuilder } from "../builder/Tracking";

describe("DashboardPage", () => {
  const task = taskBuilder({})();
  const tracking = trackingBuilder({})();
  beforeEach(() => cy.visit("/"));

  it("should render dashboard Page", () => {
    cy.screenshot();
    cy.findByTestId(/title/i).should("contain", "Dashboard");
  });

  it("switch dark mode", () => {
    cy.findByTestId(/menu/i).click();
    cy.get("body").should("have.css", "background-color", "rgb(48, 48, 48)");
    cy.screenshot();
    cy.findByText(/Darkmode/i).click();
    cy.get("body").should("have.css", "background-color", "rgb(250, 250, 250)");
    cy.screenshot();
  });

  it("can add a new task", () => {
    (async () => {
      const foundTasks = await cy.findAllByTestId(/task-item/i);
      cy.findByTestId(/addTaskDialog_fab/i).click();
      cy.screenshot();
      cy.findByLabelText(/Name/i).type(task.name);
      cy.findByLabelText(/Description/i).type(task.description);
      cy.screenshot();
      cy.findByTestId(/addTaskDialog_form/i).within(() => {
        cy.findByText(/Create/i).click();
      });
      cy.findAllByTestId(/task-item/i).should("have.length", foundTasks.length + 1);
      cy.screenshot();
    })();
  });

  it("can filter the tasks", () => {
    cy.findByTestId(/filter/i).click();
    cy.findByLabelText(/Name/i).type(task.name);
    cy.screenshot();
    cy.findByText(/Apply filters/i).click();
    cy.findAllByTestId(/task-item/i).should("have.length", 1);
    cy.screenshot();
  });

  it("can add a new tracking", () => {
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.findByText(/View trackings/i).click();
      });
    cy.findAllByTestId(/trackingItem_form/i).should("have.length", 0);
    cy.screenshot();
    cy.findByTestId(/trackingList_new/i).click();
    cy.findByLabelText(/Description/i).type(tracking.description);
    cy.screenshot();
    cy.findByTestId(/addTracking_form/i).within(() => {
      cy.findByText(/Create/i).click();
    });
    cy.findAllByTestId(/trackingItem_form/i).should("have.length", 1);
    cy.screenshot();
  });

  it("edit a tracking", () => {
    tracking.description = "This is the new tracking description";
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.findByText(/View trackings/i).click();
      });
    cy.findByTestId(/trackingItem_form/i).within(() => {
      cy.findByTestId(/trackingItem_edit/i).click();
    });
    cy.findByPlaceholderText(/Description/i)
      .clear()
      .type(tracking.description);
    cy.screenshot();
    cy.findByTestId(/trackingItem_save/i).click();
    cy.findByTestId(/trackingItem_form/i).should("contain", tracking.description);
    cy.screenshot();
  });

  it("delete a tracking", () => {
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.findByText(/View trackings/i).click();
      });
    cy.findAllByTestId(/trackingItem_form/i).should("have.length", 1);
    cy.screenshot();
    cy.findByTestId(/trackingItem_form/i).within(() => {
      cy.findByTestId(/trackingItem_delete/i).click();
    });
    cy.findAllByTestId(/trackingItem_form/i).should("have.length", 0);
    cy.screenshot();
  });

  it("can edit a task", () => {
    task.description = "This is the new task description";
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .within(() => {
        cy.findByTestId(/taskItemView_edit/i).click();
      });
    cy.findByPlaceholderText(/Description/i)
      .clear()
      .type(task.description);
    cy.screenshot();
    cy.findByTestId(/taskItemEdit_submit/i).click();
    cy.findByText(task.name)
      .parent()
      .within(() => {
        cy.findByTestId(/taskItemView_description/i).should("contain", task.description);
      });
    cy.screenshot();
  });

  it("can run, pause and resume a time tracking", () => {
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.findByText(/Start timer/i).click();
      });
    cy.screenshot();
    cy.wait(2000);
    cy.findByTestId(/taskItem_timerForm/i).within(() => {
      cy.findByText(/Pause timer/i).click();
    });
    cy.screenshot();
    cy.wait(1000);
    cy.findByTestId(/taskItem_timerForm/i).within(() => {
      cy.findByLabelText(/Describe what you did/i).type(tracking.description);
      cy.findByText(/Resume timer/i).click();
    });
    cy.screenshot();
    cy.wait(1000);
    cy.findByTestId(/taskItem_timerForm/i).within(() => {
      cy.findByText(/Stop timer/i).click();
    });
    cy.screenshot();
    cy.findByText(task.name)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.findByText(/View trackings/i).click({ force: true });
      });
    cy.findAllByTestId(/trackingItem_form/i).should("have.length", 2);
    cy.screenshot();
  });

  it("can delete a task", () => {
    (async () => {
      const foundTasks = await cy.findAllByTestId(/task-item/i);
      cy.screenshot();
      cy.findByText(task.name)
        .parent()
        .parent()
        .within(() => {
          cy.findByTestId(/taskItemView_delete/i).click();
        });
      cy.findAllByTestId(/task-item/i).should("have.length", foundTasks.length - 1);
      cy.screenshot();
    })();
  });
});
